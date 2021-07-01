import './sass/main.scss';

// const URL = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${pageNumber}&per_page=12&key=22318307-8fc961fa8d00a621cd6d86864`;

fetch(URL)
  .then(response => response.json())
  .then(console.log);
