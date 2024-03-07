if(localStorage.getItem("currentuser")===null){
    logout()
}
var inputTel = document.querySelector("#phone");
    var itiTel = window.intlTelInput(inputTel, {
        separateDialCode: true,
        hiddenInput: "full",
        utilsScript: "//cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.15/js/utils.js"
    });


// itiTel.setCountry('IN');

var inputTelalter = document.querySelector("#phonealter");
var itiTelalter = window.intlTelInput(inputTelalter, {
    separateDialCode: true,
    hiddenInput: "full",
    utilsScript: "//cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.15/js/utils.js"
});

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
let skills = document.getElementById("userSkills");
let address = document.getElementById("address");

let admin = document.getElementById("admin");
let readcheck = document.getElementById("readcheck");
let writecheck = document.getElementById("writecheck");
let updatecheck = document.getElementById("updatecheck");
let read = document.getElementById("read");
let write = document.getElementById("write");
let update = document.getElementById("update");

//alert
let emailAlert = document.getElementById("emailalert");
let usernameAlert = document.getElementById("usernamealert");
let firstnameAlert = document.getElementById("firstnamealert");
let lastnameAlert = document.getElementById("lastnamealert");
let phoneAlert = document.getElementById("phonealert");
let phonealertAlert = document.getElementById("phonealteralert");
let dobAlert = document.getElementById("dobalert");
let rolAlert = document.getElementById("rolealert");
let addressAlert = document.getElementById("addressalert");
let skillsAlert = document.getElementById("skillsalert");


const originalBorderStyle = email.style.border;


//local changes
let userindex = localStorage.getItem("currentuser");
let usersData = JSON.parse(localStorage.getItem("usersData"));
let currentuser = usersData[userindex];
let phoneNumber,phoneCountryCode,phoneNumberAlter,phonealterCountryCode,index1,index2,roles;
setViewData();
setEditData();

