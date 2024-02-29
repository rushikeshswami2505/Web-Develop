var inputTel = document.querySelector("#tel");
window.intlTelInput(inputTel);

var inputTelalter = document.querySelector("#telalter");
window.intlTelInput(inputTelalter);

// You can repeat the above steps for the second phone input if needed


// input
let email = document.getElementById("email");
let username = document.getElementById("username");
let firstname = document.getElementById("firstname");
let lastname = document.getElementById("lastname");
let tel = document.getElementById("tel");
let telalter = document.getElementById("telalter");
let password = document.getElementById("password");
let cpassword = document.getElementById("cpassword");
let gender = document.getElementsByName("gender");
let dob = document.getElementById("dob");

let admin = document.getElementById("admin");
let user = document.getElementById("user");
let adminread = document.getElementById("adminread");
let adminwrite = document.getElementById("adminwrite");
let adminupdate = document.getElementById("adminupdate");
let userread = document.getElementById("userread");
let userupdate = document.getElementById("userupdate");
let userexecute = document.getElementById("userexecute");

let address = document.getElementById("fixedTextarea");
let skills = document.getElementById("skillsAutocomplete");
let language = document.getElementById("language");

// alert msg
let emailAlert = document.getElementById("emailalert");
let usernameAlert = document.getElementById("usernamealert");
let firstnameAlert = document.getElementById("firstnamealert");
let lastnameAlert = document.getElementById("lastnamealert");
let telAlert = document.getElementById("telalert");
let telalterAlert = document.getElementById("telalteralert");
let passwordAlert = document.getElementById("passwordalert");
let cpasswordAlert = document.getElementById("cpasswordalert");
let genderAlert = document.getElementById("genderalert");
let dobAlert = document.getElementById("dobalert");
let rolAlert = document.getElementById("rolealert");
let addressAlert = document.getElementById("addressalert");
let skillsAlert = document.getElementById("skillsalert");
let languageAlert = document.getElementById("languagealert");
var selectedCountryDataTel = window.intlTelInput(inputTel).getSelectedCountryData();
var selectedCountryDataTelalter = window.intlTelInput(inputTelalter).getSelectedCountryData();
    
// console.log(selectedCountryDataTel.dialCode);    

const skillsList = [];
//ALL FUNCTIONS 
function login() {
    console.log("ok");
    window.location.href = "index.html";
}

function signupValidity(event) {
    event.preventDefault();
    
    let emailVal =  email.value;
    let usernameVal = username.value;
    let firstnameVal = firstname.value;
    let lastnameVal = lastname.value;
    let telVal = tel.value;
    let telalterVal = telalter.value;
    let passVal = password.value;
    let cpassVal = cpassword.value;
    let dobVal = dob.value;
    let genderVal = "";
    let addressVal = address.value;
    let languageVal = language.options[language.selectedIndex].value;

    
    gender.forEach(radio =>  {
        if(radio.checked){
            genderVal = radio.value;
        }
    });

    if(emailVal.length==0) updateTextError(emailAlert,"Please enter Email",true);
    else updateTextError(emailAlert,"",false);

    let valid = false;
    valid = isValidEmail(emailVal);
    valid = isValidUsername(usernameVal);
    valid = isValidFirstname(firstnameVal);
    valid = isValidLastname(lastnameVal);
    valid = isValidTel(telVal); 
    valid = isValidTelalter(telalterVal);
    valid = isValidPass(passVal);
    valid = isValidCpass(passVal,cpassVal);
    valid = isValidGender(genderVal);
    valid = isValidDob(dobVal);
    valid = isValidRole();
    valid = isValidAddress(addressVal);
    valid = isValidSkills(skillsList);
    valid = isValidLanguage(languageVal);

    var selectedCountryDataTel = window.intlTelInput(inputTel).getSelectedCountryData().dialCode;
    var selectedCountryDataTelalter = window.intlTelInput(inputTelalter).getSelectedCountryData().dialCode;
    const role = [];
    if(admin.checked || adminread.indeterminate){
        role.push('admin');
        if(adminread.checked) role.push('read');
        if(adminwrite.checked) role.push('write');
        if(adminupdate.checked) role.push('update');
    }else{
        role.push('user');
        if(userread.checked) role.push('read');
        if(userupdate.checked) role.push('update');
        if(userexecute.checked) role.push('execute');
    }

    const usersdata = [];
    const user = {
        userEmail : emailVal,
        userUsername : usernameVal ,
        userFirstname : firstnameVal,
        userLastname : lastnameVal,
        userTel : telVal,
        userTelalter : telalterVal,
        userPassword : passVal,
        userGender : gender,
        userDob : dobVal,
        userAddress : addressVal,
        userLanguage : languageVal,
        userRole : role,
        userSkills : skillsList
    };
    usersdata.push(user);
    localStorage.setItem("usersdate",usersdata);
    return false;
}

