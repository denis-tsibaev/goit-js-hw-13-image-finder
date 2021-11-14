import { imageFetch, searchOptions } from './apiService';
import debounce from 'lodash.debounce';
import { refs } from './refs';
import * as basicLightbox from 'basiclightbox';
import imageCardTmpl from '../templates/image-card.hbs';
import { error } from '@pnotify/core';

let searchQuery = '';

refs.searchForm.addEventListener('input', debounce(onSearch, 500));
refs.loadMoreButton.addEventListener('click', onLoad);
refs.gallery.addEventListener('click', onImageClick);

async function onSearch(event) {
  try {
    searchQuery = event.target.value.trim();

    refs.gallery.innerHTML = '';
    searchOptions.PAGE_NUM = 1;

    markupRender();
  } catch {
    error({
      title: false,
      text: 'Уточните ваш поиск',
      sticker: false,
      maxTextHeight: null,
      closerHover: false,
      animation: 'fade',
      mouseReset: false,
      delay: 5000,
    });
  }
}

async function onLoad() {
  try {
    searchOptions.PAGE_NUM += 1;
    markupRender();
    if (markupRender) {
      setTimeout(() => {
        refs.gallery.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest',
        });
      }, 200);
    }
  } catch {
    error({
      title: false,
      text: 'Больше картинок по вашему запросу нет',
      sticker: false,
      maxTextHeight: null,
      closerHover: false,
      animation: 'fade',
      mouseReset: false,
      delay: 5000,
    });
  }
}

function renderImage(resolvedImages) {
  let markup = imageCardTmpl(resolvedImages);

  refs.gallery.insertAdjacentHTML('beforeend', markup);
  refs.loadMoreButton.classList.remove('is-hidden');
}

function onImageClick(e) {
  if (e.target.className !== 'photo-card-image') return;

  const instance = basicLightbox
    .create(
      `
            <img src="${e.target.dataset.src}" width="800" height="600">
`,
    )
    .show();
}

async function markupRender() {
  if (searchQuery.length > 0) {
    const response = await imageFetch(searchQuery);
    const result = await renderImage(response.hits);
    return result;
  }
}
