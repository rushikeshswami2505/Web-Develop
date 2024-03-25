// signup input variables
let password = document.getElementById("password");
let cpassword = document.getElementById("cpassword");
let admin = document.getElementById("admin");
let user = document.getElementById("user");
let adminread = document.getElementById("adminread");
let adminwrite = document.getElementById("adminwrite");
let adminupdate = document.getElementById("adminupdate");
let userread = document.getElementById("userread");
let userupdate = document.getElementById("userupdate");
let userexecute = document.getElementById("userexecute");
// signup alert message
let passwordAlert = document.getElementById("passwordalert");
let cpasswordAlert = document.getElementById("cpasswordalert");
let toast = document.getElementById('toast');

const skillsList = [];

// go to login page from signup page
function login() {
    window.location.href = "login.html";
}

// signup validity when click on submit
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
    
    let valid = false;
    valid = isValidEmail(emailVal);
    valid = isValidFirstname(firstnameVal) && valid;
    valid = isValidLastname(lastnameVal) && valid;
    valid = isValidTel(telVal) && valid; 
    valid = isValidTelalter(telalterVal) && valid;
    valid = isValidPass(passVal) && valid;
    valid = isValidCpass(passVal,cpassVal) && valid;
    valid = isValidGender(genderVal) && valid;
    valid = isValidDob(dobVal) && valid;
    valid = isValidRole() && valid;
    valid = isValidSkills(skillsList) && valid;
    valid = isValidLanguage(languageVal) && valid;
    if(!valid){
        return;
    }    
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
    toast.classList.remove('hidden');
    toast.classList.remove('error');
    toast.classList.add('success'); 
    toast.textContent = "Created Successful!!!";
    setTimeout(() => {
        toast.classList.add('hidden');
        login();
        return true;
    }, 1000);
}
// setting for user role it make disable and all other for roles
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

// event listener for admin and user roles
adminread.addEventListener('click', updateAdminRole);
adminwrite.addEventListener('click', updateAdminRole);
adminupdate.addEventListener('click', updateAdminRole);
userread.addEventListener('click', updateUserRole);
userupdate.addEventListener('click', updateUserRole);
userexecute.addEventListener('click', updateUserRole);

// it check and uncheck for admin role
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
}

// it check and uncheck for user role
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
}

// disable all checks box for admin
function disableAdminRole(){
    admin.checked = false;
    admin.indeterminate = false;
    adminread.checked = false;
    adminwrite.checked = false;
    adminupdate.checked = false;
}
// disable all check box for user
function disableUserRole(){
    user.indeterminate = false;
    user.checked = false;
    userread.checked = false;
    userupdate.checked = false;
    userexecute.checked = false;
}

// make able to select new role for user 
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
// PROGRAMMING SKILLS SECTIONS

// list of programming skills avaliable
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

// calling for autocomplete
autocomplete(document.getElementById("userSkills"), programmingSkills, "selectedSkillsContainer");

// it shows the autocomplete lists
function autocomplete(inp, arr, containerId) {
    var currentFocus;

    
    
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

                    const selectedSkillValue = this.getElementsByTagName("input")[0].value;
                    if (!skillsList.includes(selectedSkillValue)) {
                        skillsList.push(selectedSkillValue);
                    }
                    inp.value = "";
                    const selectedSkillsContainer = document.getElementById(containerId);
                    const selectedSkillItem = document.createElement("div");
                    selectedSkillItem.classList.add("selected-skill-item");
                    selectedSkillItem.textContent = selectedSkillValue;

                    const closeButton = document.createElement("span");
                    closeButton.classList.add("close-button");
                    closeButton.innerHTML = "&times;";
                    closeButton.addEventListener("click", function() {
                        selectedSkillsContainer.removeChild(selectedSkillItem);
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

// if user click anywhere the check if he entered correct data for last input
$('body').click(function(){
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

    gender.forEach(radio =>  {
        if(radio.checked){
            genderVal = radio.value;
        }
    });
    
    let valid = false;
    updateTextError(rolAlert, "", false);
    updateTextError(dobAlert, "", false);
    dob.style.border = "0px solid red";
    updateTextError(genderAlert, "", false);
    updateTextError(skillsAlert,"",false);
    updateTextError(languageAlert,"",false);

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