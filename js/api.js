const containers = document.querySelector('.containers')
const results = document.querySelector('.results')
const search = document.querySelector('#btnSearch')
const country = document.querySelector('#country')
const category = document.querySelector('#category')
const keySearch = document.querySelector('#usr')
const toggleTheme = document.querySelector('#btnToggle')
const body = document.querySelector('#body')
const loadPage = document.querySelector('#load')
const load = document.querySelector('#load')
let bookPage = []
let loadCounter = 0
let resultCount = 0
let idSelector = ''
let li = ''
let bool = 0;
let containerId = 0;
let pageLoad = 1


//Display News immediately after loading 
window.onload=function(){
    getNews();
}

//Fetching data from an endpoint
async function getNews(){
    //load spinner if there is a que
     loader()
//Fetching data from a specific Parameter
    const API = 'https://newsapi.org/v2/top-headlines?apiKey=91c9d585d313447bbd41a76101a567ee&country='+country.value+'&category='+category.value+'&q='+keySearch.value+'&page='+pageLoad+'&pageSize=50'
    //Fetching the datas from LocalStorage
        var bookmarks = JSON.parse(localStorage.getItem("bookmarks"))
        const newsList = await fetch(API)
                            .then(res => res.json())
                            .then(data => data)
                            .catch(error => 'https://newsapi.org/v2/top-headlines?')
        const { articles , totalResults } = newsList
        console.log(totalResults)
        li = ''
//passing array to an arraylist
        bookPage = bookPage.concat(articles)
//variable counter for loadpage
        loadCounter = articles.length
        resultCount += articles.length
        let result = `<p>You have a total result of ${resultCount}</p>`
        articles.forEach(article => {  
            if(bookmarks!=null){
                bookmarks.forEach( bookmark =>{
//Checking specific article if it is in LocalStorage
    //if it is equal, bookmark icon will be change
                    if(article.url == bookmark.url){
                        li += ` 
                            <div class="newsContainer">
                                <div class="newsHeader">
                                    <li><img src="${article.urlToImage}"></li>
                                </div>
                                <div class="newsBody">
                                    <li><h4>${article.title}</h4></li>
                                    <li>${article.source.name}</li>
                                    <li><p>${article.content}</p></li>
                                    <div class="newsUtility">
                                        <a href="${article.url}">Go to this Page</a>
                                        <button><i class="fa fa-bookmark" id="${containerId}"></i></button> 
                                    </div>
                                </div>
                                <div class="newsFooter">
                                    <li><p>Published at ${article.publishedAt}</p></li>
                                </div>
                            </div>
                            `
                            bool = 1
                }
                })}
    //if not it will be the same
            if(bool==0){
                li += ` 
                <div class="newsContainer">
                    <div class="newsHeader">
                        <li><img src="${article.urlToImage}"></li>
                    </div>
                    <div class="newsBody">
                        <li><h4>${article.title}</h4></li>
                        <li>${article.source.name}</li>
                        <li><p>${article.content}</p></li>
                        <div class="newsUtility">
                            <a href="${article.url}">Go to this Page</a>
                            <button><i class="fa fa-bookmark-o" id="${containerId}"></i></button> 
                        </div>
                    </div>
                    <div class="newsFooter">
                        <li><p>Published at ${article.publishedAt}</p></li>
                    </div>
                </div>
            `}
                bool=0
                containerId++
        })
        loadMoreNews()
        results.innerHTML = result
        containers.innerHTML += li     
        console.log(bookPage)
        loader()
}

//Search button
search.addEventListener("click", e=> {
    e.preventDefault()
//Reset all the value
    containerId = 0
    resultCount = 0
    loadCounter = 0
    containers.innerHTML = ''
    bookPage = []
    pageLoad = 1
//Fetch the Data from GetNews function
    getNews(e)  
})
//Dark & Light mode
toggleTheme.addEventListener("click", e =>{
    if(toggleTheme.className == "fa fa-toggle-on"){
        toggleTheme.className = "fa fa-toggle-off"
        body.className = "light-mode"
    }
    else{
        toggleTheme.className = "fa fa-toggle-on"
        body.className = "dark-mode"
    }
    e.preventDefault()
})
//Bookmark button
containers.addEventListener("click",e=>{
    if(e.target.classList.contains('fa-bookmark-o')){
        e.target.className = 'fa fa-bookmark'
        idSelector = e.target.id
        saveBooks()
    }
    else if(e.target.classList.contains('fa-bookmark')){
        e.target.className = 'fa fa-bookmark-o'
        idSelector = e.target.id
        removeBookmark()
    }
    else{
        console.log(e.target)
    }
})
//Load more button
loadPage.addEventListener("click", e =>{
    load.className = 'load-none'
    pageLoad += 1
    loadCounter = 0
    getNews()
})

//function for save bookmark to localStorage
function saveBooks(){
    //if localStorage is null
    if(localStorage.getItem("bookmarks") === null){
        var bookmarks = []
        bookmarks.push(bookPage[idSelector])
        localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
    }
    //if is not null
    else{
        var bookmarks = JSON.parse(localStorage.getItem("bookmarks"))
        bookmarks.push(bookPage[idSelector])
        localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
    }
}
//function for Remove bookmark from localStorage
function removeBookmark(){
    //Passing data from localstorage to a variable
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"))
    //if the bookmark is equal to the selected news
    for(var i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].url == bookPage[idSelector].url){
            bookmarks.splice(i,1);
        }
    }
    //refresh localStorage
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
}
//function for load more news
function loadMoreNews(){
    if(loadCounter > 49 && resultCount < 100){
        //display Load More Button
        load.className = 'load-page'
    }
    else{
        //Hide Load More Button
        load.className = 'load-none'
    }
}
//function for spinner load
function loader(){
    const spin = document.querySelector('#spinner')
    if(loadCounter == 0){
        spin.className = "spinner-border"
    }
    else{
        spin.className = "spinner-border-none"
    }

}
