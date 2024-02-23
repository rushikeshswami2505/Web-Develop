function create() {
    window.location.href = "signup.html";
}

let userEmail = document.getElementById("uemail");
let userPassword = document.getElementById("upassword");

let storedEmail = localStorage.getItem("id");
let storedPassword = localStorage.getItem("password");

function login(){
    console.log("called");
    if(userEmail.value === storedEmail && userPassword.value === storedPassword){
        window.location.href = "home.html";
    } else {
        alert("Incorrect email or password");
    }
}
