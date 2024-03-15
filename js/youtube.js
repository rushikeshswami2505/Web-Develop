let viewProfile = document.getElementById("viewProfile"); 

// viewProfile.addEventListener('click', function(){

// });

function openSideGuide(){
    $("#mainLargeGuide").toggle();
    $("#mainSmallGuide").toggle();
}


// function hideExtraButtons() {
//     const container = document.querySelector('.container-suggest');
//     const buttons = container.querySelectorAll('.btn-suggest');
//     const containerWidth = container.offsetWidth;
//     let buttonsWidth = 0;

//     buttons.forEach(button => {
//         buttonsWidth += button.offsetWidth;
//         if (buttonsWidth > containerWidth) {
//             button.style.display = 'none';
//         } else {
//             button.style.display = 'inline-block';
//         }
//     });
// }
