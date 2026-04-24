    // LinkedIn   users ==> connections  posts   skills    companies -=> jobs =>  applicants 

            // Input 
            // Data Seeding 
/******************** DATA SEEDING ********************/

var users = [
  {
    id: 1,
    fullName: "abdallah",
    email: "abdallah@gmail.com",
    password: "14589",
    phoneNo: "01205455454",
    title: "Frontend Developer",
    location: "Cairo",
    about: "I love coding",
    image: "1771685065878.png",
    skills: ["HTML", "CSS", "JS", "Mongo", "ML"],
    connections: [{ userId: 2, status: "pending" }],
    posts: [1, 3]
  },
  {
    id: 2,
    fullName: "arig",
    email: "arig@gmail.com",
    password: "118969",
    phoneNo: "01541554554",
    title: "Backend Developer",
    location: "Alex",
    about: "",
    image: "1771685065878.png",
    skills: ["Redux", "AI", "JS", "SQL"],
    connections: [{ userId: 1, status: "pending" }],
    posts: [2]
  }
];

var posts = [
  { id: 1, content: "welcome to linkedin account let's discover it", likes: 0, userId: 1, image: "", comments: [] },
  { id: 2, content: "welcome to Arig linkedin account", likes: 0, userId: 2, image: "", comments: [] },
  { id: 3, content: "i have an idea", likes: 0, userId: 1, image: "", comments: [] }
];

/******************** STORAGE ********************/

function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

/******************** INIT ********************/

if (!localStorage.getItem("LinkedIn Users")) {
  saveData("LinkedIn Users", users);
}

if (!localStorage.getItem("LinkedIn Posts")) {
  saveData("LinkedIn Posts", posts);
}

/******************** CURRENT USER ********************/
function getCurrentUser() {
  let id = sessionStorage.getItem("currentUser");
  let users = getData("LinkedIn Users");

  if (!id) return null;

  return users.find(u => u.id == id) || null;
}

/******************** REGISTER ********************/
function registerToLinkedIn() {

  console.log("REGISTER CLICKED");

  var fullName = document.getElementById("fullName").value.trim();
  var email = document.getElementById("email").value.trim();
  var password = document.getElementById("password").value.trim();
  var phoneNo = document.getElementById("PhoneNumber").value.trim();

  var users = JSON.parse(localStorage.getItem("LinkedIn Users")) || [];

  // check duplicate email
  for (var i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      alert("Email already exists");
      return;
    }
  }

  var newUser = {
    id: Date.now(),
    fullName: fullName,
    email: email,
    password: password,
    phoneNo: phoneNo,
    image: "1771685065878.png",
    title: "",
    location: "",
    about: "",
    skills: [],
    connections: [],
    posts: []
  };

  users.push(newUser);

  localStorage.setItem("LinkedIn Users", JSON.stringify(users));

  console.log("USERS SAVED:", users);

  alert("Registered successfully");

  window.location.href = "login.html";
}
/******************** LOGIN ********************/
function login() {

  var email = document.getElementById("email").value.trim();
  var password = document.getElementById("password").value.trim();

  var users = JSON.parse(localStorage.getItem("LinkedIn Users")) || [];

  if (users.length === 0) {
    alert("No users found, please register first");
    return;
  }

  var currentUser = null;

  for (var i = 0; i < users.length; i++) {

    if (
      users[i].email === email &&
      users[i].password === password
    ) {
      currentUser = users[i];
      break;
    }
  }

  if (currentUser) {

    sessionStorage.setItem("currentUser", currentUser.id);

    window.location.href = "home.html";

  } else {
    alert("Invalid email or password");
  }
}

/******************** LOGOUT ********************/

