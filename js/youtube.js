// icons for left large navbar 
const beforeClickClasses = ['bi-house-door', 'bi-file-play', 'bi-collection-play', 'bi-file-person', 
                            'bi-hourglass-top', 'bi-play-btn', 'bi-clock', 'bi-pen'];

const afterClickClasses = ['bi-house-door-fill', 'bi-file-play-fill', 'bi-collection-play-fill','bi-file-person-fill', 
                            'bi-hourglass-bottom', 'bi-play-btn-fill', 'bi-clock-fill','bi-pen-fill'];

const btnGuideList = document.querySelectorAll(".btn-guide");
let currentBtnGuide = 0;

// for on click listener on nav button
for(let i=0;i<btnGuideList.length;i++){
    btnGuideList[i].addEventListener('click', function() {
        btnGuideList[currentBtnGuide].classList.remove("btn-active-guide");
        btnGuideList[i].classList.add("btn-active-guide");

        if(currentBtnGuide<9){
            const iconElementOld = btnGuideList[currentBtnGuide].querySelector('i');
            iconElementOld.classList.remove(afterClickClasses[currentBtnGuide]);
            iconElementOld.classList.add(beforeClickClasses[currentBtnGuide]);
        }
        if (i < 9) {    
            const iconElementNew = btnGuideList[i].querySelector('i');
            iconElementNew.classList.remove(beforeClickClasses[i]);
            iconElementNew.classList.add(afterClickClasses[i]);
        }
        currentBtnGuide = i;
    });    
}

// icon for left large navbar
const beforeClickMainGuide = ['bi-house-door', 'bi-file-play', 'bi-collection-play', 'bi-play-btn'];
const afterClickMainGuide = ['bi-house-door-fill', 'bi-file-play-fill', 'bi-collection-play-fill','bi-play-btn-fill'];
let btnMainGuide = document.querySelectorAll(".btn-main-guide");
let currentMainGuide = 0;

// for on click listener on small left navbar
for(let i=0;i<btnMainGuide.length;i++){
    btnMainGuide[i].addEventListener('click', function() {
        const iconElementOld = btnMainGuide[currentMainGuide].querySelector('i');
        iconElementOld.classList.remove(afterClickMainGuide[currentMainGuide]);
        iconElementOld.classList.add(beforeClickMainGuide[currentMainGuide]);
        const iconElementNew = btnMainGuide[i].querySelector('i');
        iconElementNew.classList.remove(beforeClickMainGuide[i]);
        iconElementNew.classList.add(afterClickMainGuide[i]);
        currentMainGuide = i;
    });
}

// it changes the on click background for navbar keyword suggest
const btnSuggest = document.querySelectorAll(".btn-suggest");
let currentBtnSuggest = 0
for(let i=0;i<btnSuggest.length;i++){
    btnSuggest[i].addEventListener('click', function() {
        btnSuggest[currentBtnSuggest].classList.remove("btn-active-suggest");   
        btnSuggest[i].classList.add("btn-active-suggest");
        currentBtnSuggest = i;
    });    
}


// signout function
function signOut(){
    localStorage.removeItem("currentuser");
    window.history.pushState(null, null, "login.html");
    window.location.href = "login.html";
}

// it toggle for left small and large navbar
function openSideGuide(){
    $("#mainLargeGuide").toggle();
    $("#mainSmallGuide").toggle();
}