// ALL VALIDATION FUNCTIONS

function updateTextError(element,msg,state){
    if(state){
        element.style.display = 'block';
        element.innerText = msg; 
    }else{
        element.style.display = 'none';
    }
}

function isValidEmail(emailVal) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailVal.length === 0) {
        updateTextError(emailAlert, "Email is required", true);
    } else if (!emailRegex.test(emailVal)) {
        updateTextError(emailAlert, "Invalid email format", true);
    } else {
        email.style.border = "0px solid red";
        updateTextError(emailAlert, "", false);
        return true;
    }

    email.style.border = "1px solid red";
    return true;
}

function isValidUsername(usernameVal){
    console.log("uname: "+usernameVal);
    const regex = /^[a-zA-Z0-9_.]+$/;
    usernameVal.trim();
    if(usernameVal.length==0) updateTextError(usernameAlert,"Username is required",true);
    else if(usernameVal.length<6) updateTextError(usernameAlert,"Username should be at least 6 characters long",true);
    else if((/\s/.test(usernameVal))) updateTextError(usernameAlert,"Invalid username. Spaces are not allowed",true);
    else if (!regex.test(usernameVal)) updateTextError(usernameAlert, "Username can only contain letters, numbers, dots (.), and underscores (_).", true);
    else {
        username.style.border = "0px solid red";
        updateTextError(usernameAlert,"",false);
        return true;
    }
    username.style.border = "1px solid red";
    return false;
}
function isValidFirstname(firstnameVal){
    console.log("firsname: "+firstnameVal);
    const regex = /^[a-zA-Z]+$/;
    firstnameVal.trim();
    if(firstnameVal.length==0) updateTextError(firstnameAlert,"First Name is required",true);
    else if((/\s/.test(firstnameVal))) updateTextError(firstnameAlert,"Invalid First name. Spaces are not allowed",true);
    else if(!(regex.test(firstnameVal))) updateTextError(firstnameAlert,"First Name should be contains only characters");
    else{
        firstname.style.border = "0px solid red";
        updateTextError(firstnameAlert,"",false);
        return true;
    }
    firstname.style.border = "1px solid red";
    return false;
}
function isValidLastname(lastnameVal){
    console.log("lastname: "+lastnameVal);
    const regex = /^[a-zA-Z]+$/;
    lastnameVal.trim();
    if(lastnameVal.length==0) updateTextError(lastnameAlert,"Last Name is required",true);
    else if((/\s/.test(lastnameVal))) updateTextError(lastnameAlert,"Invalid Last name. Spaces are not allowed",true);
    else if(!(regex.test(lastnameVal))) updateTextError(lastnameAlert,"First Name should be contains only characters");
    else{
        lastname.style.border = "0px solid red";
        updateTextError(lastnameAlert,"",false);
        return true;
    }
    lastname.style.border = "1px solid red";
    return false;
}
function isValidTel(telVal){
    console.log("tel: "+telVal);
    telVal = telVal.trim();
    if(telVal.length==0) updateTextError(telAlert,"Phone number is required",true);
    else if((/\s/.test(telVal))) updateTextError(telAlert,"Invalid Phone number. Spaces are not allowed",true);
    else if (!(/^\d+$/.test(telVal))) updateTextError(telAlert,"Please enter digits",true);
    else if(telVal.length!==10) updateTextError(telAlert,"Please enter 10 digit number",true);
    else{
        tel.style.border = "0px solid red";
        updateTextError(telAlert,"",false);
        return true;
    }
    tel.style.border = "1px solid red";
    return false;
}

function isValidTelalter(telalterVal){
    console.log("telalter: "+telalterVal);
    telalterVal = telalterVal.trim();
    if(telalterVal.length==0) return true;
    else if((/\s/.test(telalterVal))) updateTextError(telalterAlert,"Invalid Phone number. Spaces are not allowed",true);
    else if (!(/^\d+$/.test(telalterVal))) updateTextError(telalterAlert,"Please enter digits",true);
    else if(telalterVal.length!==10) updateTextError(telalterAlert,"Please enter 10 digit number",true);
    else{
        telalter.style.border = "0px solid red";
        updateTextError(telalterAlert,"",false);
        return true;
    }
    telalter.style.border = "1px solid red";
    return false;
}

