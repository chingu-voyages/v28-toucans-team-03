'use strict'

// import apiKey from '../../index'

const articleContainer = document.querySelector('.main-container')
const searchInput = document.getElementById('searchInput')
const searchButton = document.getElementById('searchButton')
const sortSelect = document.getElementById('sortSelect')
let selectedKeyword;

const key = 'my_api_key' 

// Still needs to work ٩( 'ω' )و
// console.log(process.env.API_KEY);
// console.log(import.meta.url);

// Default 
document.addEventListener('DOMContentLoaded', () => {
    fetch(`https://newsapi.org/v2/everything?q=covid&apiKey=${key}`)
    .then(res => res.json())
    .then(data => {
        renderArticles(data)
    })
})

function renderArticles(data) {
    if(articleContainer.firstChild) {
        hideArticles()
    }
    for(let i = 0; i < data.articles.length; i++) {
        // Container that wraps title, content and link
        const article = document.createElement('div')

        // Title parts
        const title = document.createElement('h3')
        title.textContent = data.articles[i].title

        // Content parts
        const content = document.createElement('p')
        content.textContent = data.articles[i].content

        // Button to read full content
        const link = document.createElement('a')
        link.href = data.articles[i].url
        link.textContent = 'Read all'


        article.append(title, content, link)
        articleContainer.append(article)
    }
}

// User customize
searchButton.addEventListener('click', () => {
    selectedKeyword = searchInput.value
    fetch(`https://newsapi.org/v2/everything?q=${selectedKeyword}&apiKey=${key}`)
    .then(res => res.json())
    .then(data => {
        hideArticles()
        renderArticles(data);
    })
})

// Remove the articles if excists
function hideArticles() {
    while(articleContainer.firstChild){
        articleContainer.removeChild(articleContainer.firstChild);
    }
}

sortSelect.onchange = function() {
    selectedKeyword = searchInput.value
    console.log(selectedKeyword);
    const selectedNumber = Number(sortSelect.value)

    if(selectedNumber === 1) {
        fetch(`https://newsapi.org/v2/everything?q=${selectedKeyword}&sortBy=relevancy&apiKey=${key}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            renderArticles(data)
        })
        return  
    }

    if(selectedNumber === 2) {
        fetch(`https://newsapi.org/v2/everything?q=${selectedKeyword}&sortBy=popularity&apiKey=${key}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            renderArticles(data)
        })
        return 
    }

    if(selectedNumber === 3) {
        fetch(`https://newsapi.org/v2/everything?q=${selectedKeyword}&sortBy=publishedAt&apiKey=${key}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            renderArticles(data)
        })
        return 
    }
}