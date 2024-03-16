// got to youtube page
function loginIntoYoutube() {
    window.location.href = "youtube.html";
}

// go to signup page
function create(){
    window.location.href = "signup.html";
}

// get local storage
const existingUsersDataString = localStorage.getItem("usersData");
let usersdata = [];
if (existingUsersDataString) {
    usersdata = JSON.parse(existingUsersDataString);
}

// all local variable for input data
let currentEmail = document.getElementById("uemail");
let currentPassword = document.getElementById("upassword");
let emailAlert = document.getElementById("emailAlert");
let passwordAlert = document.getElementById("passwordAlert");
let toast = document.getElementById('toast');
let forgotEmail = document.getElementById("forgotEmail");
let newPassword = document.getElementById("newPassword");
let confirmPassword = document.getElementById("confirmPassword");
let forgotEmailalert = document.getElementById("forgotEmailalert");
let fogotPasswordalert = document.getElementById("fogotPasswordalert");
let forgotConfirmPasswordalert = document.getElementById("forgotConfirmPasswordalert");

// disable login button till user enter all deatils
let loginbtn = document.getElementById("btnSignIn");
loginbtn.disabled = true;

// disable for email 
currentEmail.addEventListener('input', function(){
    loginbtn.disabled = currentEmail.value.length === 0 || currentPassword.value.length === 0;
});

// disable for password 
currentPassword.addEventListener('input', function(){
    loginbtn.disabled = currentEmail.value.length === 0 || currentPassword.value.length ===0;
});

// After clicking on login it checks all validation first then it calls youtube page
function login(event){
    event.preventDefault();
    if(currentEmail.value.length<4) {
        emailAlert.innerText = "Please enter valid email";
        emailAlert.style.display = 'block';
        return;
    }
    else{
        emailAlert.style.display = 'none';
    }
    if(currentPassword.value.length<4){
        passwordAlert.innerText = "Please enter valid password";
        passwordAlert.style.display = 'block';
        return;
    }else{
        passwordAlert.style.display = 'none';
    }

    let validemail = false, validpassword = false;
    let currentUser = 0;
    if(usersdata.length!==0){
        usersdata.forEach((user,index)=> {
            const userEmail = user.email;
            const userPassword = user.password;
            if(userEmail===currentEmail.value){
                validemail = true;
                if(userPassword===currentPassword.value){
                    currentUser = user;
                    validpassword = true;
                }
                
            }
        });
    }
    else{
        toast.classList.remove('hidden');
        toast.classList.add('error');
        toast.classList.remove('success');
        toast.textContent = "No record is found!";
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
        return;
    }    

    if(!validemail){
        emailAlert.innerText = "Couldn't find your Account";
        emailAlert.style.display = 'block'; 
        toast.classList.remove('hidden');
        toast.classList.add('error');
        toast.classList.remove('success');
        toast.textContent = "Incorrect email!";
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
        return;
    }
    else if(!validpassword){
        passwordAlert.innerText = "Wrong password. Please try again.";
        passwordAlert.style.display = 'block';
        toast.classList.remove('hidden');
        toast.classList.add('error');
        toast.classList.remove('success'); 
        toast.textContent = "Incorrect password!";
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
        return;
    }
    else {
        localStorage.setItem("currentuser",JSON.stringify(currentUser));
        emailAlert.innerText = "";
        emailAlert.style.display = 'none'; 
        passwordAlert.innerText = "";
        passwordAlert.style.display = 'none'; 
        toast.classList.remove('hidden');
        toast.classList.remove('error');
        toast.classList.add('success');
        toast.textContent = "Login successful...";
        setTimeout(() => {
            toast.classList.add('hidden');
            loginIntoYoutube();
        }, 1000);
    }
}

