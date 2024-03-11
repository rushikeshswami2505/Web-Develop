var inputTel = document.querySelector("#tel");
var itiTel = window.intlTelInput(inputTel, {
    separateDialCode: true,
    hiddenInput: "full",
    utilsScript: "//cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.15/js/utils.js"
});

var inputTelalter = document.querySelector("#telalter");
var itiTelalter = window.intlTelInput(inputTelalter, {
    separateDialCode: true,
    hiddenInput: "full",
    utilsScript: "//cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.15/js/utils.js"
});
itiTel.setCountry("IN");
itiTelalter.setCountry("IN");
// You can repeat the above steps for the second phone input if needed


// input
let email = document.getElementById("email");
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
    
// console.log(selectedCountryDataTel.dialCode);    

const skillsList = [];
//ALL FUNCTIONS 
function login() {
    console.log("ok");
    window.location.href = "login.html";
}

function signupValidity(event) {
    event.preventDefault();
    
    let emailVal =  email.value;
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

    let selectedCountryDataTel = itiTel.getSelectedCountryData().dialCode;
    let selectedCountryDataTelalter = itiTelalter.getSelectedCountryData().dialCode;
    
    
    

    gender.forEach(radio =>  {
        if(radio.checked){
            genderVal = radio.value;
        }
    });

    // console.log("Selected Country Code for inputTel:",inputTel ,selectedCountryDataTel);
    // console.log("Selected Country Code for inputTelalter:",inputTelalter, selectedCountryDataTelalter);
    
    if(emailVal.length==0) updateTextError(emailAlert,"Please enter Email",true);
    else updateTextError(emailAlert,"",false);

    let valid = false;
    valid = isValidEmail(emailVal);
    console.log("after valid login 1 "+valid);
    valid = isValidFirstname(firstnameVal) && valid;
    console.log("after valid login 3 "+valid);
    valid = isValidLastname(lastnameVal) && valid;
    console.log("after valid login 4 "+valid);
    valid = isValidTel(telVal) && valid; 
    console.log("after valid login 5 "+valid);
    valid = isValidTelalter(telalterVal) && valid;
    console.log("after valid login 6 "+valid);
    valid = isValidPass(passVal) && valid;
    console.log("after valid login 7 "+valid);
    valid = isValidCpass(passVal,cpassVal) && valid;
    console.log("after valid login 8 "+valid);
    valid = isValidGender(genderVal) && valid;
    console.log("after valid login 9 "+valid);
    valid = isValidDob(dobVal) && valid;
    console.log("after valid login 10 "+valid);
    valid = isValidRole() && valid;
    console.log("after valid login 11 "+valid);
    valid = isValidAddress(addressVal) && valid;
    console.log("after valid login 12 "+valid);
    valid = isValidSkills(skillsList) && valid;
    console.log("after valid login 13 "+valid);
    valid = isValidLanguage(languageVal) && valid;
    console.log("after valid login 14 "+valid);
    if(!valid){
        return;
    }
    console.log("after valid login 15 "+valid);

    
    const role = {};
    if(admin.checked || admin.indeterminate){
        let admin = [];
        if(adminread.checked) admin.push('read');
        if(adminwrite.checked) admin.push('write');
        if(adminupdate.checked) admin.push('update');
        role["admin"] = admin;
    }else{
        let user = [];
        if(userread.checked) user.push('read');
        if(userupdate.checked) user.push('update');
        if(userexecute.checked) user.push('execute');
        role["user"] = user;
    }
    console.log(role);
    const existingUsersDataString = localStorage.getItem("usersData");
    let usersdata = [];
    if (existingUsersDataString) {
        usersdata = JSON.parse(existingUsersDataString);
    }
    const user = {
        id : usersdata.length + 1,
        email : emailVal,
        firstname : firstnameVal,
        lastname : lastnameVal,
        phone : "+"+selectedCountryDataTel+""+telVal,
        phonealter : telalterVal.length>0 ? "+" +selectedCountryDataTelalter+""+telalterVal : "",
        password : passVal,
        gender : genderVal,
        dob : dobVal,
        address : addressVal,
        language : languageVal,
        roles : role,
        programmingSkills : skillsList
    };
    usersdata.push(user);
    localStorage.setItem("usersData", JSON.stringify(usersdata));
    console.log("before login");
    login();
    return true;
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

function isValidFirstname(firstnameVal){
    console.log("firsname: "+firstnameVal);
    const regex = /^[a-zA-Z]+$/;
    firstnameVal.trim();
    if(firstnameVal.length==0) updateTextError(firstnameAlert,"First Name is required",true);
    else if((/\s/.test(firstnameVal))) updateTextError(firstnameAlert,"Invalid First name. Spaces are not allowed",true);
    else if(!(regex.test(firstnameVal))) updateTextError(firstnameAlert,"First Name should be contains only characters",true);
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
    else if(!(regex.test(lastnameVal))) updateTextError(lastnameAlert,"First Name should be contains only characters",true);
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
function isValidDob(dobVal) {
    dobVal = dobVal.trim();
    const selectedDate = new Date(dobVal);
    const minDate = new Date("1950-01-01");
    const maxDate = new Date("2020-12-31");
    if (dobVal.length === 0) {
        updateTextError(dobAlert, "Date field is required", true);
        dob.style.border = "1px solid red";
        return false;
    }
    else if (selectedDate < minDate || selectedDate > maxDate) {
        updateTextError(dobAlert, "Please select a date between 1950 and 2020", true);
        dob.style.border = "1px solid red";
        return false;
    }
    dob.style.border = "0px solid red";
    updateTextError(dobAlert, "", false);
    return true;
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
    // addressVal = addressVal.trim();
    // if(addressVal.length===0) updateTextError(addressAlert, "Address field is required", true);
    // else{
        updateTextError(addressAlert, "", false);
        return true;
    // }
    // return false;
}
function isValidSkills(skillsList){
    if(skillsList.length===0) updateTextError(skillsAlert, "Select minimum one skill", true);
    else {
        updateTextError(skillsAlert, "", false);
        return true;
    }
    return false;
}
function isValidLanguage(languageVal){
    // console.log(languageVal);
    if(languageVal.length===0) updateTextError(languageAlert, "Select laguage", true);
    else {
        updateTextError(languageAlert, "", false);
        return true;
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
    console.log("disable admin");
}
function disableUserRole(){
    user.indeterminate = false;
    user.checked = false;
    userread.checked = false;
    userupdate.checked = false;
    userexecute.checked = false;
    console.log("disable user");
}
function updateAllRole(){
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

autocomplete(document.getElementById("userSkills"), programmingSkills, "selectedSkillsContainer");

function autocomplete(inp, arr, containerId) {
    var currentFocus;

    
    console.log(arr,inp);
    
    inp.addEventListener("input", function(e) {
        var val = this.value;
        closeAllLists();

        if (!val) {
            return false;
        }

        currentFocus = -1;
        var a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);

        for (var i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                var b = document.createElement("DIV");
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";

                b.addEventListener("click", function(e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();

                    // Add the selected skill to the skillList array
                    const selectedSkillValue = this.getElementsByTagName("input")[0].value;
                    if (!skillsList.includes(selectedSkillValue)) {
                        skillsList.push(selectedSkillValue);
                    }

                    // Clear the input box after selecting an item
                    inp.value = "";

                    // Add the selected skill to the container:
                    const selectedSkillsContainer = document.getElementById(containerId);
                    const selectedSkillItem = document.createElement("div");
                    selectedSkillItem.classList.add("selected-skill-item");
                    selectedSkillItem.textContent = selectedSkillValue;

                    const closeButton = document.createElement("span");
                    closeButton.classList.add("close-button");
                    closeButton.innerHTML = "&times;";
                    closeButton.addEventListener("click", function() {
                        selectedSkillsContainer.removeChild(selectedSkillItem);
                        // Remove the skill from the skillList array
                        const index = skillsList.indexOf(selectedSkillValue);
                        if (index !== -1) {
                            skillsList.splice(index, 1);
                        }
                    });

                    selectedSkillItem.appendChild(closeButton);
                    selectedSkillsContainer.appendChild(selectedSkillItem);
                });

                a.appendChild(b);
            }
        }
    });

    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");

        if (e.keyCode == 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) {
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if ((elmnt != x[i] && elmnt != inp) || x[i].children.length === 0) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    document.addEventListener("click", function(e) {
        closeAllLists(e.target);
    });

    selectedSkills = [];
    function initializeSelectedSkills() {
        const selectedSkillsContainer = document.getElementById(containerId);

        for (const skill of selectedSkills) {
            const selectedSkillItem = document.createElement("div");
            selectedSkillItem.classList.add("selected-skill-item");
            selectedSkillItem.textContent = skill;

            const closeButton = document.createElement("span");
            closeButton.classList.add("close-button");
            closeButton.innerHTML = "&times;";
            closeButton.addEventListener("click", function() {
                selectedSkillsContainer.removeChild(selectedSkillItem);
                // Remove the skill from the skillList array
                const index = skillsList.indexOf(skill);
                if (index !== -1) {
                    skillsList.splice(index, 1);
                }
            });

            selectedSkillItem.appendChild(closeButton);
            selectedSkillsContainer.appendChild(selectedSkillItem);
        }
    }

    initializeSelectedSkills();
}

$('body').click(function(){
    console.log("Clicked anywhere");
    let emailVal =  email.value;
    
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

    // let selectedCountryDataTel = itiTel.getSelectedCountryData().dialCode;
    // let selectedCountryDataTelalter = itiTelalter.getSelectedCountryData().dialCode;
    gender.forEach(radio =>  {
        if(radio.checked){
            genderVal = radio.value;
        }
    });
    
    let valid = false;
    if(emailVal.length!==0) valid = isValidEmail(emailVal);
    else {
        updateTextError(emailAlert, "", false);
        email.style.border = "0px solid red";
    }

    if(firstnameVal.length!==0) valid = isValidFirstname(firstnameVal) && valid;
    else {
        updateTextError(firstnameAlert, "", false);
        firstname.style.border = "0px solid red";
    }
    if(lastnameVal.length!==0) valid = isValidLastname(lastnameVal) && valid;
    else {
        updateTextError(lastnameAlert, "", false);
        lastname.style.border = "0px solid red";
    }

    if(telVal.length!==0) valid = isValidTel(telVal) && valid; 
    else {
        updateTextError(telAlert, "", false);
        tel.style.border = "0px solid red";
    }

    if(telalterVal.length!==0) valid = isValidTelalter(telalterVal) && valid;
    else {
        updateTextError(telalterAlert, "", false);
        telalter.style.border = "0px solid red";
    }

    if(passVal.length!==0) valid = isValidPass(passVal) && valid;
    else {
        updateTextError(passwordAlert, "", false);
        password.style.border = "0px solid red";
    }

    if(cpassVal.length!==0) valid = isValidCpass(passVal,cpassVal) && valid;
    else {
        updateTextError(cpasswordAlert, "", false);
        cpassword.style.border = "0px solid red";
    }
});

// Example usage

// const skillsList = [];

// const userSkillsInput = document.getElementById("userSkills");
// const skillsDropdown = document.getElementById("skillsDropdown");

//     userSkillsInput.addEventListener("input", showSkillsDropdown);

//     document.addEventListener("click", (event) => {
//         if (!userSkillsInput.contains(event.target) && !skillsDropdown.contains(event.target)) {
//             skillsDropdown.style.display = "none";
//         }
//     });

//     function showSkillsDropdown() {
//         const inputText = userSkillsInput.value.toLowerCase();
//         const matchingSkills = programmingSkills.filter(skill =>
//             skill.toLowerCase().includes(inputText) && !skillsList.includes(skill)
//         );

//         skillsDropdown.innerHTML = "";

//         matchingSkills.forEach(skill => {
//             const listItem = document.createElement("div");
//             // listItem.classList.add(".card-item select option");
//             // listItem.classList.add(".card-item select option:hover");
//             listItem.style.paddingLeft = '0.35rem';
//             listItem.style.paddingBottom = '0.1rem';
//             listItem.style.fontWeight = '530';
//             listItem.style.fontFamily = "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif";
//             // listItem.classList.add("autocomplete-item");

//     // listItem.style.fontFamily = 'var(--font-family-regular)';
//     // listItem.style.padding = '8px';

//             // listItem.classList.add("autocomplete-item");
//             listItem.textContent = skill;
//             listItem.addEventListener("click", () => {
//                 skillsList.push(skill);

//                 updateSelectedSkillsContainer();
//                 userSkillsInput.value = "";
//                 skillsDropdown.style.display = "none";
//             });
//             skillsDropdown.appendChild(listItem);
//         });
//         skillsDropdown.style.width = `${userSkillsInput.offsetWidth}px`;
//         const inputRect = userSkillsInput.getBoundingClientRect();
//         skillsDropdown.style.top = `${inputRect.bottom + window.scrollY}px`;
//         skillsDropdown.style.left = `${inputRect.left + window.scrollX}px`;

//         skillsDropdown.style.display = matchingSkills.length ? "block" : "none";
//     }

//     function updateSelectedSkillsContainer() {
//         const selectedSkillsContainer = document.getElementById("selectedSkills");
//         selectedSkillsContainer.innerHTML = "";

//         skillsList.forEach(skill => {
//             const selectedSkillItem = document.createElement("div");
//             selectedSkillItem.classList.add("selected-skill-item");
//             selectedSkillItem.textContent = skill;

//             const closeButton = document.createElement("span");
//             closeButton.classList.add("close-button");
//             closeButton.innerHTML = "&times;";
//             closeButton.addEventListener("click", () => {
//                 const index = skillsList.indexOf(skill);
//                 if (index !== -1) {
//                     skillsList.splice(index, 1);
//                 }

//                 updateSelectedSkillsContainer();
//             });;
//             selectedSkillItem.appendChild(closeButton);
//             selectedSkillsContainer.appendChild(selectedSkillItem);
//         });
//     }

