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
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("btnHistory").addEventListener('click', function() {
        document.getElementById("youtubeHistory").classList.add("active");
        document.getElementById("youtubeVideos").classList.remove("active");
        document.getElementById("historyTop").classList.add("active");
    });

    document.getElementById("btnHome").addEventListener('click',function(){
        document.getElementById("youtubeHistory").classList.remove("active");
        document.getElementById("youtubeVideos").classList.add("active");
        document.getElementById("historyTop").classList.remove("active");   
    });

});



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

// For youtube theme change
let apprence = document.getElementById("apprence");
apprence.addEventListener('change',function(){
    let themeStylesheet = document.getElementById("themeStylesheet");
    let themeName = this.checked ? "css/youtubeDarkTheme.css" : "css/youtube.css"; 
    themeStylesheet.href = themeName;
    let youtubelogo = document.getElementById("youtubelogo");
    youtubelogo.src = this.checked ? "assets/images/youtube-logo-dark.png" : "assets/images/youtubeLogo.png";
});

///////////////////////////////DYNAMIC HISTORY//////////////////////////////////
let historyDynamic = document.querySelector(".history-dynamic");
let historyThumbnil = ['assets/images/sharktank.webp','assets/images/luka_chupi_tumbnil.jpg',`assets/images/relax_thumbnil.jpg`,`assets/images/belive_thumbnil.jpg`,`assets/images/old_thumbnil.jpg`];
let historyTitle = ['The Sharks Go NUTS To Invest In This Product','Luka Chuppi | Lata Mangeshkar | A.R. Rahman',`Pandit Ravi Shankar Mind Relaxing Sitar Music | Wake Up Happy`,`The Sharks Go NUTS To Invest In This Product`,`The Sharks Go NUTS To Invest In This Product`];
let historyChannel = ['Shark Tank &#x2022; 200k views','Soul Music &#x2022; 3.5M views',`Saregama Hindustani Classical &#x2022; 478k views`,`Reteless &#x2022; 2.8M views`,`Hangama &#x2022; 200k views`];
let historySubtitle = ['#AshneerGrover #GhazalAlagh #AmanGupta #shark #india',`Luka Chuppi' from 'Rang De Basanti', an emotional ride into the life of a mother, enacted by Waheeda Rehman`,`Listen To Enchanting Hindustani Classical Music Rendition Of " Mind Relaxing Sitar"`,`#AshneerGrover #GhazalAlagh #AmanGupta #shark #india`,`Old Hindi Song | EVER GREEN SONG | Lata Mangeshkar Bhosle`];
for(var i=0;i<historyThumbnil.length*5;i++){
    var historyCard = document.createElement('div');
    historyCard.innerHTML = `<div class="card border-0 history-box mb-3">
    <div class="d-flex history-content">
        <img class="col-3 rounded-3" src="${historyThumbnil[i%5]}">
        <div class="col-4 ms-3">
            <h6 class="fw-semibold fs-6 mb-0" >${historyTitle[i%5]}</h6>
            <small class="card-text text-muted fs-6">${historyChannel[i%5]}</small>
            <br>
            <span class="card-text text-muted long-small">${historySubtitle[i%5]}</span>
        </div>
    </div>
    </div>`;
    historyDynamic.appendChild(historyCard.children[0]);
}
/////////////////////////DYNAMIC VIDEOS///////////////////////////////
let videoDynamic = document.querySelector(".video-dynamic");
let videoThumbnil = [`assets/images/sharktank.webp`,`assets/images/luka_chupi_tumbnil.jpg`,`assets/images/relax_thumbnil.jpg`,
                    `assets/images/belive_thumbnil.jpg`,`assets/images/old_thumbnil.jpg`,`assets/images/scenic_thumbnil.jpg`,
                    `assets/images/open_source_thumbnil.jpg`,`assets/images/plannet_thumbnil.jpg`,``];
let videoIcon = [`assets/images/sharktank_icon.jpg`,`assets/images/luka_chpi_icon.jpg`,`assets/images/relax_icon.jpg`,
                `assets/images/belive_icon.jpg`,`assets/images/old_icon.jpg`,`assets/images/scenic_icon.jpg`,
                `assets/images/open_source_icon.jpg`,`assets/images/plannet_icon.jpg`,``];
let videoTimeStamp = [`10:20`,`5:10`,`30:14`,`6:34`,`15:13`,`2:03`,`5:33`,`12:23`,'`'];
let videoSubtitle = [`The Sharks Go NUTS To Invest In This Product | Shark Tank India`,
                    `Luka Chuppi | Lata Mangeshkar | A.R. Rahman | Rang De Basanti`,
                    `Pandit Ravi Shankar Mind Relaxing Sitar Music | Wake Up Happy`,
                    `The Sharks Go NUTS To Invest In This Product | Shark Tank India`,
                    `Old Hindi Song | EVER GREEN SONG | Lata Mangeshkar Bhosle`,
                    `Amazon 4k - The World’s Largest Tropical Part 2 | Jungle Sounds`,
                    `Day 1: Open Source Contributions | BootCamp | Learn with Piyush`,
                    `Our Planet | One Planet | FULL EPISODE | Netflix India | Small Birds`,
                    ``];
let videoChannel = [`Shark Tank India `,`Soul Music `,`Saregama Hindustani Classical `,`Reteless `,`Hangama `,`Scenic Scenes `,`Piyush Garg `,`Netflix `,``]
let videoViews = [`200k views &#x2022; 1 year ago`,`3.5M views &#x2022; 1 year ago`,`478k views &#x2022; 3 month ago`,
                `2.8M views &#x2022; 2 year ago`,`200k views &#x2022; 1 year ago`,`27M views &#x2022; 2 year ago`,
                `200k views &#x2022; 1 year ago`,`26M views &#x2022; 3 year ago`,``];

for(var i=0;i<videoThumbnil.length;i++){
    var videoCard = document.createElement('div');
    if(i===videoThumbnil.length-1){
        videoCard.innerHTML = `<div class="d-flex mt-4 card-box">
                            <div class="card border-0">
                                <div class="card-body text-start ps-0 pb-0 pt-2">
                                    <div class="row">
                                        <div class="col-2 pe-0 video-bottom">
                                        </div>
                                        <div class="col-10 ps-0"> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
    }
    else
        videoCard.innerHTML = 
        `<div class="d-flex mt-2 mb-2 card-box">
            <div class="card border-0">
                <img class="rounded-3" src="${videoThumbnil[i]}">
                <div class="card-body text-start ps-0 pb-0 pt-2">
                    <div class="row">
                        <div class="col-2 pe-0">
                            <img class="rounded-circle img-guide rounded channel-icon" src="${videoIcon[i]}">
                            <div class="bottom-right">${videoTimeStamp[i]}</div>
                        </div>
                        <div class="col-10 ps-0 video-bottom"> 
                            <span class="card-text fw-semibold channel-subtitle">${videoSubtitle[i]}</span>
                            <br>
                            <span class="card-text text-muted fs-6">${videoChannel[i]}<i class="bi bi-check-circle-fill check"></i></span>
                            <br>
                            <span class="card-text text-muted fs-6">${videoViews[i]}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    videoDynamic.appendChild(videoCard.children[0]);
}