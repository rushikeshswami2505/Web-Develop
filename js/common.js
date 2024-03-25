// input id
let email = document.getElementById("email");
let firstname = document.getElementById("firstname");
let lastname = document.getElementById("lastname");
let tel = document.getElementById("tel");
let telalter = document.getElementById("telalter");
let gender = document.getElementsByName("gender");
let dob = document.getElementById("dob");
let address = document.getElementById("address");
let skills = document.getElementById("skillsAutocomplete");
let language = document.getElementById("language");

// alert id
let emailAlert = document.getElementById("emailalert");
let firstnameAlert = document.getElementById("firstnamealert");
let lastnameAlert = document.getElementById("lastnamealert");
let telAlert = document.getElementById("telalert");
let telalterAlert = document.getElementById("telalteralert");
let genderAlert = document.getElementById("genderalert");
let dobAlert = document.getElementById("dobalert");
let rolAlert = document.getElementById("rolealert");
let addressAlert = document.getElementById("addressalert");
let skillsAlert = document.getElementById("skillsalert");
let languageAlert = document.getElementById("languagealert");

// it shows the flag icon for phone number
var inputTel = document.querySelector("#tel");
var itiTel = window.intlTelInput(inputTel, {
    separateDialCode: true,
    hiddenInput: "full",
    utilsScript: "//cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.15/js/utils.js"
});
// it shows the flag icon for alternative phone number
var inputTelalter = document.querySelector("#telalter");
var itiTelalter = window.intlTelInput(inputTelalter, {
    separateDialCode: true,
    hiddenInput: "full",
    utilsScript: "//cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.15/js/utils.js"
});
itiTel.setCountry("IN");
itiTelalter.setCountry("IN");
// This is main fuction for changing error msg and updating input box
function updateTextError(element,msg,state){
    if(state){  
        element.style.display = 'block';
        element.innerText = msg; 
    }else{
        element.style.display = 'none';
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// All function for validations  ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
// it shows default toast message 
function updateTextError(element,msg,state){
    if(state){
        element.style.display = 'block';
        element.innerText = msg; 
    }else{
        element.style.display = 'none';
    }
}

// validation for email
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
    return false;
}

// validation for first name
function isValidFirstname(firstnameVal){
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

// validation for flast name
function isValidLastname(lastnameVal){
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

// validation for phone number
function isValidTel(telVal){

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

// validation for alternative phone number
function isValidTelalter(telalterVal){
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

// validation for password
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
    }

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

// validation for confirm password
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

// validation for date of birth
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

// validation for role
function isValidRole(){
    if(admin.checked || admin.indeterminate || user.checked || user.indeterminate){
        updateTextError(rolAlert, "", false);
        return true;
    }
    else updateTextError(rolAlert, "Role field is required", true);
    return false;
}

// validation for skills
function isValidSkills(skillsList){
    if(skillsList.length===0) updateTextError(skillsAlert, "Select minimum one skill", true);
    else {
        updateTextError(skillsAlert, "", false);
        return true;
    }
    return false;
}

// validation for language
function isValidLanguage(languageVal){
    if(languageVal.length===0) updateTextError(languageAlert, "Select laguage", true);
    else {
        updateTextError(languageAlert, "", false);
        return true;
    }
    return false;
}
