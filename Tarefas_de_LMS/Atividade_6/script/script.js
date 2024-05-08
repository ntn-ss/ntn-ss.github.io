let randomPost;

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 20) {
      hiddenMenu.style.top="0";
      hiddenMenu.style.maxHeight="100vh";
    } else {
      hiddenMenu.style.top="6vh";
      hiddenMenu.style.maxHeight="94vh";
  }
});

let menu = document.querySelector("#Menu");
menu.addEventListener("click", mostraMenu);

let hiddenMenu = document.querySelector("#hidden-menu");

window.onload = (event) => {
  feed = document.querySelector("main");
};

let buttonModal = document.getElementById("buttonPost");
buttonModal.addEventListener("click", mostraModal);

let modalBackground = document.getElementById("modal-overlay");
let modal = document.getElementById("modal");

let feedContainer = document.getElementById("feed-container");
let form = document.getElementById("formulary");

form.addEventListener("submit", (event) => { event.preventDefault() });

document.getElementById("submit").addEventListener("click", pusher);

let message = document.getElementById("message");
let author = document.getElementById("author");

let priorityMessage;
let priorityAuthor;

let stored_posts = [
  ["JavaScript? É deveras fácil.", "Mark Zuckerberg"],
  ["Diferente dos igual.", "Tarcísio do Acordeon"],
];
feedContainer.innerHTML += `<div class='post'> <div class='post-text'> <span>${stored_posts[0][0]}</span> <b>${stored_posts[0][1]}</b></div>`
feedContainer.innerHTML += `<div class='post'> <div class='post-text'> <span>${stored_posts[1][0]}</span> <b>${stored_posts[1][1]}</b></div>`

function randomizer(){
  randomPost = stored_posts[Math.floor(Math.random() * stored_posts.length)];
  
  priorityMessage=document.getElementById("priority-message").innerHTML=randomPost[0];
  priorityAuthor=document.getElementById("priority-author").innerHTML=randomPost[1];
}
  setInterval(randomizer, 2000);

function pusher() {
  stored_posts.push([message.value, author.value]);
  feedContainer.innerHTML += `<div class='post'> <div class='post-text'> <span>${message.value}</span> <b>${author.value}</b></div>`;
}
let imgSlider = document.querySelector(".img-slider");

function mostraMenu() {
  if (hiddenMenu.classList.contains("hidden")) {
    hiddenMenu.classList.remove("hidden");
    hiddenMenu.style.animation = "aparece .3s";

    feed.style.width = "70.5vw";
    modal.style.maxWidth = "70.5vw";
    modalBackground.style.width = "70.5vw";
    imgSlider.style.margin = "0";
    imgSlider.style.marginTop = "14vh";
    imgSlider.style.marginBottom = "14vh";
  
  } else {
    hiddenMenu.style.animation = "some .3s";
    hiddenMenu.classList.add("hidden");
    feed.style.width = "auto";
    modal.style.maxWidth = "70vw";
    modalBackground.style.width = "100vw";
    imgSlider.style.margin = "auto";
    imgSlider.style.marginTop = "14vh";
    imgSlider.style.marginBottom = "14vh";
  }
}

function mostraModal() {
  modalBackground.classList.toggle("hidden");
  modal.classList.toggle("hidden");
  if (!modal.classList.contains("hidden")) {
    buttonModal.innerHTML = "Cancelar";
  } else {
    buttonModal.innerHTML = "Postar";
  }
}

const slides = document.querySelectorAll(".slide");
let counter = 0;

slides.forEach(
  (slide, index) => {
    slide.style.left = `${index * 100}%`;
  }
)
console.log(counter);
console.log(slides.length);

const slideImage = () => {
  slides.forEach(
    (slide) => {
      slide.style.transform = `translateX(-${counter*100}%)`;
    }
  )
}

const goPrev = () => {
  if (counter > 0){
    counter--;
    slideImage();
  }
}

const goNext = () => {
  if (counter < 4){
    counter++;
    slideImage();
  }
}