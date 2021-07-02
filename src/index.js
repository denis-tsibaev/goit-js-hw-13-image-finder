import LoadMoreBtn from './js/components/load-more-btn';
import NewsApiService from './js/news-service';
import './sass/main.scss';
import articlesTmpl from './templates/articles.hbs';

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  articlesContainer: document.querySelector('.js-articles-container'),
};

const loadMoreBtn = new LoadMoreBtn({ selector: '[data-action="load-more"]', hidden: true });

const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onSearch(event) {
  event.preventDefault();

  newsApiService.query = event.currentTarget.elements.query.value;

  if (newsApiService.query === '') {
    return alert('Пустой запрос');
  }

  loadMoreBtn.show();
  loadMoreBtn.disable();
  newsApiService.resetPage();
  newsApiService.fetchArticles().then(articles => {
    clearArticlesContainer();
    appendArticlesMarkup(articles);
    loadMoreBtn.enable();
  });
}

function onLoadMore() {
  loadMoreBtn.disable();
  newsApiService.fetchArticles().then(articles =>{
	appendArticlesMarkup(articles);
	loadMoreBtn.enable();
  });
}

function appendArticlesMarkup(articles) {
  refs.articlesContainer.insertAdjacentHTML('beforeend', articlesTmpl(articles));
}

function clearArticlesContainer() {
  refs.articlesContainer.innerHTML = '';
}
