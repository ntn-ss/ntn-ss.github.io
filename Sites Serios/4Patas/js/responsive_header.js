let botaoMenu = document.getElementById("iconeMenu");
let cliqueMobile = document.getElementById("navBar");

function menuMobile() {
  if (cliqueMobile.className === "nav-bar") {
    cliqueMobile.className += " responsive";
    botaoMenu.src = "./img/x.png";
  } else {
    cliqueMobile.className = "nav-bar";
    botaoMenu.src = "./img/Burger.png";
  }
}