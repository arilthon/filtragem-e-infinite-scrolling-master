const postsContainer = document.querySelector('#posts-container')
let page = 1

const getPosts = async () => {
  const URL = `https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`
  const response = await fetch(URL)
  return response.json()
}

const addPostsIntoDom = async () => {
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

addPostsIntoDom()
