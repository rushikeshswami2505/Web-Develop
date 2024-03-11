function create() {
    window.location.href = "signup.html";
}
const existingUsersDataString = localStorage.getItem("usersData");
let usersdata = [];
if (existingUsersDataString) {
    usersdata = JSON.parse(existingUsersDataString);
}

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


let loginbtn = document.getElementById("btnSignIn");
loginbtn.disabled = true;

currentEmail.addEventListener('input', function(){
    loginbtn.disabled = currentEmail.value.length === 0 || currentPassword.value.length === 0;
    console.log(currentEmail.value.length+" "+currentPassword.value.length);
});

currentPassword.addEventListener('input', function(){
    loginbtn.disabled = currentEmail.value.length === 0 || currentPassword.value.length ===0;
    console.log(currentEmail.value.length+" "+currentPassword.value.length);
});

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
    let currentuser = 0;
    if(usersdata.length!==0){
        usersdata.forEach((user,index)=> {
            const userEmail = user.email;
            const userPassword = user.password;
            // const userUsername = user.username;
            if(userEmail===currentEmail.value){
                validemail = true;
                if(userPassword===currentPassword.value){
                    currentuser = index;
                    validpassword = true;
                    // break;
                }
                
            }
        });
    }
    else{
        // toast no record is found 
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
        // toast for password
    }
    else {
        console.log(currentuser);
        localStorage.setItem("currentuser",currentuser);
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
            window.location.href = "index.html";
        }, 1000);
        // toast sucesfull
    }
}

function forgotPassword(){

}
function openModal() {
    document.getElementById('forgotPasswordModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('forgotPasswordModal').style.display = 'none';
}

function resetPassword() {
    // Add your password reset logic here
    let forgotemail = forgotEmail.value;
    let newpassword =  newPassword.value;
    let confirmpassword = confirmPassword.value;
    let valid = false;
    // valid = isValidEmail(forgotemail);
    index = isEmailRegistered(forgotemail);
    if(index===-1){
        // updateTextError(fogotPasswordalert,"Email is not registered",true);
        console.log(index);
        return;
    }
    else{
        console.log(index);
        // updateTextError(fogotPasswordalert,"",false);
    }
    valid = isValidPass(newpassword);
    valid = isValidCpass(newpassword,confirmpassword);
    if(!valid){
        return;
    }
    usersdata[index].password = newpassword;
    localStorage.setItem("usersData", JSON.stringify(usersdata));
    closeModal();
    toast.classList.remove('hidden');
    toast.classList.add('success');
    toast.classList.remove('error');
    toast.textContent = "Password reset successful!";
    setTimeout(() => {
        toast.classList.add('hidden');
    },3000);
}

// Close modal if clicked outside of it
window.onclick = function (event) {
    var modal = document.getElementById('forgotPasswordModal');
    if (event.target == modal) {
        closeModal();
    }
}
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
        console.log(c + " " + capital + " " + lower + " " + number + " " + sybmol);
    }
    console.log(capital + " " + lower + " " + number + " " + sybmol);

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
function isEmailRegistered(emailVal) {
    for (let index = 0; index < usersdata.length; index++) {
        const user = usersdata[index];
        const userEmail = user.email;
        // const userUsername = user.username;

        // console.log(emailVal, " ", userUsername);
        if (userEmail === emailVal) {
            forgotEmail.style.border = "0px solid red";
            updateTextError(forgotEmailalert, "", false);
            return index; // Break the loop and return the index
        }
    }

    console.log(emailVal);
    forgotEmail.style.border = "1px solid red";
    updateTextError(forgotEmailalert, "Email is not registered", true);

    return -1; // Return -1 if no match is found
}

function updateTextError(element,msg,state){
    if(state){
        element.style.display = 'block';
        element.innerText = msg; 
    }else{
        element.style.display = 'none';
    }
}


// const notifications = document.querySelector(".notifications");

// const toastDetails = {
//     timer: 5000,
//     success: {
//         icon: 'fa-circle-check',
//         text: 'Success: This is a success toast.',
//     },
//     error: {
//         icon: 'fa-circle-xmark',
//         text: 'Error: This is an error toast.',
//     },
//     warning: {
//         icon: 'fa-triangle-exclamation',
//         text: 'Warning: This is a warning toast.',
//     },
//     info: {
//         icon: 'fa-circle-info',
//         text: 'Info: This is an information toast.',
//     }
// }
// const removeToast = (toast) => {
//     toast.classList.add("hide");
//     if(toast.timeoutId) clearTimeout(toast.timeoutId); // Clearing the timeout for the toast
//     setTimeout(() => toast.remove(), 500); // Removing the toast after 500ms
// }
// const createToast = (id) => {
//     // Getting the icon and text for the toast based on the id passed
//     const { icon, text } = toastDetails[id];
//     const toast = document.createElement("li"); // Creating a new 'li' element for the toast
//     toast.className = `toast ${id}`; // Setting the classes for the toast
//     // Setting the inner HTML for the toast
//     toast.innerHTML = `<div class="column">
//                          <i class="fa-solid ${icon}"></i>
//                          <span>${text}</span>
//                       </div>
//                       <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
//     notifications.appendChild(toast); // Append the toast to the notification ul
//     // Setting a timeout to remove the toast after the specified duration
//     toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer);
// }