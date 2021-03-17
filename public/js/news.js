"use strict";

const articleContainer = document.querySelector(".main-container");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const sortSelect = document.getElementById("sortSelect");
let selectedKeyword;

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

	renderArticles(data);
}

function renderArticles(data) {
	if (articleContainer.firstChild) {
		hideArticles();
	}
	for (let i = 0; i < data.articles.length; i++) {
		// Container that wraps title, content and link
		const article = document.createElement("div");

		// Title parts
		const title = document.createElement("h3");
		title.textContent = data.articles[i].title;

		// Content parts
		const content = document.createElement("p");
		content.textContent = data.articles[i].content;

		// Button to read full content
		const link = document.createElement("a");
		link.href = data.articles[i].url;
		link.textContent = "Read all";

		article.append(title, content, link);
		articleContainer.append(article);
	}
}

// Remove the articles if excists
function hideArticles() {
	while (articleContainer.firstChild) {
		articleContainer.removeChild(articleContainer.firstChild);
	}
}
