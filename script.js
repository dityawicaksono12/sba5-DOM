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

formEl.addEventListener("submit", function(event) {
    event.preventDefault()
    
    const enteredTitle = inputTitle.value.trim()
    const enteredMessage = inputMessage.value.trim()

    if (enteredTitle && enteredMessage) {
        const blogEntry = {
            id: new Date().getTime(), 
            title: enteredTitle,
            message: enteredMessage
        }
        
        allPosts.push(blogEntry)
        localStorage.setItem("posts", JSON.stringify(allPosts))

        drawPosts()
        
        inputTitle.value = ""
        inputMessage.value = ""
    } else {
        console.warn("Both fields are required.")
    }
})

function drawPosts() {
    postsContainer.innerHTML = ""

    allPosts.forEach(function(entry) {
        const entryElement = buildPost(entry)
        postsContainer.appendChild(entryElement)
    });
}

function buildPost(postData) {
    const wrapper = document.createElement("div")
    wrapper.className = "blog-post-box"
    wrapper.style.cssText = "border:1px solid #ddd;padding:12px;margin-bottom:12px;"

    const heading = document.createElement("h2")
    heading.innerText = postData.title;

    const body = document.createElement("p")
    body.textContent = postData.message;

    const removeBtn = document.createElement("button")
    removeBtn.textContent = "Remove Post"
    removeBtn.addEventListener("click", function() {
        allPosts = allPosts.filter(function(item) {
            return item.id !== postData.id
        })
        localStorage.setItem("posts", JSON.stringify(allPosts))
        drawPosts()
    })

    wrapper.appendChild(heading)
    wrapper.appendChild(body)
    wrapper.appendChild(removeBtn)

    return wrapper
}