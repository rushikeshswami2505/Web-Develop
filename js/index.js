function create() {
    window.location.href = "signup.html";
}

const user = JSON.parse(localStorage.getItem("user"));

let storedEmail = "", storedPassword="";
if (user) {
    storedEmail = user.userId.length;
    storedPassword = user.userPassword;
} else {
    console.log("User not found in localStorage");
}
let userEmail = document.getElementById("uemail");
let userPassword = document.getElementById("upassword");
let emailAlert = document.getElementById("emailAlert");
let passwordAlert = document.getElementById("passwordAlert");

let loginbtn = document.getElementById("btnSignIn");
loginbtn.disabled = true;

userEmail.addEventListener('input', function(){
    loginbtn.disabled = userEmail.value.length === 0 || userPassword.value.length === 0;
    console.log(userEmail.value.length+" "+userPassword.value.length);
});

userPassword.addEventListener('input', function(){
    loginbtn.disabled = userEmail.value.length === 0 || userPassword.value.length ===0;
    console.log(userEmail.value.length+" "+userPassword.value.length);
});

function login(event){
    event.preventDefault();
    console.log("called"+userPassword.value+" "+storedPassword);
    if(userEmail.value.length<4) {
        emailAlert.innerText = "Please enter valid username";
        emailAlert.style.display = 'block';
        return;
    }
    else{
        emailAlert.style.display = 'none';
    }
    if(userPassword.value.length<4){
        passwordAlert.innerText = "Please enter valid password";
        passwordAlert.style.display = 'block';
        return;
    }else{
        passwordAlert.style.display = 'none';
    }

    if(userEmail.value!=storedEmail){
        emailAlert.innerText = "Couldn't find your Account";
        emailAlert.style.display = 'block'; 
        return;
    }
    else{
        emailAlert.style.display = 'none';
    }
    if(userPassword.value!=storedPassword){
        passwordAlert.innerText = "Wrong password. Please try again.";
        passwordAlert.style.display = 'block'; 
        return;
    }
    else{
        passwordAlert.style.display = 'none';
    }

    window.location.href = "home.html";
    if(userEmail.value === storedEmail && userPassword.value === storedPassword){

    } else {
        // alert("Incorrect email or password");
    }
}