let allPosts = []

const formEl = document.getElementById("blogForm")
const inputTitle = document.getElementById("title")
const inputMessage = document.getElementById("message")
const postsContainer = document.getElementById("posting-area")

const savedPosts = localStorage.getItem("posts")
if (savedPosts) {
    allPosts = JSON.parse(savedPosts)
    drawPosts()
}