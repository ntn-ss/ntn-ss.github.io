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

closeModal.forEach((close)=>{
    close.addEventListener('click', ()=>{
        toggleDetailsPokemon()
    })
})