function setViewData(){
    usersData = JSON.parse(localStorage.getItem("usersData"));
    currentuser = usersData[userindex];
    
    phoneNumber = currentuser.phone;
    index1 = 0;
    if(phoneNumber.length===14) index1=4;
    else if(phoneNumber.length===13) index1=3;
    else if(phoneNumber.length===12) index1=2;
    phoneCountryCode = getCountryCodeFromDialCode(phoneNumber.substring(0,index1)+"");
    itiTel.setCountry(phoneCountryCode);
    console.log(itiTel);
    phoneNumberAlter = currentuser.phonealter;
    index2 = 0;
    if(phoneNumberAlter.length===14) index2=4;
    else if(phoneNumberAlter.length===13) index2=3;
    else if(phoneNumberAlter.length===12) index2=2;
    phonealterCountryCode = getCountryCodeFromDialCode(phoneNumberAlter.substring(0,index2)+"");

    viewemail.innerText = currentuser.email;
    viewusername.innerText = currentuser.username;
    viewfirstname.innerText = currentuser.firstname;
    viewlastname.innerText = currentuser.lastname;
    viewphone.innerText = ""+ phoneNumber.substring(0,index1) + " " + phoneNumber.substring(index1);
    if(phoneNumberAlter.length>10)
    viewphonealter.innerText =  ""+ phoneNumberAlter.substring(0,index2) + " " +  phoneNumberAlter.substring(index2);
    else
    viewphonealter.innerHTML = "<p style='font-weight: lighter;'>Yet not set</p>";
    viewdob.innerText = currentuser.dob;
    viewgender.innerText = currentuser.gender;
    viewaddress.innerText = currentuser.address;
    skillListStorage = currentuser.programmingSkills;
    skillFull = "";
    console.log(skillListStorage);
    skillListStorage.forEach((skill,index) => {
        skillFull = skillFull + "&#8226; " + skill +" ";
    });
    viewskills.innerHTML = skillFull;
    
    roles = currentuser.programmingSkills;
    if(roles.admin){
        console.log("admin",roles.admin);
        document.getElementById("role").innerText = "Admin Roles";
        read.innerText = 'Read';
        write.innerText = 'Write';
        update.innerText = 'Update';
    
        viewread.innerHTML = "&#8226; Read";
        viewwrite.innerHTML = "&#8226; Write";
        viewupdate.innerHTML = "&#8226; Update";
        
        viewrole.innerText = "Admin Roles";
        if(roles.admin.includes('read')){
            readcheck.checked = true;
            viewread.style.display = 'block';
        }
        else{
            readcheck.checked = false;
            viewread.style.display = 'none';
        }
        if(roles.admin.includes('write')){
            writecheck.checked = true;
            viewwrite.style.display = 'block';
        }
        else {
            writecheck.checked = false;
            viewwrite.style.display = 'none';
        }
        if(roles.admin.includes('update')){
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
    }
    console.log("geteee");
}
//edit local change
function setEditData(){
    email.value = currentuser.email;
    username.value = currentuser.username;
    firstname.value = currentuser.firstname;
    lastname.value = currentuser.lastname;
    phone.value = phoneNumber.substring(index1);
    console.log(phoneNumberAlter);
    if(phonealter.length>10)
    phonealter.value = phoneNumberAlter.substring(index2);
    console.log(phoneNumberAlter.substring(index2));
    language.value = currentuser.language;
    dob.value = currentuser.dob;
    document.getElementById(currentuser.gender.toLowerCase()).checked = true;
    address.value = currentuser.address;
    roles = currentuser.programmingSkills;
    console.log(currentuser);
    console.log(currentuser.roles);
}
// console.log("Roles: "+roles['admin']);

// console.log("Roles: "+roles['user']);

// console.log(roles.user);
function closeModal() {
    if ($("#editProfileModal").hasClass("show")) {
        $("body").removeClass("modal-open");
        $(".modal-backdrop").remove();
        $("#editProfileModal").modal("hide");
    }
}

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
    let valid  = false;
    valid = isValidEmail(emailVal);
    valid = isValidUsername(usernameVal) && valid;
    valid = isValidFirstname(firstnameVal) && valid;
    valid = isValidLastname(lastnameVal) && valid;
    valid = isValidTel(telVal) && valid;
    valid = isValidTelalter(telalterVal) && valid;
    valid = isValidDob(dobVal) && valid;
    valid = isValidSkills(skillList) && valid;
    valid = isValidAddress(addressVal) && valid;
    console.log(skillList+" "+valid);
    if(!valid){
        return;
    }
    if(roles.admin){
        const role = {};
        let admin = [];
        if(readcheck.checked) admin.push('read');
        if(writecheck.checked) admin.push('write');
        if(updatecheck.checked) admin.push('update');
        role["admin"] = admin;
        usersData[userindex].roles = role;
        // console.log("inside admin"+role);
        // return;
    }
    // else{
    //     let user = [];
    //     if(userread.checked) user.push('read');
    //     if(userupdate.checked) user.push('update');
    //     if(userexecute.checked) user.push('execute');
    //     role["user"] = user;
    // }

    usersData[userindex].email = emailVal;
    usersData[userindex].username = usernameVal;
    usersData[userindex].firstname = firstnameVal;
    usersData[userindex].lastname = lastnameVal;
    currentuser.phone = "+"+itiTel.getSelectedCountryData().dialCode+""+ telVal;
    currentuser.phonealter = "+"+itiTel.getSelectedCountryData().dialCode+""+telalterVal;
    usersData[userindex].dob = dobVal;
    usersData[userindex].gender = genderVal;
    usersData[userindex].address = addressVal;
    usersData[userindex].language = languageVal;
    usersData[userindex].programmingSkills = skillList;
    localStorage.setItem("usersData", JSON.stringify(usersData));
    console.log(9);
    $(".closebtn").click();
    setViewData();          
    // closeModal();
}

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

    console.log(email);
    if (emailVal.length === 0) {
        updateTextError(emailAlert, "Email is required", true);
    } else if (!emailRegex.test(emailVal)) {
        updateTextError(emailAlert, "Invalid email format", true);
    } else {
        email.style.border = originalBorderStyle;
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
        username.style.border = originalBorderStyle;
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
    else if(!(regex.test(firstnameVal))) updateTextError(firstnameAlert,"First Name should be contains only characters",true);
    else{
        firstname.style.border = originalBorderStyle;
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
    else if(!(regex.test(lastnameVal))) updateTextError(lastnameAlert,"First Name should be contains only alphabates",true);
    else{
        lastname.style.border = originalBorderStyle;
        updateTextError(lastnameAlert,"",false);
        return true;
    }
    lastname.style.border = "1px solid red";
    return false;
}
function isValidTel(telVal){
    // console.log("tel: "+telVal);
    console.log(phoneAlert);
    telVal = telVal.trim();
    if(telVal.length==0) updateTextError(phoneAlert,"Phone number is required",true);
    else if((/\s/.test(telVal))) updateTextError(phoneAlert,"Invalid Phone number. Spaces are not allowed",true);
    else if (!(/^\d+$/.test(telVal))) updateTextError(phoneAlert,"Please enter digits",true);
    else if(telVal.length!==10) updateTextError(phoneAlert,"Please enter 10 digit number",true);
    else{
        phone.style.border = originalBorderStyle;
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
        phonealter.style.border = originalBorderStyle;
        updateTextError(phonealterAlert,"",false);
        return true;
    }
    phonealter.style.border = "1px solid red";
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
    dob.style.border = originalBorderStyle;
    
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
    addressVal = addressVal.trim();
    if(addressVal.length===0) updateTextError(addressAlert, "Address field is required", true);
    else{
        address.style.border =  originalBorderStyle
        updateTextError(addressAlert, "", false);
        return true;
    }
    address.style.border = "1px solid red";
    return false;
}
function isValidSkills(skillsList){
    if(skillsList.length===0) updateTextError(skillsAlert, "Select minimum one skill", true);
    else {
        skills.style.border =  originalBorderStyle
        updateTextError(skillsAlert, "", false);
        return true;
    }
    skills.style.border = "1px solid red";
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

const selectedSkillsContainer = document.getElementById("selectedSkillsContainer");

// Add pre-filled skills to the container
// skillListStorage.forEach(skill => {
//     const selectedSkillItem = document.createElement("div");
//     selectedSkillItem.classList.add("selected-skill-item");
//     selectedSkillItem.textContent = skill;

//     const closeButton = document.createElement("span");
//     closeButton.classList.add("close-button");
//     closeButton.innerHTML = "&times;";
//     closeButton.addEventListener("click", function() {
//         selectedSkillsContainer.removeChild(selectedSkillItem);
//     });

//     selectedSkillItem.appendChild(closeButton);
//     selectedSkillsContainer.appendChild(selectedSkillItem);
// });
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
 // Initialize skillList with the selected skills

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
function logout() {
  // Remove current user data from localStorage
  localStorage.removeItem("currentuser");

  // Replace the current page's URL with the new one
  window.history.pushState(null, null, "login.html");

  // Redirect the user to the new page
  window.location.href = "login.html";
}

function getCountryCodeFromDialCode(dialCode) {
    var codeMapping = {
        '+1': 'US',
        '+7': 'RU',
        '+20': 'EG',
        '+27': 'ZA',
        '+30': 'GR',
        '+31': 'NL',
        '+32': 'BE',
        '+33': 'FR',
        '+34': 'ES',
        '+36': 'HU',
        '+39': 'IT',
        '+40': 'RO',
        '+41': 'CH',
        '+43': 'AT',
        '+44': 'GB',
        '+45': 'DK',
        '+46': 'SE',
        '+47': 'NO',
        '+48': 'PL',
        '+49': 'DE',
        '+51': 'PE',
        '+52': 'MX',
        '+53': 'CU',
        '+54': 'AR',
        '+55': 'BR',
        '+56': 'CL',
        '+57': 'CO',
        '+58': 'VE',
        '+60': 'MY',
        '+61': 'AU',
        '+62': 'ID',
        '+63': 'PH',
        '+64': 'NZ',
        '+65': 'SG',
        '+66': 'TH',
        '+81': 'JP',
        '+82': 'KR',
        '+84': 'VN',
        '+86': 'CN',
        '+90': 'TR',
        '+91': 'IN',
        '+92': 'PK',
        '+93': 'AF',
        '+94': 'LK',
        '+95': 'MM',
        '+98': 'IR',
        '+211': 'SS',
        '+212': 'MA',
        '+213': 'DZ',
        '+216': 'TN',
        '+218': 'LY',
        '+220': 'GM',
        '+221': 'SN',
        '+222': 'MR',
        '+223': 'ML',
        '+224': 'GN',
        '+225': 'CI',
        '+226': 'BF',
        '+227': 'NE',
        '+228': 'TG',
        '+229': 'BJ',
        '+230': 'MU',
        '+231': 'LR',
        '+232': 'SL',
        '+233': 'GH',
        '+234': 'NG',
        '+235': 'TD',
        '+236': 'CF',
        '+237': 'CM',
        '+238': 'CV',
        '+239': 'ST',
        '+240': 'GQ',
        '+241': 'GA',
        '+242': 'CG',
        '+243': 'CD',
        '+244': 'AO',
        '+245': 'GW',
        '+246': 'IO',
        '+248': 'SC',
        '+249': 'SD',
        '+250': 'RW',
        '+251': 'ET',
        '+252': 'SO',
        '+253': 'DJ',
        '+254': 'KE',
        '+255': 'TZ',
        '+256': 'UG',
        '+257': 'BI',
        '+258': 'MZ',
        '+260': 'ZM',
        '+261': 'MG',
        '+262': 'RE',
        '+263': 'ZW',
        '+264': 'NA',
        '+265': 'MW',
        '+266': 'LS',
        '+267': 'BW',
        '+268': 'SZ',
        '+269': 'KM',
        '+290': 'SH',
        '+291': 'ER',
        '+297': 'AW',
        '+298': 'FO',
        '+299': 'GL',
        '+350': 'GI',
        '+351': 'PT',
        '+352': 'LU',
        '+353': 'IE',
        '+354': 'IS',
        '+355': 'AL',
        '+356': 'MT',
        '+357': 'CY',
        '+358': 'FI',
        '+359': 'BG',
        '+370': 'LT',
        '+371': 'LV',
        '+372': 'EE',
        '+373': 'MD',
        '+374': 'AM',
        '+375': 'BY',
        '+376': 'AD',
        '+377': 'MC',
        '+378': 'SM',
        '+379': 'VA',
        '+380': 'UA',
        '+381': 'RS',
        '+382': 'ME',
        '+383': 'XK',
        '+385': 'HR',
        '+386': 'SI',
        '+387': 'BA',
        '+389': 'MK',
        '+420': 'CZ',
        '+421': 'SK',
        '+423': 'LI',
        '+500': 'FK',
        '+501': 'BZ',
        '+502': 'GT',
        '+503': 'SV',
        '+504': 'HN',
        '+505': 'NI',
        '+506': 'CR',
        '+507': 'PA',
        '+508': 'PM',
        '+509': 'HT',
        '+590': 'GP',
        '+591': 'BO',
        '+592': 'GY',
        '+593': 'EC',
        '+594': 'GF',
        '+595': 'PY',
        '+596': 'MQ',
        '+597': 'SR',
        '+598': 'UY',
        '+599': 'CW',
        '+670': 'TL',
        '+672': 'NF',
        '+673': 'BN',
        '+674': 'NR',
        '+675': 'PG',
        '+676': 'TO',
        '+677': 'SB',
        '+678': 'VU',
        '+679': 'FJ',
        '+680': 'PW',
        '+681': 'WF',
        '+682': 'CK',
        '+683': 'NU',
        '+685': 'WS',
        '+686': 'KI',
        '+687': 'NC',
        '+688': 'TV',
        '+689': 'PF',
        '+690': 'TK',
        '+691': 'FM',
        '+692': 'MH',
        '+850': 'KP',
        '+852': 'HK',
        '+853': 'MO',
        '+855': 'KH',
        '+856': 'LA',
        '+880': 'BD',
        '+886': 'TW',
        '+960': 'MV',
        '+961': 'LB',
        '+962': 'JO',
        '+963': 'SY',
        '+964': 'IQ',
        '+965': 'KW',
        '+966': 'SA',
        '+967': 'YE',
        '+968': 'OM',
        '+970': 'PS',
        '+971': 'AE',
        '+972': 'IL',
        '+973': 'BH',
        '+974': 'QA',
        '+975': 'BT',
        '+976': 'MN',
        '+977': 'NP',
        '+992': 'TJ',
        '+993': 'TM',
        '+994': 'AZ',
        '+995': 'GE',
        '+996': 'KG',
        '+998': 'UZ',
        // Add more mappings as needed
    };

    return codeMapping[dialCode] || '';
}