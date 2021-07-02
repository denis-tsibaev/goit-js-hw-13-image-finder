export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchArticles() {
    const options = {
      headers: {
        Authorization: '4ae390c2725d4332b415396c1551f2bf',
      },
    };
    const url = `https://newsapi.org/v2/everything?q=${this.searchQuery}&language=en&pageSize=5&${this.page}`;

    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        this.incrementPage();
      });
  }

  incrementPage(){
	this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
