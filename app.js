const postsContainer = document.querySelector('#posts-container')
const loaderContainer = document.querySelector('.loader')
const filterInput = document.querySelector('#filter')

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
    <h2 class="post-title">${title}</h2>
    <p class="post-body">${body}</p>
    </div>
    </div>
    `
    )
    .join('')

  postsContainer.innerHTML = postsTemplate
}

addPostsIntoDOM()

const getNextPost = () => {
  setTimeout(() => {
    page++
    addPostsIntoDOM()
  }, 300)
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

filterInput.addEventListener('input', event => {
  const inputValue = event.target.value.toLowerCase()
  const posts = document.querySelectorAll('.post')

  console.log(posts)

  posts.forEach(post => {
    const postTitle = post
      .querySelector('.post-title')
      .textContent.toLowerCase()
    const postBody = post.querySelector('.post-body').textContent.toLowerCase()
    const postId = post.querySelector('.number').textContent

    if (
      postTitle.includes(inputValue) ||
      postBody.includes(inputValue) ||
      postId.includes(inputValue)
    ) {
      post.style.display = 'flex'
      return
    }

    post.style.display = 'none'
  })
})