function isValidPass(passVal){
    
    if(passVal.length==0){
        updateTextError(passwordAlert,"Password is required",true);
        password.style.border = "1px solid red";
        return false;
    } 
    else if(passVal.length<8){
        updateTextError(passwordAlert,"Password must be at least 8 characters long  ",true);
        password.style.border = "1px solid red";
        return false;
    }
    else if((/\s/.test(passVal))) {
        updateTextError(passwordAlert,"Invalid Password. Spaces are not allowed",true);
        password.style.border = "1px solid red";
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
        updateTextError(passwordAlert,"Password must include at least one lowercase letter, one uppercase letter, one number, and one symbol",true);
        password.style.border = "1px solid red";
        return false;
    }
    else{
        updateTextError(passwordAlert,"",false);
        password.style.border = "0px solid red";
        return true;
    }
}
function isValidCpass(passVal,cpassVal){
    cpassVal = cpassVal.trim();
    passVal = passVal.trim();

    if(cpassVal.length === 0) updateTextError(cpasswordAlert,"Confirm password is required",true);
    else if(cpassVal!==passVal) updateTextError(cpasswordAlert,"Password didn't match",true);
    else{
        cpassword.style.border = "0px solid red";
        updateTextError(cpasswordAlert,"",false);
        return true;
    }
    cpassword.style.border = "1px solid red";
    return false;
}
function isValidGender(genderVal){
    genderVal = genderVal.trim();
    if(genderVal.length === 0) updateTextError(genderAlert,"Please select one option",true);
    else{
        updateTextError(genderAlert,"",false);
        return true;
    }
    return false;
}
function isValidDob(dobVal){
    dobVal = dobVal.trim();
    if(dobVal.length === 0) 
        updateTextError(dobAlert, "Date field is required", true);
    else{
        dob.style.border = "0px solid red";
        updateTextError(dobAlert, "Please select a valid year (1950 - 2020)", true);
        return true;
    }
    dob.style.border = "1px solid red";
    return false;
}


function isValidRole(){
    if(admin.checked || admin.indeterminate || user.checked || user.indeterminate){
        // dob.style.border = "0px solid red";
        updateTextError(rolAlert, "", false);
        return true;
    }
    else updateTextError(rolAlert, "Role field is required", true);
    return false;
}

function isValidAddress(addressVal){
    addressVal = addressVal.trim();
    if(addressVal.length===0) updateTextError(addressAlert, "Address field is required", true);
    else{
        updateTextError(addressAlert, "", false);
        return true;
    }
    return false;
}
function isValidSkills(skillsList){
    if(skillsList.length===0) updateTextError(skillsAlert, "Select minimum one skill", true);
    else {
        updateTextError(skillsAlert, "", false);
        return false;
    }
    return false;
}
function isValidLanguage(languageVal){
    // console.log(languageVal);
    if(languageVal.length===0) updateTextError(languageAlert, "Select laguage", true);
    else {
        updateTextError(languageAlert, "", false);
        return false;
    }
    return false;
}
//check box 
admin.addEventListener('click',function(){
    if(this.checked){
        disableUserRole();
        adminread.checked = true;
        adminwrite.checked = true;
        adminupdate.checked = true;
    }else{
        updateAllRole();
    }
})

user.addEventListener('click',function(){
    if(this.checked){
        disableAdminRole();
        userread.checked = true;
        userupdate.checked = true;
        userexecute.checked = true;
    }else{
        updateAllRole();
    }
})

adminread.addEventListener('click', updateAdminRole);
adminwrite.addEventListener('click', updateAdminRole);
adminupdate.addEventListener('click', updateAdminRole);

userread.addEventListener('click', updateUserRole);
userupdate.addEventListener('click', updateUserRole);
userexecute.addEventListener('click', updateUserRole);


function updateAdminRole(){
    if(adminread.checked && adminwrite.checked && adminupdate.checked){
        admin.indeterminate = false;
        admin.checked = true;
        disableUserRole();
    }
    else if(adminread.checked || adminwrite.checked || adminupdate.checked){
        admin.checked = false;
        admin.indeterminate = true;
        disableUserRole();
    }
    else{
        updateAllRole();
    }
    console.log("admin role");
}
function updateUserRole(){
    if(userread.checked && userupdate.checked && userexecute.checked){
        user.indeterminate = false;
        user.checked = true;
        disableAdminRole();
    }
    else if(userread.checked || userupdate.checked || userexecute.checked){
        user.checked = false;
        user.indeterminate = true;
        disableAdminRole();
    }
    else{
        updateAllRole();
    }
    console.log("user role");
}

