const socket = io("http://localhost:3000/");

const title = document.getElementById("title");
const desc = document.getElementById("desc");
const searchInp = document.getElementById("searchInp");

socket.emit("load");
function addPost() {
  const post = {
    title: title.value,
    description: desc.value,
  };

  socket.emit("addpost", post);
  title.value = "";
  desc.value = "";
}

socket.on("replyWithPosts", (posts) => {
  display(posts);
});

function display(posts) {
  let data = "";
  for (let i = 0; i < posts.length; i++) {
    data += ` <div class="col-md-4">
          <div class="bg-white shadow rounded-1 align-items-center d-flex flex-column justify-content-center">
            <p class="text-dark mb-3">${posts[i].title}</p>
          <p class="text-dark mb-3">${posts[i].description}</p>
          <button class="btn btn-danger mb-3" onclick="deletePost('${posts[i]._id}')">Delete</button>
          </div>
        </div>`;
  }
  document.getElementById("postsContainer").innerHTML = data;
}

function deletePost(id) {
  socket.emit("deletePost", id);
}

function serchPostFunc() {
  const title = searchInp.value;
  socket.emit("search", title);
}
