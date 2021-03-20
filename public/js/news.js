"use strict";

const articleContainer = document.querySelector(".main-container");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const sortSelect = document.getElementById("sortSelect");
let selectedKeyword;
let rows = []
let articles = []

// Default action
document.addEventListener("DOMContentLoaded", () => {
	getData();
});

// User search by keyword
searchButton.addEventListener("click", async () => {
	selectedKeyword = searchInput.value;
	const apiUrl = `news.json/${selectedKeyword}`;
	const response = await fetch(apiUrl);
	const data = await response.json();

	renderArticles(data);
});

// User choose from the selectbox
sortSelect.onchange = async function () {
	selectedKeyword = searchInput.value;
	const selectedNumber = Number(sortSelect.value);

	if (selectedNumber === 1) {
		const apiUrl = `news.json/relevancy/${selectedKeyword}`;
		const response = await fetch(apiUrl);
		const data = await response.json();

		renderArticles(data);
		return;
	}

	if (selectedNumber === 2) {
		const apiUrl = `news.json/popularity/${selectedKeyword}`;
		const response = await fetch(apiUrl);
		const data = await response.json();

		renderArticles(data);
		return;
	}

	if (selectedNumber === 3) {
		const apiUrl = `news.json/newest/${selectedKeyword}`;
		const response = await fetch(apiUrl);
		const data = await response.json();

		renderArticles(data);
		return;
	}
};

async function getData() {
	const response = await fetch("/news.json");
	const data = await response.json();

	console.log(data);
	renderArticles(data);
}

function renderArticles(data) {
	if (articleContainer.firstChild) {
		hideArticles();
	}
	
	for(let i = 0; i < data.articles.length / 4; i++) {
		const row = document.createElement('div')
		row.setAttribute('class', `row row-${i}`)

		rows.push(row)
	}

	for(let i = 0; i < data.articles.length; i++) {

		const article = document.createElement("div");
		article.classList.add('col', `col-${i}`)

		// Title parts
		const title = document.createElement("h3");
		title.setAttribute('class', `title title-${i}`)
		title.textContent = data.articles[i].title;

		// Content parts
		const content = document.createElement("p");
		content.setAttribute('class', `content content-${i}`)
		content.textContent = data.articles[i].content;

		// Button to read full content
		const link = document.createElement("a");
		link.setAttribute('class', `link link-${i}`)
		link.href = data.articles[i].url;
		link.textContent = "Read all";

		article.append(title, content, link);

		articles.push(article)
	}

	for(let i = 0; i < rows.length; i++) {
		const eachRow = articles.splice(0, 4)
		rows[i].append(eachRow[0], eachRow[1], eachRow[2], eachRow[3])

		articleContainer.append(rows[i])
		
	}

	console.log(articleContainer);
}

// Remove the articles if excists
function hideArticles() {
	while (articleContainer.firstChild) {
		articleContainer.removeChild(articleContainer.firstChild);
	}
}
