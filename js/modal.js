// check it current user is avaliable or not
if(localStorage.getItem("currentuser")===null){
    logout()
}

// logout function
function logout() {
    localStorage.removeItem("currentuser");
    window.history.pushState(null, null, "login.html");
    window.location.href = "login.html";
}

//View data ids 
let viewemail = document.getElementById("viewemail");
let viewfirstname = document.getElementById("viewfirstname");
let viewlastname = document.getElementById("viewlastname");
let viewphone = document.getElementById("viewphone");
let viewphonealter = document.getElementById("viewphonealter");
let viewlanguage = document.getElementById("viewlanguage");
let viewdob = document.getElementById("viewdob");
let viewgender = document.getElementById("viewgender");
let viewskills = document.getElementById("viewskills");
let viewaddress = document.getElementById("viewaddress");
let viewroles = document.getElementById("viewroles");
let viewread = document.getElementById("viewread");
let viewwrite = document.getElementById("viewwrite");
let viewupdate = document.getElementById("viewupdate");

// input box style
const originalBorderStyle = email.style.border;


//local data and variables
let currentuser = JSON.parse(localStorage.getItem("currentuser"));
let phoneNumber,phoneCountryCode,phoneNumberAlter,phonealterCountryCode,index1,index2,roles;

// set data at view and edit position
setViewData();
setEditData();

// function for set data for view data in model
function setViewData(){
    usersData = JSON.parse(localStorage.getItem("usersData"));
    currentuser = JSON.parse(localStorage.getItem("currentuser"));
    
    phoneNumber = currentuser.phone;
    index1 = 0;
    if(phoneNumber.length===14) index1=4;
    else if(phoneNumber.length===13) index1=3;
    else if(phoneNumber.length===12) index1=2;
    
    phoneNumberAlter = currentuser.phonealter;
    index2 = 0;
    if(phoneNumberAlter.length===14) index2=4;
    else if(phoneNumberAlter.length===13) index2=3;
    else if(phoneNumberAlter.length===12) index2=2;

    viewlanguage.innerText = currentuser.language;
    viewemail.innerText = currentuser.email;
    viewfirstname.innerText = currentuser.firstname;
    viewlastname.innerText = currentuser.lastname;
    viewphone.innerText = ""+ phoneNumber.substring(0,index1) + " " + phoneNumber.substring(index1);
    if(phoneNumberAlter.length>10)
    viewphonealter.innerText =  ""+ phoneNumberAlter.substring(0,index2) + " " +  phoneNumberAlter.substring(index2);
    else viewphonealter.innerHTML = "<p style='font-weight: lighter;'>Yet not set</p>";
    viewdob.innerText = currentuser.dob;
    viewgender.innerText = currentuser.gender;
    if(currentuser.address.length!==0) viewaddress.innerText = currentuser.address;
    else viewaddress.innerText = "Yet not set"
    skillListStorage = currentuser.programmingSkills;
    skillFull = "";
    skillListStorage.forEach((skill,index) => {
        skillFull = skillFull + "&#8226; " + skill +" ";
    });
    viewskills.innerHTML = skillFull;
    roles = currentuser.roles;
    if(roles.admin){
        viewread.innerHTML = "&#8226; Read";
        viewwrite.innerHTML = "&#8226; Write";
        viewupdate.innerHTML = "&#8226; Update";
        viewroles.innerText = "Admin Roles";
        
        if(roles.admin.includes('read')) viewread.style.display = 'block';
        else viewread.style.display = 'none';
        
        if(roles.admin.includes('write')) viewwrite.style.display = 'block';
        else viewwrite.style.display = 'none';
        
        if(roles.admin.includes('update')) viewupdate.style.display = 'block';
        else viewupdate.style.display = 'none';
    }
    if(roles.user){
        viewread.innerHTML = "&#8226; Read";
        viewwrite.innerHTML = "&#8226; Update";
        viewupdate.innerHTML = "&#8226; Execute";
        viewroles.innerText = "User Roles";
        if(roles.user.includes('read')) viewread.style.display = 'block';
        else viewwrite.style.display = 'none';
        
        if(roles.user.includes('update')) viewwrite.style.display = 'block';
        
        else viewwrite.style.display = 'none';
        
        if(roles.user.includes('execute')) viewupdate.style.display = 'block';
        else viewupdate.style.display = 'none';
    }
}

// function for set data in view mode in model
function setEditData(){
    email.value = currentuser.email;
    firstname.value = currentuser.firstname;
    lastname.value = currentuser.lastname;
    
    phoneCountryCode = getCountryCodeFromDialCode(phoneNumber.substring(0,index1)+"");
    phonealterCountryCode = getCountryCodeFromDialCode(phoneNumberAlter.substring(0,index2)+"");
    
    
    tel.value = phoneNumber.substring(index1);
    itiTel.setCountry(phoneCountryCode);
    if(phoneNumberAlter.length>10)
    {
        itiTelalter.setCountry(phonealterCountryCode);
        telalter.value = phoneNumberAlter.substring(index2);
    }
    language.value = currentuser.language;
    dob.value = currentuser.dob;
    document.getElementById(currentuser.gender.toLowerCase()).checked = true;
    address.value = currentuser.address;
    roles = currentuser.programmingSkills;
}

