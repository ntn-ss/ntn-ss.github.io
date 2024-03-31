// main slide's script
var slide_hero = new Swiper(".slide-hero", {
    effect: 'fade',
  pagination: {
    el: ".slide-hero .area-explore .swiper-pagination",
  },
});

const btnDropdownSelect = document.querySelector(".js-open-select-custom")

if (btnDropdownSelect) {
    btnDropdownSelect.addEventListener('click', ()=>{
        btnDropdownSelect.parentElement.classList.toggle("active")
    })
}