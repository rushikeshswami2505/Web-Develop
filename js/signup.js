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
    gender.forEach(radio =>  {
        if(radio.checked){
            genderVal = radio.value;
        }
    });


    if(emailVal.length==0) updateTextError(emailAlert,"Please enter Email",true);
    else updateTextError(emailAlert,"",false);

    let valid = false;
    valid =  isValidEmail(emailVal);
    valid = isValidUsername(usernameVal);
    valid = isValidFirstname(firstnameVal);
    valid = isValidLastname(lastnameVal);
    valid = isValidTel(telVal); 
    valid = isValidTelalter(telalterVal);
    valid = isValidPass(passVal);
    valid = isValidCpass(passVal,cpassVal);
    valid = isValidGender(genderVal);
    valid = isValidDob(dobVal);
    // console.log(email);
        // if (pass === repass) {
        //     const user = {
        //         userId : email,
        //         userName : name,
        //         userTelephone : tel,
        //         userPassword : pass
        //     };
        //     localStorage.setItem("user",JSON.stringify(user));
        //     window.location.href = "index.html";
        //     return true;
        // } else {
        //     validUppercase.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Password Doesn\'t Match';
        //     validUppercase.style.color = 'red';
        //     return false;
        // }

    return false;
}


function login() {
    console.log("ok");
    window.location.href = "index.html";
}

function updateTextError(element,msg,state){
    if(state){
        element.style.display = 'block';
        element.innerText = msg; 
        // elementInput.classList.add('invalid');
    }else{
        element.style.display = 'none';
        // elementInput.classList.remove('invalid');
    }
}

function isValidEmail(emailVal){
    console.log("uname: "+emailVal);
    emailVal.trim();
    if(emailVal.length==0) updateTextError(emailAlert,"Please enter username",true);
    else {
        email.style.border = "0px solid red";
        updateTextError(emailAlert,"",false);
        return true;
    }
    email.style.border = "1px solid red";
    return false;
}
function isValidUsername(usernameVal){
    console.log("uname: "+usernameVal);
    usernameVal.trim();
    if(usernameVal.length==0) updateTextError(usernameAlert,"Please enter username",true);
    else if(usernameVal.length<6) updateTextError(usernameAlert,"Username should be 6 characters",true);
    else if((/\s/.test(usernameVal))) updateTextError(usernameAlert,"Please do not enter space",true);
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
    firstnameVal.trim();
    if(firstnameVal.length==0) updateTextError(firstnameAlert,"Please enter first name",true);
    else if((/\s/.test(firstnameVal))) updateTextError(firstnameAlert,"Please do not enter space",true);
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
    lastnameVal.trim();
    if(lastnameVal.length==0) updateTextError(lastnameAlert,"Please enter last name",true);
    else if((/\s/.test(lastnameVal))) updateTextError(lastnameAlert,"Please do not enter space",true);
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
    if(telVal.length==0) updateTextError(telAlert,"Please enter phone number",true);
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
        updateTextError(passwordAlert,"Please enter password",true);
        password.style.border = "1px solid red";
        return false;
    } 
    else if(passVal.length<8){
        updateTextError(passwordAlert,"Password must contain 8 digit",true);
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
        updateTextError(passwordAlert,"Password must contains at least one uppercase, lowercase, number, symbol",true);
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

    if(cpassVal.length === 0) updateTextError(cpasswordAlert,"Please enter confirm password",true);
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
    if(genderVal.length === 0) updateTextError(genderAlert,"Please select gender",true);
    else{
        updateTextError(genderAlert,"",false);
        return true;
    }
    return false;
}
function isValidDob(dobVal){
    dobVal = dobVal.trim();
    if(dobVal.length === 0) {
        dob.style.border = "1px solid red";
        updateTextError(dobAlert, "Please select Date of birth", true);
    } else {
        const selectedDate = new Date(dobVal);
        const selectedYear = selectedDate.getFullYear();

        if (selectedYear >= 1950 && selectedYear <= 2020) {
            updateTextError(dobAlert, "", false);
            dob.style.border = "0px solid red";
            return true;
        } else {
            dob.style.border = "1px solid red";
            updateTextError(dobAlert, "Please select a valid year (1950 - 2020)", true);
        }
    }
    dob.style.border = "1px solid red";
    return false;
}

















// function updateValidationElement(element, isValid) {
//     element.style.color = isValid ? 'green' : 'red';
//     element.querySelectorAll('i').forEach(icon => {
//         icon.classList.remove(isValid ? 'fa-circle-xmark' : 'fa-circle-check');
//         icon.classList.add(isValid ? 'fa-circle-check' : 'fa-circle-xmark');
//     });
// }

// function signupValidity(event) {
//     event.preventDefault();

//     var upassword = document.getElementById("upassword");
//     var ucpassword = document.getElementById("ucpassword");
//     let pass = upassword.value;
//     let repass = ucpassword.value;

//     let capital = false, lower = false, number = false, sybmol = false;
//     for (let i = 0; i < pass.length; i++) {
//         let c = pass.charAt(i);
//         if (c >= 'A' && c <= 'Z') capital = true;
//         else if (c >= 'a' && c <= 'z') lower = true;
//         else if (c >= '0' && c <= '9') number = true;
//         else sybmol = true;
//         console.log(c + " " + capital + " " + lower + " " + number + " " + sybmol);
//     }

//     let validUppercase = document.getElementById("validUppercase");
//     let validLowwercase = document.getElementById("validLowercase");
//     let validNumeric = document.getElementById("validNumeric");
//     let validSymbol = document.getElementById("validSymbol");

//     // Get all elements with class 'cause'
//     let causeElements = document.querySelectorAll(".cause");

//     // Loop through each element and set the display property
//     causeElements.forEach(function (element) {
//         element.style.display = 'block';
//         element.querySelector('i').classList.remove('fa-check');
//         element.querySelector('i').classList.add('fa-circle-xmark');
//     });

//     updateValidationElement(validUppercase, capital);
//     updateValidationElement(validLowwercase, lower);
//     updateValidationElement(validNumeric, number);
//     updateValidationElement(validSymbol, sybmol);

//     console.log(capital + " " + lower + " " + number + " " + sybmol);

//     if (capital && lower && number && sybmol) {
//         if (pass === repass) {
//             window.location.href = "index.html";
//         } else {
//             updateValidationElement(validUppercase, false);
//             validUppercase.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Password Doesn\'t Match';
//         }
//     }
// }