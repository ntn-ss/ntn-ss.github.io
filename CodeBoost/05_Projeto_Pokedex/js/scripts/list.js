let pokemonArea = document.getElementById('js-list-pokemon')

function parseNameBR(id) {
    return dadosNomesPokemon[id];
}

function parseTypeBR(types) {
    return dadosTiposPokemon[types[0].type.url.split('/')[6]];
}

function toggleDetailsPokemon() {
    document.documentElement.classList.toggle("open-modal")
}

function createCardPokemon(infoCard) {
    let { name, id, sprite, cry, typeBR, type } = infoCard;

    let card = document.createElement('button')
    card.classList = `card-pokemon js-open-pokemon-details ${type}`

    pokemonArea.appendChild(card)

    let image = document.createElement('div')
    image.classList = 'image'

    card.appendChild(image)

    let imagePoke = document.createElement('img')
    imagePoke.className = 'thumb-img'
    imagePoke.setAttribute('src', sprite)
    
    image.appendChild(imagePoke)
    
    let info = document.createElement('div')
    info.classList='info';
    
    let txt = document.createElement('div')
    txt.classList='txt'
    
    let idPoke = document.createElement('span')
    
    if (id < 10) {
        idPoke.textContent = `#00${id}`
    } else if (id < 100) {
        idPoke.textContent = `#0${id}`
    } else {
        idPoke.textContent = `#${id}`
    }
    
    let namePoke = document.createElement('h3')
    namePoke.textContent=`${name}`
    
    txt.append(idPoke, namePoke)
    
    info.appendChild(txt)
    
    let icon = document.createElement('div')
    icon.classList='icon'
    
    let imageType = document.createElement('img')
    imageType.setAttribute('src', `../../img/icon-types/${type}.svg`)
    imageType.setAttribute('alt', typeBR)
    
    icon.appendChild(imageType)
    info.appendChild(icon)

    card.appendChild(info)
}

function listPokemon(urlAPI) {
    axios({
        method: 'GET',
        url: urlAPI
    })
    .then((res)=>{
        const {count, results} = res.data;
        document.getElementById('js-count-pokemon').textContent = count;
        
        results.forEach(pokemon => {
            let urlAPIDetails = pokemon.url;
            
            axios({
                method: 'GET',
                url: urlAPIDetails
            })
            .then((res)=>{
                let { id, sprites, types, cries } = res.data;

                let name = parseNameBR(id);
                let typeBR = parseTypeBR(types);

                const infoCard = {
                    name,
                    id,
                    sprite: sprites.other.dream_world.front_default,
                    cry: cries.latest,
                    type: types[0].type.name,
                    typeBR
                }
                
                createCardPokemon(infoCard)

                const cardsPokemon = document.querySelectorAll(".js-open-pokemon-details");

                cardsPokemon.forEach(card => {
                    card.addEventListener('click', toggleDetailsPokemon)
                })

                const closeModal = document.querySelectorAll(".close-modal")

                if (closeModal) {
                    closeModal.forEach((close)=>{
                        close.addEventListener('click', toggleDetailsPokemon)
                    })
                }
            })
        });
    })
}

listPokemon('https://pokeapi.co/api/v2/pokemon?limit=12&offset=0')
