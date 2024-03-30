// main slide's script
var slide_hero = new Swiper(".slide-hero", {
    effect: 'fade',
  pagination: {
    el: ".slide-hero .area-explore .swiper-pagination",
  },
});

const cardsPokemon = document.querySelectorAll(".js-open-pokemon-details");

function toggleDetailsPokemon() {
    document.documentElement.classList.toggle("open-modal")
}

cardsPokemon.forEach((card)=>{
    card.addEventListener('click', ()=>{
        toggleDetailsPokemon()
    })
})

const closeModal = document.querySelectorAll(".close-modal")

if (closeModal) {
    closeModal.forEach((close)=>{
        close.addEventListener('click', ()=>{
            toggleDetailsPokemon()
        })
    })
}

const btnDropdownSelect = document.querySelector(".js-open-select-custom")

if (btnDropdownSelect) {
    btnDropdownSelect.addEventListener('click', ()=>{
        btnDropdownSelect.parentElement.classList.toggle("active")
    })
}

console.log(btnDropdownSelect);