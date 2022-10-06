const postsContainer = document.querySelector('#posts-container')
const loaderContainer = document.querySelector('.loader')

let page = 1

const getPosts = async () => {
  const URL = `https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`
  const response = await fetch(URL)
  return response.json()
}

const addPostsIntoDOM = async () => {
  const posts = await getPosts()
  const postsTemplate = posts
    .map(
      ({ id, title, body }) => `
    <div class="post">
    <div class="number">${id}</div>
    <div class="post-info">
    <h2>${title}</h2>
    <p>${body}</p>
    </div>
    </div>
    `
    )
    .join('')

  postsContainer.innerHTML = postsTemplate
}

addPostsIntoDOM()

const getNextPost = () => {
  page++
  addPostsIntoDOM()
}

const removeLoader = () => {
  setTimeout(() => {
    loaderContainer.classList.remove('show')
    getNextPost()
  }, 1000)
}

const showLoader = () => {
  loaderContainer.classList.add('show')
  removeLoader()
}

window.addEventListener('scroll', () => {
  const { clientHeight, scrollHeight, scrollTop } = document.documentElement
  const isPageBottonAlmostReached =
    scrollTop + clientHeight >= scrollHeight - 10

  if (isPageBottonAlmostReached) {
    showLoader()
  }
})