function disableAdminRole(){
    admin.checked = false;
    admin.indeterminate = false;
    adminread.checked = false;
    adminwrite.checked = false;
    adminupdate.checked = false;
    // admin.disabled = true;
    // adminread.disabled = true;
    // adminwrite.disabled = true;
    // adminupdate.disabled = true;
    console.log("disable admin");
}
function disableUserRole(){
    user.indeterminate = false;
    user.checked = false;
    userread.checked = false;
    userupdate.checked = false;
    userexecute.checked = false;
    // user.disabled = true;
    // userread.disabled = true;
    // userexecute.disabled = true;
    // userupdate.disabled = true;
    console.log("disable user");
}
function updateAllRole(){
    // admin.disabled = false;
    // adminread.disabled = false;
    // adminwrite.disabled = false;
    // adminupdate.disabled = false;
    // user.disabled = false;
    // userread.disabled = false;
    // userexecute.disabled = false;
    // userupdate.disabled = false;
    user.checked = false;
    user.indeterminate = false;
    userread.checked = false;
    userupdate.checked = false;
    userexecute.checked = false;
    admin.checked = false;
    admin.indeterminate = false;
    adminread.checked = false;
    adminwrite.checked = false;
    adminupdate.checked = false;
}

//address


// const programmingSkills = ["JavaScript", "Python", "Java", "C++", "Ruby", "Swift", "TypeScript"];

// const skills = [];
const programmingSkills = [
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "HTML",
    "CSS",
    "React",
    "Angular",
    "Node.js",
    "Ruby",
    "PHP",
    "Swift",
    "TypeScript",
    "Go",
    "SQL",
    "Rust"
];

// const skillsList = [];

const userSkillsInput = document.getElementById("userSkills");
const skillsDropdown = document.getElementById("skillsDropdown");

userSkillsInput.addEventListener("input", showSkillsDropdown);

document.addEventListener("click", (event) => {
    if (!userSkillsInput.contains(event.target) && !skillsDropdown.contains(event.target)) {
        skillsDropdown.style.display = "none";
    }
});

function showSkillsDropdown() {
    const inputText = userSkillsInput.value.toLowerCase();
    const matchingSkills = programmingSkills.filter(skill =>
        skill.toLowerCase().includes(inputText) && !skillsList.includes(skill)
    );

    // Clear the previous options
    skillsDropdown.innerHTML = "";

    matchingSkills.forEach(skill => {
        const listItem = document.createElement("div");
        listItem.classList.add("autocomplete-item");
        listItem.textContent = skill;
        listItem.addEventListener("click", () => {
            // Add the selected skill to the skills array
            skillsList.push(skill);

            // Update the selected skills container
            updateSelectedSkillsContainer();

            // Reset the input and hide the dropdown
            userSkillsInput.value = "";
            skillsDropdown.style.display = "none";
        });

        skillsDropdown.appendChild(listItem);
    });

    // Set the width and position of the dropdown
    skillsDropdown.style.width = `${userSkillsInput.offsetWidth}px`;
    const inputRect = userSkillsInput.getBoundingClientRect();
    skillsDropdown.style.top = `${inputRect.bottom + window.scrollY}px`;
    skillsDropdown.style.left = `${inputRect.left + window.scrollX}px`;

    // Show or hide the dropdown based on the number of matching skills
    skillsDropdown.style.display = matchingSkills.length ? "block" : "none";
}

function updateSelectedSkillsContainer() {
    const selectedSkillsContainer = document.getElementById("selectedSkills");
    selectedSkillsContainer.innerHTML = "";

    skillsList.forEach(skill => {
        const selectedSkillItem = document.createElement("div");
        selectedSkillItem.classList.add("selected-skill-item");
        selectedSkillItem.textContent = skill;

        const closeButton = document.createElement("span");
        closeButton.classList.add("close-button");
        closeButton.innerHTML = "&times;";
        closeButton.addEventListener("click", () => {
            // Remove the skill from the skills array
            const index = skillsList.indexOf(skill);
            if (index !== -1) {
                skillsList.splice(index, 1);
            }

            // Update the selected skills container
            updateSelectedSkillsContainer();
        });

        selectedSkillItem.appendChild(closeButton);
        selectedSkillsContainer.appendChild(selectedSkillItem);
    });
}