// close edit model
function closeModal() {
    if ($("#editProfileModal").hasClass("show")) {
        $("body").removeClass("modal-open");
        $(".modal-backdrop").remove();
        $("#editProfileModal").modal("hide");
    }
}

// function update data after user click on save button
function updateUser(event){
    event.preventDefault();

    let emailVal =  email.value;
    let firstnameVal = firstname.value;
    let lastnameVal = lastname.value;
    let telVal = tel.value;
    let telalterVal = telalter.value;
    let dobVal = dob.value;
    let genderVal = 'Female';
    if(document.getElementById("male").checked){
        genderVal = 'Male';
    }
    let addressVal = address.value;
    let languageVal = language.options[language.selectedIndex].value;    
    let valid  = false;
    valid = isValidEmail(emailVal);
    valid = isValidFirstname(firstnameVal) && valid;
    valid = isValidLastname(lastnameVal) && valid;
    valid = isValidTel(telVal) && valid;
    valid = isValidTelalter(telalterVal) && valid;
    valid = isValidDob(dobVal) && valid;
    valid = isValidSkills(skillList) && valid;
    if(!valid){
        return;
    }
    currentuser.email = emailVal;
    currentuser.firstname = firstnameVal;
    currentuser.lastname = lastnameVal;
    currentuser.phone = "+"+itiTel.getSelectedCountryData().dialCode+""+ telVal;
    currentuser.phonealter = "+"+itiTel.getSelectedCountryData().dialCode+""+telalterVal;
    currentuser.dob = dobVal;
    currentuser.gender = genderVal;
    currentuser.address = addressVal;
    currentuser.language = languageVal;
    currentuser.programmingSkills = skillList;
    let usersData = JSON.parse(localStorage.getItem("usersData"));
    usersData[currentuser.id-1] = currentuser;
    localStorage.setItem("usersData", JSON.stringify(usersData));
    localStorage.setItem("currentuser",JSON.stringify(currentuser));
    
    $(".closebtn").click();
    setViewData();         

    toast.classList.remove('hidden');
    toast.classList.remove('error');
    toast.classList.add('success'); 
    toast.textContent = "Update Saved!!!";
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 1000);
    
}

$('body').click(function(){
    let emailVal =  email.value;
    let firstnameVal = firstname.value;
    let lastnameVal = lastname.value;
    let telVal = tel.value;
    let telalterVal = telalter.value;
    
    let valid = false;
    updateTextError(dobAlert, "", false);
    dob.style.border = "0px solid red";
    updateTextError(skillsAlert,"",false);

    if(emailVal.length!==0) valid = isValidEmail(emailVal);
    else {
        updateTextError(emailAlert, "", false);
        email.style.border = "0px solid red";
    }

    if(firstnameVal.length!==0) valid = isValidFirstname(firstnameVal)
    else {
        updateTextError(firstnameAlert, "", false);
        firstname.style.border = "0px solid red";
    }
    if(lastnameVal.length!==0) valid = isValidLastname(lastnameVal) 
    else {
        updateTextError(lastnameAlert, "", false);
        lastname.style.border = "0px solid red";
    }

    if(telVal.length!==0) valid = isValidTel(telVal)
    else {
        updateTextError(telAlter, "", false);
        tel.style.border = "0px solid red";
    }

    if(telalterVal.length!==0) valid = isValidTelalter(telalterVal)
    else {
        updateTextError(telalterAlert, "", false);
        telalter.style.border = "0px solid red";
    }
});
// it is for autocomplete skills
const selectedSkillsContainer = document.getElementById("selectedSkillsContainer");
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
var selectedSkills = currentuser.programmingSkills;
var skillList = selectedSkills.slice();
 // initialize skillList with the selected skills
autocomplete(document.getElementById("userSkills"), programmingSkills, "selectedSkillsContainer");

// function for aut complete for skills
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
                    if (!skillList.includes(selectedSkillValue)) {
                        skillList.push(selectedSkillValue);
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
                        const index = skillList.indexOf(selectedSkillValue);
                        if (index !== -1) {
                            skillList.splice(index, 1);
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
                const index = skillList.indexOf(skill);
                if (index !== -1) {
                    skillList.splice(index, 1);
                }
            });

            selectedSkillItem.appendChild(closeButton);
            selectedSkillsContainer.appendChild(selectedSkillItem);
        }
    }

    initializeSelectedSkills();
}