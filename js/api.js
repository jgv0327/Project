const country = document.querySelector('#sltr-1')
const choices = document.querySelector('#sltr-2')
const search = document.querySelector('#search')
const results = document.querySelector('.results')
const containers = document.querySelector('.containers')
let li = ''

const URL = 'https://newsapi.org/v2/top-headlines?apiKey=91c9d585d313447bbd41a76101a567ee&country='+country.value+'&category='+choices.value+'&q='+search.value+'&pageSize=50'
fetch(URL)
    .then(res => res.json())
    .then(data => data)
async function showArticles() {
    const News = await fetch(URL)
        .then(res => res.json())
        .then(data => data)     
    const { articles , totalResults } = News
    console.log(News)
    li = ''
    articles.forEach(article => {
        li += `
        <div class="news-container">
            <div class="news-image">
                <li><img src="${article.urlToImage}"></li>
            </div>
            <div class="news-info">
                <li><h4>${article.title}</h4></li>
                <li>${article.source.name}</li>
                <li><p>Published at ${article.publishedAt}</p></li>
                <li><p>${article.content}</p></li> 
                <footer class="news-footer">
                    <button class="news-url">
                        <a href="${article.url}">Go to this Page</a>
                    </button>
                </footer>                               
            </div>
        </div>
       
        `
    })
    containers.innerHTML += li 
}

showArticles()