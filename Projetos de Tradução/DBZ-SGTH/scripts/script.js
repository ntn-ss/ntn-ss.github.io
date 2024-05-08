let elImagem = document.getElementById('random');

const imagemAleatoria = () => {
    numero = Math.floor(Math.random() * 33);
    elImagem.setAttribute('src', `./assets/Prints_Randomizadas/${numero}.jpg`);
}

let numero = 0;
while (numero === 0) {
    imagemAleatoria()
}
