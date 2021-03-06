const country = document.querySelector('#sltr-1')
const choices = document.querySelector('#sltr-2')
const results = document.querySelector('.results')
const search = document.querySelector('#search')
const searching = document.querySelector('#searching')
const toggle = document.querySelector('#toggle')
const body = document.querySelector('#theme')
const containers = document.querySelector('.containers')
let li = ''
let reload = 1

const URL = 'https://newsapi.org/v2/top-headlines?apiKey=91c9d585d313447bbd41a76101a567ee&country='+country.value+'&category='+choices.value+'&q='+search.value+'&page='+reload+'&pageSize=50'
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
window.onload=function(){
    showArticles();
}

searching.addEventListener("click", e=> {
    e.preventDefault()
    containers.innerHTML = ''
    reload = 1
    showArticles(e)  
})

toggle.addEventListener("click", e =>{
    if(toggle.className == "fa fa-toggle-on"){
        toggle.className = "fa fa-toggle-off"
        body.className = "dark"
    }
    else{
        toggle.className = "fa fa-toggle-on"
        body.className = "light"
    }
    e.preventDefault()
})