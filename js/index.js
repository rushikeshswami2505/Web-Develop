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

// let storedEmail = "", storedPassword="";
// if (user) {
//     storedEmail = user.userId.length;
//     storedPassword = user.userPassword;
// } else {
//     console.log("User not found in localStorage");
// }

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
        emailAlert.innerText = "Please enter valid username";
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
    if(usersdata.length!==0){
        usersdata.forEach((user,index)=> {
            const userEmail = user.email;
            const userPassword = user.password;
            const userUsername = user.username;
            if(userEmail===currentEmail.value || userUsername===currentEmail.value){
                validemail = true;
                if(userPassword===currentPassword.value){
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
        toast.textContent = "Incorrect username!";
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
            window.location.href = "home.html";
        }, 1000);
        // toast sucesfull
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