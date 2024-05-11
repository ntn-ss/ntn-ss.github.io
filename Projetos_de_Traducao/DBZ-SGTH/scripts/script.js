let elImagem = document.getElementById('random');

let numero = 0;

const imagemAleatoria = () => {
    numero = Math.floor(Math.random() * 39);
    elImagem.setAttribute('src', `./assets/Prints_Randomizadas/${numero}.jpg`);
}

while (numero === 0) {
    imagemAleatoria()
}
