"use strict";

const articleContainer = document.querySelector(".main-container");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
let selectedKeyword;
let rows = []
let articles = []

// Default action
document.addEventListener("DOMContentLoaded", async () => {
  getData();
});

// User search by keyword
searchButton.addEventListener("click", async () => {
  selectedKeyword = searchInput.value;
  const apiUrl = `news.json/${selectedKeyword}`;
  const response = await fetch(apiUrl);
  const body = await response.json();
  const data = body.response.docs;

  // Unitialize slick
  if (articleContainer.classList.contains("slick-initialized")) {
    articleContainer.classList.remove("slick-initialized");
  }

  renderArticles(data);

  // Slick.js
  await $(".main-container").slick({
    dots: true,
    speed: 1000,
  });
});

// Functions
async function getData() {
  const response = await fetch("/news.json");
  const body = await response.json();
  const data = body.response.docs;

  renderArticles(data);

  await $(".main-container").slick({
    dots: true,
    speed: 1000,
  });
}

function renderArticles(data) {
  if (articleContainer.firstChild) {
    hideArticles();
  }
  for (let i = 0; i < data.length; i++) {
    // Container that wraps title, content and link
    const article = document.createElement("div");
    article.setAttribute("class", "article");

    // Image parts
    const image = document.createElement("img");
    image.setAttribute("class", "news_image");
    if (data[i].multimedia[0]) {
      image.src = `http://static01.nyt.com/${data[i].multimedia[0].url}`;
    } else {
      image.src = "css/slick/images/markus-spiske-qRaEf5jnYyc-unsplash.jpg";
    }

    // Title parts
    const title = document.createElement("h4");
    title.setAttribute("class", "news_title");
    title.textContent = data[i].headline.main;

    // Content parts
    const content = document.createElement("p");
    content.setAttribute("class", "news_content");
    content.textContent = data[i].lead_paragraph;

    // Button to read full content
    const link = document.createElement("a");
    link.setAttribute("class", "news_link");
    link.href = data[i].web_url;
    link.textContent = "Read all";

    article.append(image, title, content, link);
    articleContainer.append(article);
  }
}

// Remove the articles if exists
function hideArticles() {
  while (articleContainer.firstChild) {
    articleContainer.removeChild(articleContainer.firstChild);
  }
}
