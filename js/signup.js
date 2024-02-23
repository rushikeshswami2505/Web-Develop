function login() {
    console.log("ok");
    window.location.href = "index.html";
}

let uemail = document.getElementById("uemail");
let uname = document.getElementById("uname");
let utel = document.getElementById("utel");
let upassword = document.getElementById("upassword");
let ucpassword = document.getElementById("ucpassword");

function signupValidity(event) {
    event.preventDefault();

    var upassword = document.getElementById("upassword");
    var ucpassword = document.getElementById("ucpassword");
    let pass = upassword.value;
    let repass = ucpassword.value;

    let capital = false, lower = false, number = false, sybmol = false;
    for (let i = 0; i < pass.length; i++) {
        let c = pass.charAt(i);
        if (c >= 'A' && c <= 'Z') capital = true;
        else if (c >= 'a' && c <= 'z') lower = true;
        else if (c >= '0' && c <= '9') number = true;
        else sybmol = true;
        console.log(c + " " + capital + " " + lower + " " + number + " " + sybmol);
    }

    let validUppercase = document.getElementById("validUppercase");
    let validLowwercase = document.getElementById("validLowercase");
    let validNumeric = document.getElementById("validNumeric");
    let validSymbol = document.getElementById("validSymbol");

    let causeElements = document.querySelectorAll(".cause");

    causeElements.forEach(function (element) {
        element.style.display = 'block';
        // element.style.color = 'red';
        // element.querySelector('i').classList.remove('fa-check');
        // element.querySelector('i').classList.add('fa-circle-xmark');
    });

    if (capital) {
        validUppercase.style.color = 'green';
        validUppercase.querySelectorAll('i').forEach(icon => {
            icon.classList.remove('fa-circle-xmark');
            icon.classList.add('fa-circle-check');
        });
    } else {
        validUppercase.style.color = 'red';
        validUppercase.querySelectorAll('i').forEach(icon => {
            icon.classList.remove('fa-circle-check');
            icon.classList.add('fa-circle-xmark');
        });
    }

    if (lower) {
        validLowwercase.style.color = 'green';
        validLowwercase.querySelectorAll('i').forEach(icon => {
            icon.classList.remove('fa-circle-xmark');
            icon.classList.add('fa-circle-check');
        });
    } else {
        validLowwercase.style.color = 'red';
        validLowwercase.querySelectorAll('i').forEach(icon => {
            icon.classList.remove('fa-circle-check');
            icon.classList.add('fa-circle-xmark');
        });
    }

    if (number) {
        validNumeric.style.color = 'green';
        validNumeric.querySelectorAll('i').forEach(icon => {
            icon.classList.remove('fa-circle-xmark');
            icon.classList.add('fa-circle-check');
        });
    } else {
        validNumeric.style.color = 'red';
        validNumeric.querySelectorAll('i').forEach(icon => {
            icon.classList.remove('fa-circle-check');
            icon.classList.add('fa-circle-xmark');
        });
    }

    if (sybmol) {
        validSymbol.style.color = 'green';
        validSymbol.querySelectorAll('i').forEach(icon => {
            icon.classList.remove('fa-circle-xmark');
            icon.classList.add('fa-circle-check');
        });
    } else {
        validSymbol.style.color = 'red';
        validSymbol.querySelectorAll('i').forEach(icon => {
            icon.classList.remove('fa-circle-check');
            icon.classList.add('fa-circle-xmark');
        });
    }

    console.log(capital + " " + lower + " " + number + " " + sybmol);

    if (capital && lower && number && sybmol) {
        if (pass === repass) {
            window.location.href = "index.html";
            localStorage.setItem("password",pass);
            localStorage.setItem("id",uemail.value);
        } else {
            validUppercase.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Password Doesn\'t Match';
            validUppercase.style.color = 'red';
        }
    }
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
