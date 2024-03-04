//show box
let viewemail = document.getElementById("viewemail");
let viewusername = document.getElementById("viewusername");
let viewfirstname = document.getElementById("viewfirstname");
let viewlastname = document.getElementById("viewlastname");
let viewphone = document.getElementById("viewphone");
let viewphonealter = document.getElementById("viewphonealter");
let viewlanguage = document.getElementById("viewlanguage");
let viewdob = document.getElementById("viewdob");
let viewgender = document.getElementById("viewgender");
let viewskills = document.getElementById("viewskills");
let viewroles = document.getElementById("viewroles");
let viewaddress = document.getElementById("viewaddress");

let viewrole = document.getElementById("role");
let viewread = document.getElementById("viewread");
let viewwrite = document.getElementById("viewwrite");
let viewupdate = document.getElementById("viewupdate");

//edit box
let email = document.getElementById("email");
let username = document.getElementById("username");
let firstname = document.getElementById("firstname");
let lastname = document.getElementById("lastname");
let phone = document.getElementById("phone");
let phonealter = document.getElementById("phonealter");
let language = document.getElementById("language");
let dob = document.getElementById("dob");
let skills = document.getElementById("skills");
let address = document.getElementById("address");

let admin = document.getElementById("admin");
let readcheck = document.getElementById("readcheck");
let writecheck = document.getElementById("writecheck");
let updatecheck = document.getElementById("updatecheck");
let read = document.getElementById("read");
let write = document.getElementById("write");
let update = document.getElementById("update");

//


//local changes
let userindex = localStorage.getItem("currentuser");
let usersData = JSON.parse(localStorage.getItem("usersData"));
let currentuser = usersData[userindex];

viewemail.innerText = currentuser.email;
viewusername.innerText = currentuser.username;
viewfirstname.innerText = currentuser.firstname;
viewlastname.innerText = currentuser.lastname;
viewphone.innerText = currentuser.phone;
if(currentuser.phonealter) viewphonealter.innerText = currentuser.phonealter;
else viewphonealter.innerHTML = "<p style=''>Yet not set</p>";
// viewlanguage.innerText = currentuser.language;
viewdob.innerText = currentuser.dob;
viewgender.innerText = currentuser.gender;
viewaddress.innerText = currentuser.address;
let skillList = currentuser.programmingSkills;
let skillFull = "   ";
console.log(skillList);
skillList.forEach((skill,index) => {
    skillFull = skillFull + "&#8226; " + skill +" ";
});
viewskills.innerHTML = skillFull;

//edit local change
email.value = currentuser.email;
username.value = currentuser.username;
firstname.value = currentuser.firstname;
lastname.value = currentuser.lastname;
phone.value = currentuser.phone;
phonealter.value = currentuser.phonealter;
language.value = currentuser.language;
dob.value = currentuser.dob;
document.getElementById(currentuser.gender.toLowerCase()).checked = true;
address.value = currentuser.address;
// skills.value = currentuser.skills;
roles = currentuser.roles;
console.log(roles);
if(roles.admin){
    console.log("admin",roles.admin);
    // admin.innerText = 'Admin';
    document.getElementById("role").innerText = "Admin Roles";
    read.innerText = 'Read';
    write.innerText = 'Write';
    update.innerText = 'Update';

    viewread.innerHTML = "&#8226; Read";
    viewwrite.innerHTML = "&#8226; Write";
    viewupdate.innerHTML = "&#8226; Update";
    
    viewrole.innerText = "Admin Roles";
    if(roles.read){
        readcheck.checked = true;
        viewread.style.display = 'block';
    }
    else{
        readcheck.checked = false;
        viewread.style.display = 'none';
    }
    if(roles.write){
        writecheck.checked = true;
        viewwrite.style.display = 'block';
    }
    else {
        writecheck.checked = false;
        viewwrite.style.display = 'none';
    }
    if(roles.update){
        updatecheck.checked = true;
        viewupdate.style.display = 'block';
    }
    else{
        updatecheck.checked = false;
        viewupdate.style.display = 'none';
    }
}
if(roles.user){
    console.log("user",roles.user);
    // admin.innerText = 'Admin';
    let roleedit = document.getElementById("role-edit");
    read.innerText = 'Read';
    write.innerText = 'Update';
    update.innerText = 'Execute';
    readcheck.disabled = true;
    writecheck.disabled = true;
    updatecheck.disabled = true;

    viewread.innerHTML = "&#8226; Read";
    viewwrite.innerHTML = "&#8226; Update";
    viewupdate.innerHTML = "&#8226; Execute";
    
    viewrole.innerText = "User Roles";
    if(roles.user.includes('read')){
        readcheck.checked = true;
        viewread.style.display = 'block';
    }
    else{
        readcheck.checked = false;
        viewwrite.style.display = 'none';
    }
    if(roles.user.includes('update')){
        writecheck.checked = true;
        viewwrite.style.display = 'block';
    }
    else {
        // writecheck.checked = false;
        viewwrite.style.display = 'none';
    }
    if(roles.user.includes('execute')){
        updatecheck.checked = true;
        viewupdate.style.display = 'block';
    }
    else{
        update.checked = false;
        viewupdate.style.display = 'none';
    }
    // roleedit.style.display = 'none';
}
// console.log(roles.user);

