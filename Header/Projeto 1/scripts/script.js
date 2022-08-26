var isOpen=false;

const $header = document.querySelector("header");
window.addEventListener("scroll", toggleHeader, false);

const $logo = document.querySelectorAll('.logo')[0];

const $nav = document.querySelectorAll('.nav-bar')[0];
$nav.addEventListener("click", navClick, false);

const $menu = document.querySelectorAll('.menu')[0];
$menu.addEventListener("click", toggleMenu, false);

function toggleHeader(){
    if (window.pageYOffset > 60 && $header.classList.contains("max-header")){
        $header.classList.remove("max-header");
        $header.classList.add("min-header");
        
        $logo.firstElementChild.setAttribute('src','imgs/Test4v2.png');
        $logo.classList.remove("max-logo");
        $logo.classList.add("min-logo");

        $nav.classList.remove("max-nav");
        $nav.classList.add("min-nav");

        $menu.firstElementChild.classList.remove("max-hamburger");
        $menu.firstElementChild.classList.add("min-hamburger");
    }
    else if(window.pageYOffset <= 60 && $header.classList.contains("min-header")){
        $header.classList.add("max-header");
        $header.classList.remove("min-header");
        
        $logo.firstElementChild.setAttribute('src','imgs/Test4.png');
        $logo.classList.add("max-logo");
        $logo.classList.remove("min-logo");

        $nav.classList.add("max-nav");
        $nav.classList.remove("min-nav");

        $menu.firstElementChild.classList.add("max-hamburger");
        $menu.firstElementChild.classList.remove("min-hamburger");
    }
}

function toggleMenu(){

    if (!isOpen){
        $nav.classList.add("menu-opened");
        $menu.firstElementChild.classList.add("close-btn");
        isOpen = true;
    }
    
    else {
        $nav.classList.remove("menu-opened");
        $menu.firstElementChild.classList.remove("close-btn");
        isOpen = false;
    }
}

function navClick(evt){
    if (evt.target.tagName == 'A'){
        toggleMenu();
    }
}