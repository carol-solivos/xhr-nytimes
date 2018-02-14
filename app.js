const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
let searchedForText;

form.addEventListener('submit', function(e) {
	e.preventDefault();
	responseContainer.innerHTML = '';
	searchedForText = searchField.value;
	getNews();
})

function getNews() {
	const articleRequest = new XMLHttpRequest();
	articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=8ad84107aa3d45118cedab71b7d45cc4`);
	articleRequest.onload = addNews;
	articleRequest.onerror = handleError;
	articleRequest.send();
}

function handleError () {
  console.log( 'An error occurred 😞' );
}

function addNews() {
	const data = JSON.parse(this.responseText);
	const response = data.response.docs;
	for(let i in response) { 
		const article = data.response.docs[i];
		const title = article.headline.main;
		const snippet = article.snippet;
		let li = document.createElement('li');
		li.className = 'articleClass';
		li.innerText = snippet;
		responseContainer.appendChild(li);
	};
	
	
}