function updateUser(event){
    event.preventDefault();
    
    let emailVal =  email.value;
    let usernameVal = username.value;
    let firstnameVal = firstname.value;
    let lastnameVal = lastname.value;
    let telVal = phone.value;
    let telalterVal = phonealter.value;
    let dobVal = dob.value;
    let genderVal = 'Female';
    if(document.getElementById("male").checked){
        genderVal = 'Male';
    }
    let addressVal = address.value;
    let languageVal = language.options[language.selectedIndex].value;

    console.log(emailVal);
    console.log(usernameVal);
    console.log(firstnameVal);
    console.log(lastnameVal);
    console.log(telVal);
    console.log(telalterVal);
    console.log(dobVal);
    console.log(genderVal);
    console.log(addressVal);
    console.log(languageVal);
}

function updateTextError(element,msg,state){
    if(state){
        element.style.display = 'block';
        element.innerText = msg; 
    }else{
        element.style.display = 'none';
    }
}

function isValidEmail(emailVal,email,emailAlert) {
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
    if(telVal.length==0) updateTextError(phoneAlert,"Phone number is required",true);
    else if((/\s/.test(telVal))) updateTextError(phoneAlert,"Invalid Phone number. Spaces are not allowed",true);
    else if (!(/^\d+$/.test(telVal))) updateTextError(phoneAlert,"Please enter digits",true);
    else if(telVal.length!==10) updateTextError(phoneAlert,"Please enter 10 digit number",true);
    else{
        phone.style.border = "0px solid red";
        updateTextError(phoneAlert,"",false);
        return true;
    }
    phone.style.border = "1px solid red";
    return false;
}

function isValidTelalter(telalterVal){
    console.log("telalter: "+telalterVal);
    telalterVal = telalterVal.trim();
    if(telalterVal.length==0) return true;
    else if((/\s/.test(telalterVal))) updateTextError(phonealterAlert,"Invalid Phone number. Spaces are not allowed",true);
    else if (!(/^\d+$/.test(telalterVal))) updateTextError(phonealterAlert,"Please enter digits",true);
    else if(telalterVal.length!==10) updateTextError(phonealterAlert,"Please enter 10 digit number",true);
    else{
        phonealter.style.border = "0px solid red";
        updateTextError(phonealterAlert,"",false);
        return true;
    }
    phonealter.style.border = "1px solid red";
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

const selectedSkillsContainer = document.getElementById("selectedSkillsContainer");

// Add pre-filled skills to the container
skillList.forEach(skill => {
    const selectedSkillItem = document.createElement("div");
    selectedSkillItem.classList.add("selected-skill-item");
    selectedSkillItem.textContent = skill;

    const closeButton = document.createElement("span");
    closeButton.classList.add("close-button");
    closeButton.innerHTML = "&times;";
    closeButton.addEventListener("click", function() {
        selectedSkillsContainer.removeChild(selectedSkillItem);
    });

    selectedSkillItem.appendChild(closeButton);
    selectedSkillsContainer.appendChild(selectedSkillItem);
});



function showSection(sectionId) {
    var navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(function(item) {
        item.classList.remove('active-nav-item');
    });
    
    var clickedNavItem = document.querySelector('[onclick="showSection(\'' + sectionId + '\')"]');
    if (clickedNavItem) {
        clickedNavItem.parentElement.classList.add('active-nav-item');
    }
    var sections = document.querySelectorAll('.section');
    sections.forEach(function(section) {
        section.classList.remove('active');
    });
    var selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }
}

programmingSkills = [
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

                    // Clear the input box after selecting an item
                    inp.value = "";

                    // Add the selected skill to the container:
                    const selectedSkillsContainer = document.getElementById(containerId);
                    const selectedSkillItem = document.createElement("div");
                    selectedSkillItem.classList.add("selected-skill-item");
                    selectedSkillItem.textContent = this.getElementsByTagName("input")[0].value;

                    const closeButton = document.createElement("span");
                    closeButton.classList.add("close-button");
                    closeButton.innerHTML = "&times;";
                    closeButton.addEventListener("click", function() {
                        selectedSkillsContainer.removeChild(selectedSkillItem);
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
}