function logout() {
  sessionStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

/******************** HOME RENDER ********************/

var selectedImage = "";

document.addEventListener("change", function (e) {
  if (e.target.id === "postImageInput") {
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onload = function () {
      selectedImage = reader.result;
      document.getElementById("imagePreview").src = selectedImage;
      document.getElementById("imagePreviewContainer").style.display = "block";
    };

    reader.readAsDataURL(file);
  }
});

/******************** CREATE POST ********************/

function createPost() {

  var user = getCurrentUser();
  if (!user) {
    alert("اعمل login الأول");
    return;
  }

  var content = document.getElementById("postInput").value;

  if (content.trim() === "" && selectedImage === "") {
    return;
  }

  var posts = getData("LinkedIn Posts");

  var newPost = {
    id: Date.now(),
    userId: user.id,
    content: content,
    image: selectedImage,
    likes: 0,
    comments: []
  };

  posts.push(newPost);
  saveData("LinkedIn Posts", posts);

  // تنظيف
  selectedImage = "";
  document.getElementById("postInput").value = "";
  document.getElementById("imagePreviewContainer").style.display = "none";

  renderPosts();
}

/******************** RENDER POSTS ********************/

function renderPosts() {

  var feed = document.getElementById("feed");
  if (!feed) return;

  var users = getData("LinkedIn Users");
  var posts = getData("LinkedIn Posts");

  feed.innerHTML = "";

  for (var i = posts.length - 1; i >= 0; i--) {

    var post = posts[i];
    var user = users.find(u => u.id == post.userId);

    feed.innerHTML += `
      <div class="card p-3 mb-3">

        <strong>${user ? user.fullName : "User"}</strong>
        <p>${post.content}</p>

        ${post.image ? `<img src="${post.image}" style="width:100%;border-radius:10px;">` : ""}

        <div class="mt-2">
          <button onclick="likePost(${post.id})">👍 Like (${post.likes})</button>
          <button onclick="toggleComment(${post.id})">💬 Comment</button>
        </div>

        <div id="commentBox-${post.id}" style="display:none;">
          <input id="comment-${post.id}" class="form-control mt-2">
          <button onclick="addComment(${post.id})">Post</button>
        </div>

        ${post.comments.map(c => `<div>💬 ${c}</div>`).join("")}

      </div>
    `;
  }
}

/******************** LIKE ********************/

function likePost(id) {
  var posts = getData("LinkedIn Posts");

  posts.forEach(p => {
    if (p.id == id) p.likes++;
  });

  saveData("LinkedIn Posts", posts);
  renderPosts();
}

/******************** COMMENT ********************/
function addComment(id) {

  var input = document.getElementById("comment-" + id);
  var text = input.value;

  if (text.trim() === "") return;

  var posts = getData("LinkedIn Posts");

  posts.forEach(p => {
    if (p.id == id) {
      p.comments.push(text);
    }
  });

  saveData("LinkedIn Posts", posts);
  renderPosts();
}

function toggleComment(id) {
  var box = document.getElementById("commentBox-" + id);
  box.style.display = box.style.display === "none" ? "block" : "none";
}

/******************** PROFILE ********************/

function renderProfile() {

  var user = getCurrentUser();
  if (!user) return;

  document.getElementById("profileName").innerText = user.fullName;
  document.getElementById("profileTitle").innerText = user.title;
  document.getElementById("profileLocation").innerText = user.location;
  document.getElementById("profilePhone").innerText = user.phoneNo;
  document.getElementById("profileAbout").innerText = user.about;

  var skillsContainer = document.getElementById("skillsContainer");
  skillsContainer.innerHTML = "";

  user.skills.forEach(skill => {
    skillsContainer.innerHTML += `<span class="badge bg-primary">${skill}</span>`;
  });

  document.getElementById("userName").innerText = user.fullName;
}

/******************** SAVE PROFILE ********************/

function saveProfile() {

  var users = getData("LinkedIn Users");
  var user = getCurrentUser();

  var updatedUser = {
    ...user,
    fullName: document.getElementById("editName").value,
    title: document.getElementById("editTitle").value,
    location: document.getElementById("editLocation").value,
    phoneNo: document.getElementById("editPhone").value,
    about: document.getElementById("editAbout").value
  };

  users = users.map(u => u.id == user.id ? updatedUser : u);

  saveData("LinkedIn Users", users);
  sessionStorage.setItem("currentUser", updatedUser.id);

  renderProfile();
  alert("Profile updated");
}

/******************** INIT ON LOAD ********************/
window.onload = function () {

  renderPosts();
  renderProfile();

  var btn = document.getElementById("postBtn");
  if (btn) {
    btn.onclick = createPost;
  }
};



