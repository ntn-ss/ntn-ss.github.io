const pokemonArea = document.getElementById('js-list-pokemon')
const typeArea = document.getElementById('js-list-types')
const typeAreaMobile = document.querySelector('.dropdown-select')

const parseNameBR = (id) => {
    if (dadosNomesPokemon[id]) {
        return dadosNomesPokemon[id];
    } else {
        return false;
    }
}

const parseTypeBR = (type) => {
    if (type[0].type) {
        return dadosTiposPokemon[type[0].type.url.split('/')[6]];
    } else {
        const numeroTipo = type.split('/')[6];
        return dadosTiposPokemon[numeroTipo];
    }
}

const capitalizeFirstLetter = (str) => {
    return `${str.charAt(0).toUpperCase()}${str.slice(1, str.length)}`
}

const toggleDetailsPokemon = () => {
    document.documentElement.classList.toggle("open-modal")
}

const createCardPokemon = (infoCard) => {
    const { name, id, sprite, spriteReserva, cry, urlAPIDetails, typeBR, type } = infoCard;

    const card = document.createElement('button')
    card.classList = `card-pokemon js-open-pokemon-details ${type}`

    pokemonArea.appendChild(card)

    const image = document.createElement('div')
    image.classList = 'image'

    card.appendChild(image)

    const imagePoke = document.createElement('img')
    imagePoke.className = 'thumb-img'

    if (sprite) {
        imagePoke.setAttribute('src', sprite)
    } else {
        imagePoke.setAttribute('src', spriteReserva)
    }

    
    image.appendChild(imagePoke)
    
    const info = document.createElement('div')
    info.classList='info';
    
    const txt = document.createElement('div')
    txt.classList='txt'
    
    const idPoke = document.createElement('span')
    
    if (id < 10) {
        idPoke.textContent = `#00${id}`
    } else if (id < 100) {
        idPoke.textContent = `#0${id}`
    } else {
        idPoke.textContent = `#${id}`
    }
    
    const namePoke = document.createElement('h3')
    namePoke.textContent=`${name}`
    
    txt.append(idPoke, namePoke)
    
    info.appendChild(txt)
    
    const icon = document.createElement('div')
    icon.classList='icon'
    
    const imageType = document.createElement('img')
    imageType.setAttribute('src', `./img/icon-types/${type}.svg`)
    imageType.setAttribute('alt', typeBR)
    
    icon.appendChild(imageType)
    info.appendChild(icon)

    card.appendChild(info)
}

const createPokemonTypes = (typeFilter) => {
    const { name, url, nameBR } = typeFilter;

    const listItem = document.createElement('li');

    if (Number(url.split('/')[6]) !== 10001 && Number(url.split('/')[6]) !== 10002) {
        const typeButton = document.createElement('button');
        typeButton.classList = `type-filter ${name}`;

        const icon = document.createElement('div');
        icon.classList = 'icon';
        typeButton.appendChild(icon);

        const imagePoke = document.createElement('img');

        const svgPath = `./img/icon-types/${name}.svg`;

        imagePoke.setAttribute('src', svgPath);

        imagePoke.setAttribute('alt', nameBR);

        pokemonArea.appendChild(typeButton);

        icon.appendChild(imagePoke);

        const span = document.createElement('span');
        span.textContent = nameBR;
        
        typeButton.appendChild(icon);
        typeButton.appendChild(span);

        listItem.appendChild(typeButton);
        typeArea.appendChild(listItem);

        // mobile
        let itemTypeMobile = document.createElement('li')
        
        const typeButtonMobile = document.createElement('button');
        typeButtonMobile.classList = `type-filter ${name}`;
        
        const iconMobile = document.createElement('div');
        iconMobile.classList = 'icon';
        
        const imagePokeMobile = document.createElement('img');
        imagePokeMobile.setAttribute('src', svgPath);
        imagePokeMobile.setAttribute('alt', nameBR);
        iconMobile.appendChild(imagePokeMobile)

        const spanMobile = document.createElement('span');
        spanMobile.textContent = nameBR;

        typeButtonMobile.appendChild(iconMobile);
        typeButtonMobile.appendChild(spanMobile);
        
        itemTypeMobile.appendChild(typeButtonMobile)
        typeAreaMobile.appendChild(itemTypeMobile)
    }
};


const listPokemon = (urlAPI, offset, limit) => {
    axios({
        method: 'GET',
        url: urlAPI,
        params: {
            limit: limit,
            offset: offset,
            order: 'id' // Order by Pokémon ID
        }
    })
    .then((res)=>{
        const { count, results } = res.data;
        document.getElementById('js-count-pokemon').textContent = count;
        
        results.forEach(pokemon => {
            const urlAPIDetails = pokemon.url;
            axios({
                method: 'GET',
                url: urlAPIDetails
            })
            .then((res)=>{
                const { id, sprites, types, cries } = res.data;

                let name = parseNameBR(id);
                
                if (!name) {
                    name = capitalizeFirstLetter(pokemon.name)
                }

                const typeBR = parseTypeBR(types);

                const infoCard = {
                    name,
                    id,
                    sprite: sprites.other.dream_world.front_default,
                    spriteReserva: sprites.front_default,
                    cry: cries.latest,
                    urlAPIDetails,
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

const listPokemonTypes = (urlAPI) => {
    axios({
        method: "GET",
        url: urlAPI
    })
    .then((res)=>{
        const { count, results } = res.data;
        
        document.getElementById('js-count-types').textContent = count;
        results.forEach(type=>{
            const { name, url } = type;
            const nameBR = parseTypeBR(type.url);

            const typeFilter = {
                name,
                url,
                nameBR,
            }

            createPokemonTypes(typeFilter)
        })
    })
}



const btnLoadMore = document.getElementById('js-btn-load-more')
let countPagination = 0;
const limit = 30;

listPokemon(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${countPagination}`)
countPagination++;

listPokemonTypes('https://pokeapi.co/api/v2/type/')

const loadMorePokemon = () => {
    const offset = countPagination * limit;
    listPokemon('https://pokeapi.co/api/v2/pokemon/', offset, limit);

    countPagination++;
}

btnLoadMore.addEventListener('click', loadMorePokemon)