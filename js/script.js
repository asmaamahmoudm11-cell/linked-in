            // LinkedIn   users ==> connections  posts   skills    companies -=> jobs =>  applicants 

            // Input 
            // Data Seeding 
            var users = [
            {
              id:1 , 
              fullName:"abdallah" ,
              email:"abdallah@gmail.com" ,
              password:"14589" , 
              phoneNo:"01205455454" , 
              skills:["HTML" ,"CSS" ,"JS" , "Mongo" , "ML"] , 
              connections: [ 
                {userId:2 , status:"pending"} 
              ] , 
              posts:[1 , 3]
            } , 
             
            {
              id:2 , 
              fullName:"arig" ,
              email:"arig@gmail.com" ,
              password:"118969" , 
              phoneNo:"01541554554" , 
              skills:["Redux" ,"AI" ,"JS" , "SQL"] , 
              connections: [ 
                {userId:1 , status:"pending"} 
                
              ] , 
              posts:[2]
            } , 
             

            ]
            var posts = 
            [
             {
              id:1, 
              content:"welcome to linkedin account let's discover it" , 
              likes:0 , 
              userId:1
             } ,
             {
              id:2, 
              content:"welcome to Arig linkedin account " , 
              likes:0 , 
              userId:2
             } ,
            {
              id:3, 
              content:"i have an dedaya" , 
              likes:0 , 
              userId:1
             }

            ]
            var companies = [
              {
                id: 1 ,
                name:"ITWorks" , 
                location:"cairo" , 
                jobs: [2] 
              } ,
               {
                id: 2 ,
                name:"Spacetech" , 
                location:"Alex" , 
                jobs: [1] 
              }
            ]

            var Jobs = [
              {
                id:1 , 
                name:"Frontend Engineer" , 
                description:"mtolb gdn" , 
                companyId:2 , 
                applicants: [1,2]
              } , 
              {
                id:2 , 
                name:"Full Stack Engineer" , 
                description:"3ayzin Full stack tninin mogn7" , 
                companyId:1 , 
                applicants: [2]
              } 
            ]
            function saveData(key, value) {
          localStorage.setItem(key, JSON.stringify(value));
}

        function getData(key) {
       return JSON.parse(localStorage.getItem(key)) || [];
       }
            
          //   user to linkedIn => register    //
      
function registerToLinkedIn(){

 var   fullName = document.getElementById("  fullName").value;
 var email = document.getElementById("email").value;
 var password = document.getElementById("password").value;


 
 var users = getData("LinkedIn Users") 
 
 for(var i = 0 ; i<users.length ; i++)
 {
 if(email == users[i].email)
 {
 alert("email is already exist can't take it try with another "); 
 return ; 
 }
 }
 var newUser = {
 id: Math.floor( Math.random() * 1000) , 
    fullName: fullName,
    email: email,
    password: password,
    image: "1771685065878.png",
    skills: [],
    connections: [],
    posts: []
  };
 users.push(newUser)
 saveData("LinkedIn Users" , users)
 alert("welcome to Linkedin account congrats for user " + fullName);
  window.location.href = "login.html";
 }


            // localStorage.clear(); 
              // saveData("LinkedIn Users" , users)
          //  debugger ;
          //  registerToLinkedIn("Blal" , "Ghoneim@gmail.com" ,"4123" ,"0112010411" ,  25)

// Login
function login()
 {
 // Data => Database/LocalStorage => Memory => operation 
 var email = document.getElementById("email").value;
 var password = document.getElementById("password").value;

 var users = getData("LinkedIn Users") ;

 for(var i = 0 ; i<users.length ; i++)
 {
 if(users[i].email == email && users[i].password == password)
 {
 // alert("Welocme to Home Page user " + users[i].name) ; 
 window.location.href = "./home.html";
 sessionStorage.setItem("currentUser" , users[i].id)

 return;
 }
 }
 alert("invalid login please try with correct username or password"); 
 }
 
 //show current user
 var userId = sessionStorage.getItem("currentUser");
 var users = getData("LinkedIn Users");

 // var currentUser = null;

 for (var i = 0; i < users.length; i++) {
 if (users[i].id == userId) {
 currentUser = users[i];
 }
 }

 if (currentUser) {
document.getElementById("userName").innerText = users.fullName;
 document.getElementById("userImg").src = currentUser.image;
 }
 //edit profil
 var newUser = {
  id: Math.floor(Math.random() * 1000),
  fullName,
  email,
  password,
  phoneNo,
  title: "",
  location: "",
  about: "",
  image: "1771685065878.png",
  skills: [],
  connections: [],
  posts: []
};
function getCurrentUser() {
  let users = JSON.parse(localStorage.getItem("LinkedIn Users")) || [];
  let id = sessionStorage.getItem("currentUser");

  return users.find(u => u.id == id);
}

function renderProfile() {
  let user = getCurrentUser();
  if (!user) return;

  document.getElementById("profileName").innerText = user.fullName || "";
  document.getElementById("profileTitle").innerText = user.title || "";
  document.getElementById("profileLocation").innerText = user.location || "";
  document.getElementById("profilePhone").innerText = user.phoneNo || "";
  document.getElementById("profileAbout").innerText = user.about || "No about section yet.";

  // skills
  let skillsContainer = document.getElementById("skillsContainer");
  skillsContainer.innerHTML = "";

  (user.skills || []).forEach(skill => {
    skillsContainer.innerHTML += `
      <span class="badge bg-primary">${skill}</span>
    `;
  });

  // navbar name
  document.getElementById("userName").innerText = user.fullName;
}window.onload = function () {
  renderProfile();
};
function saveProfile() {
  let users = JSON.parse(localStorage.getItem("LinkedIn Users")) || [];
  let currentUser = getCurrentUser();

  let updatedUser = {
    ...currentUser,
    fullName: document.getElementById("editName").value,
    title: document.getElementById("editTitle").value,
    location: document.getElementById("editLocation").value,
    phoneNo: document.getElementById("editPhone").value
  };

  users = users.map(u => u.id == currentUser.id ? updatedUser : u);

  localStorage.setItem("LinkedIn Users", JSON.stringify(users));
  sessionStorage.setItem("currentUser", updatedUser.id);

  renderProfile(); // 👈 أهم سطر

  alert("Profile updated successfully");
}





