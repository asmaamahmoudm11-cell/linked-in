// =====================
// LinkedIn Clone (Front-end Only)
// =====================

// ---------- Seed Data ----------
var users = [
  {
    id: 1,
    fullName: "abdallah",
    email: "abdallah@gmail.com",
    password: "14589",
    phoneNo: "01205455454",
    skills: ["HTML", "CSS", "JS", "Mongo", "ML"],
    connections: [{ userId: 2, status: "pending" }],
    posts: [1, 3],
    image: "1771685065878.png",
    title: "Junior Developer",
    location: "Cairo"
  },
  {
    id: 2,
    fullName: "arig",
    email: "arig@gmail.com",
    password: "118969",
    phoneNo: "01541554554",
    skills: ["Redux", "AI", "JS", "SQL"],
    connections: [{ userId: 1, status: "pending" }],
    posts: [2],
    image: "1771685065878.png",
    title: "Frontend Dev",
    location: "Alex"
  }
];

// ---------- LocalStorage Helpers ----------
function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

// initialize first time only
if (!localStorage.getItem("LinkedIn Users")) {
  saveData("LinkedIn Users", users);
}

// ---------- Get Current User ----------
function getCurrentUser() {
  let users = getData("LinkedIn Users");
  let userId = sessionStorage.getItem("currentUser");

  return users.find(u => u.id == userId);
}

// =====================
// REGISTER
// =====================
function registerToLinkedIn() {
  var fullName = document.getElementById("fullName").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  var users = getData("LinkedIn Users");

  for (var i = 0; i < users.length; i++) {
    if (email == users[i].email) {
      alert("Email already exists!");
      return;
    }
  }

  var newUser = {
    id: Math.floor(Math.random() * 1000),
    fullName,
    email,
    password,
    phoneNo: "",
    skills: [],
    connections: [],
    posts: [],
    image: "1771685065878.png",
    title: "",
    location: ""
  };

  users.push(newUser);
  saveData("LinkedIn Users", users);

  alert("Welcome " + fullName);
  window.location.href = "login.html";
}

// =====================
// LOGIN
// =====================
function login() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  var users = getData("LinkedIn Users");

  for (var i = 0; i < users.length; i++) {
    if (users[i].email == email && users[i].password == password) {
      sessionStorage.setItem("currentUser", users[i].id);
      window.location.href = "home.html";
      return;
    }
  }

  alert("Invalid login");
}

// =====================
// LOAD PROFILE UI
// =====================
function loadProfile() {
  let user = getCurrentUser();
  if (!user) return;

  document.getElementById("profileName").innerText = user.fullName;
  document.getElementById("profileTitle").innerText = user.title || "";
  document.getElementById("profileLocation").innerText = user.location || "";
  document.getElementById("profilePhone").innerText = user.phoneNo || "";

  // skills
  let skillsContainer = document.getElementById("skillsContainer");
  if (skillsContainer) {
    skillsContainer.innerHTML = "";

    (user.skills || []).forEach(skill => {
      let span = document.createElement("span");
      span.className = "badge bg-primary";
      span.innerText = skill;
      skillsContainer.appendChild(span);
    });
  }

  // dropdown name
  let userName = document.getElementById("userName");
  if (userName) userName.innerText = user.fullName;
}

// =====================
// EDIT PROFILE SAVE
// =====================
function saveProfile() {
  let users = getData("LinkedIn Users");
  let userId = sessionStorage.getItem("currentUser");

  let updatedUsers = users.map(u => {
    if (u.id == userId) {
      return {
        ...u,
        fullName: document.getElementById("editName").value,
        title: document.getElementById("editTitle").value,
        location: document.getElementById("editLocation").value,
        phoneNo: document.getElementById("editPhone").value
      };
    }
    return u;
  });

  saveData("LinkedIn Users", updatedUsers);

  alert("Profile updated ✅");

  loadProfile();
  closeEditModal();
}

// =====================
// MODAL CONTROL
// =====================
function openEditModal() {
  let user = getCurrentUser();

  document.getElementById("editName").value = user.fullName;
  document.getElementById("editTitle").value = user.title || "";
  document.getElementById("editLocation").value = user.location || "";
  document.getElementById("editPhone").value = user.phoneNo || "";

  document.getElementById("editModal").style.display = "flex";
}

function closeEditModal() {
  document.getElementById("editModal").style.display = "none";
}

// buttons
document.getElementById("openEditModal")?.addEventListener("click", openEditModal);
document.getElementById("closeEditModal")?.addEventListener("click", closeEditModal);
document.getElementById("closeEditModal2")?.addEventListener("click", closeEditModal);

// save button
document.getElementById("saveProfile")?.addEventListener("click", saveProfile);

// =====================
// INIT
// =====================
document.addEventListener("DOMContentLoaded", function () {
  loadProfile();
});