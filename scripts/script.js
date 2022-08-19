function toggleHeader(){
    if (window.pageYOffset > 60 && $header.classList.contains("max-header")){
        $header.classList.remove("max-header");
        $header.classList.add("min-header");
        
        $logo.firstElementChild.setAttribute('src','imgs/Test4 v2.png');
        $logo.classList.remove("max-logo");
        $logo.classList.add("min-logo");

        $nav.classList.remove("max-nav");
        $nav.classList.add("min-nav");
    }
    else if(window.pageYOffset <= 60 && $header.classList.contains("min-header")){
        $header.classList.add("max-header");
        $header.classList.remove("min-header");
        
        $logo.firstElementChild.setAttribute('src','imgs/Test4.png');
        $logo.classList.add("max-logo");
        $logo.classList.remove("min-logo");

        $nav.classList.add("max-nav");
        $nav.classList.remove("min-nav");
    }
}

const $header = document.querySelector("header");
window.addEventListener("scroll", toggleHeader, false);

const $logo = document.querySelectorAll('.logo')[0];

const $nav = document.querySelectorAll('.nav-bar')[0];