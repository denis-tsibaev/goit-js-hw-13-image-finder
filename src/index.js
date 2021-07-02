import './sass/main.scss';

const options = {
	headers: {
		Authorization: '22318307-8fc961fa8d00a621cd6d86864',
	},
};

const url =
`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=dog&page=1&per_page=12`;


fetch(url, options)
  .then(response => response.json())
  .then(console.log)