// It checks all the new password and old password validation after click on reset password
function resetPassword(event) {
    event.preventDefault();
    let forgotemail = forgotEmail.value;
    let newpassword =  newPassword.value;
    let confirmpassword = confirmPassword.value;
    let valid = false;
    index = isEmailRegistered(forgotemail);
    if(index===-1){
        return;
    }
    valid = isValidPass(newpassword);
    valid = isValidCpass(newpassword,confirmpassword);
    if(!valid){
        return;
    }
    usersdata[index].password = newpassword;
    localStorage.setItem("usersData", JSON.stringify(usersdata));
    $(".closebtn").click();
    toast.classList.remove('hidden');
    toast.classList.add('success');
    toast.classList.remove('error');
    toast.textContent = "Password reset successful!";
    setTimeout(() => {
        toast.classList.add('hidden');
    },1000);
    
}

// Validation for new passowrd
function isValidPass(passVal){
    
    if(passVal.length==0){
        updateTextError(fogotPasswordalert,"Password is required",true);
        newPassword.style.border = "1px solid red";
        return false;
    } 
    else if(passVal.length<8){
        updateTextError(fogotPasswordalert,"Password must be at least 8 characters long  ",true);
        newPassword.style.border = "1px solid red";
        return false;
    }
    else if((/\s/.test(passVal))) {
        updateTextError(fogotPasswordalert,"Invalid Password. Spaces are not allowed",true);
        newPassword.style.border = "1px solid red";
        return false;
    }

    let capital = false, lower = false, number = false, sybmol = false, len = true;
    for (let i = 0; i < passVal.length; i++) {
        let c = passVal.charAt(i);
        if (c >= 'A' && c <= 'Z') capital = true;
        else if (c >= 'a' && c <= 'z') lower = true;
        else if (c >= '0' && c <= '9') number = true;
        else sybmol = true;
    }

    if (!capital || !lower || !number || !sybmol || !len) {
        updateTextError(fogotPasswordalert,"Password must include at least one lowercase letter, one uppercase letter, one number, and one symbol",true);
        newPassword.style.border = "1px solid red";
        return false;
    }
    else{
        updateTextError(fogotPasswordalert,"",false);
        newPassword.style.border = "0px solid red";
        return true;
    }
}

// Validation for confirm new password
function isValidCpass(passVal,cpassVal){
    cpassVal = cpassVal.trim();
    passVal = passVal.trim();

    if(cpassVal.length === 0) updateTextError(forgotConfirmPasswordalert,"Confirm password is required",true);
    else if(cpassVal!==passVal) updateTextError(forgotConfirmPasswordalert,"Password didn't match",true);
    else{
        confirmPassword.style.border = "0px solid red";
        updateTextError(forgotConfirmPasswordalert,"",false);
        return true;
    }
    confirmPassword.style.border = "1px solid red";
    return false;
}

// Validation for email
function isValidEmail(emailVal) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (forgotEmailalert.length === 0) {
        updateTextError(forgotEmailalert, "Email is required", true);
    } else if (!emailRegex.test(emailVal)) {
        updateTextError(forgotEmailalert, "Invalid email format", true);
    } else {
        forgotEmail.style.border = "0px solid red";
        updateTextError(forgotEmailalert, "", false);
        return true;
    }

    forgotEmail.style.border = "1px solid red";
    return true;
}

// Validate if user already registered or not
function isEmailRegistered(emailVal) {
    for (let index = 0; index < usersdata.length; index++) {
        const user = usersdata[index];
        const userEmail = user.email;
        if (userEmail === emailVal) {
            forgotEmail.style.border = "0px solid red";
            updateTextError(forgotEmailalert, "", false);
            return index;
        }
    }

    forgotEmail.style.border = "1px solid red";
    updateTextError(forgotEmailalert, "Email is not registered", true);

    return -1;
}

// It set the error msg if user entered the wrong input
function updateTextError(element,msg,state){
    if(state){
        element.style.display = 'block';
        element.innerText = msg; 
    }else{
        element.style.display = 'none';
    }
}