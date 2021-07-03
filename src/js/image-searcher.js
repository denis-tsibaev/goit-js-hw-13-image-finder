import { imageFetch, searchOptions } from './api-service';
import debounce from 'lodash.debounce';
import { refs } from './refs';
import * as basicLightbox from 'basiclightbox';
import imageCardTmpl from '../templates/image-card.hbs';
import { error } from '@pnotify/core';

let searchQuery = '';

refs.searchForm.addEventListener('input', debounce(onSearch, 1000));
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
      title: 'ATTENTION!',
      text: 'Specify your request',
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
      }, 250);
    }
  } catch {
    error({
      title: 'ATTENTION!',
      text: 'No more pictures on your request',
    });
  }
}

function renderImage(resolvedImages) {
  let markup = imageCardTmpl(resolvedImages);

  refs.gallery.insertAdjacentHTML('beforeend', markup);
  refs.loadMoreButton.classList.remove('is-hidden');
}

function onImageClick(event) {
  if (event.target.className !== 'photo-card-image') return;

  const instance = basicLightbox
    .create(`<img src="${event.target.dataset.src}" width="800" height="600">`)
    .show();
}

async function markupRender() {
  if (searchQuery.length > 0) {
    const response = await imageFetch(searchQuery);
    const result = await renderImage(response.hits);
    return result;
  }
}
