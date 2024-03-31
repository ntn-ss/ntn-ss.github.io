const pokemonArea = document.getElementById('js-list-pokemon')
const typeArea = document.getElementById('js-list-types')
const typeAreaMobile = document.querySelector('.dropdown-select')
const pokemonCounter = document.getElementById('js-count-pokemon')
const typeAllButton = document.getElementById('special-button')
const sectionAllInfoPokemon = document.querySelector('.s-all-info-pokemon')
const btnLoadMore = document.getElementById('js-btn-load-more')
const inputSearch = document.getElementById('js-input-search')
const btnSearch = document.getElementById('js-btn-search')

let countPagination = 0;
const limit = 151;

typeAllButton.addEventListener('click', (event)=>filterByTypes(event))

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

function openDetailsPokemon () {
    document.documentElement.classList.add("open-modal")

    let codePokemon = this.getAttribute('idpoke')

    axios({
        method: 'GET',
        url: `https://pokeapi.co/api/v2/pokemon/${codePokemon}`
    })
    .then(res=>{
        console.log(res.data)
    })
}

function closeDetailsPokemon() {
    document.documentElement.classList.remove("open-modal")
}

const createCardPokemon = (infoCard) => {
    const { name, id, sprite, spriteReserva, cry, typeBR, type } = infoCard;

    const card = document.createElement('button')
    card.classList = `card-pokemon js-open-pokemon-details ${type}`
    card.setAttribute('idpoke', id)

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

    pokemonArea.appendChild(card)
}

const createPokemonTypes = (typeFilter) => {
    const { name, url, nameBR } = typeFilter;

    const listItem = document.createElement('li');

    const idType = Number(url.split('/')[6])

    if (idType !== 10001 && idType !== 10002) {
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

        typeButton.addEventListener('click', (event)=>filterByTypes(event, idType))
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

        itemTypeMobile.addEventListener('click', (event)=>filterByTypes(event, idType))
    }
};


const listPokemon = async (urlAPI) => {
    await axios({
        method: 'GET',
        url: urlAPI,
    })
    .then((res)=>{
        const { count, results } = res.data;
        pokemonCounter.textContent = count;
        
        // Sort the array of Pokémon IDs
        results.sort((a, b) => a.id - b.id);

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
                    type: types[0].type.name,
                    typeBR
                }
                
                createCardPokemon(infoCard)

                const cardsPokemon = document.querySelectorAll(".js-open-pokemon-details");

                cardsPokemon.forEach(card => {
                    card.addEventListener('click', openDetailsPokemon)
                })

                const closeModal = document.querySelectorAll(".close-modal")

                if (closeModal) {
                    closeModal.forEach((close)=>{
                        close.addEventListener('click', closeDetailsPokemon)
                    })
                }
            })
        });
    })
}

const listPokemonTypes = async (urlAPI) => {
    await axios({
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

const filterByTypes = async (event, idType) => {
    if (idType) {
        try {
            const topSection = sectionAllInfoPokemon.offsetTop
            window.scrollTo({
                top: topSection+288,
                behavior: 'smooth'
            })
    
            const allTypes = document.querySelectorAll('.type-filter')
            allTypes.forEach(type=>{
                type.classList.remove('active')
            })
    
            event.currentTarget.classList.add('active')
    
            pokemonArea.innerHTML=""
            btnLoadMore.style.display='none'
            
            axios({
                method: 'GET',
                url: `https://pokeapi.co/api/v2/type/${idType}`
            })
            .then(res=>{
                const { pokemon } = res.data
                pokemonCounter.textContent=pokemon.length
                
                pokemon.forEach(poke=>{
                    const {url} = poke.pokemon
                    axios({
                        method: 'GET',
                        url: `${url}`
                    })
                    .then((res)=>{
                        const { id, sprites, types, cries } = res.data;
        
                        let name = parseNameBR(id);
                        
                        if (!name) {
                            name = capitalizeFirstLetter(res.data.name)
                        }
        
                        const typeBR = parseTypeBR(types);
        
                        const infoCard = {
                            name,
                            id,
                            sprite: sprites.other.dream_world.front_default,
                            spriteReserva: sprites.front_default,
                            cry: cries.latest,
                            urlAPIDetails: url,
                            type: types[0].type.name,
                            typeBR
                        }
                        
                        createCardPokemon(infoCard)
        
                        const cardsPokemon = document.querySelectorAll(".js-open-pokemon-details");
        
                        cardsPokemon.forEach(card => {
                            card.addEventListener('click', openDetailsPokemon)
                        })
        
                        const closeModal = document.querySelectorAll(".close-modal")
        
                        if (closeModal) {
                            closeModal.forEach((close)=>{
                                close.addEventListener('click', closeDetailsPokemon)
                            })
                        }
                    })
                })
            })
    
        } catch (error) {
            console.error(error)
        }
    } else {

        const topSection = sectionAllInfoPokemon.offsetTop
            window.scrollTo({
                top: topSection+288,
                behavior: 'smooth'
            })

            const allTypes = document.querySelectorAll('.type-filter')
            allTypes.forEach(type=>{
                type.classList.remove('active')
            })

            event.currentTarget.classList.add('active')

        pokemonArea.innerHTML=""
        
        countPagination = 0;
        
        btnLoadMore.style.display='block'

        listPokemon(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${countPagination}`)

        countPagination++
    }
}

listPokemon(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${countPagination}`)
countPagination++;

listPokemonTypes('https://pokeapi.co/api/v2/type/')

const loadMorePokemon = () => {
    const offset = countPagination * limit;
    listPokemon(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`);

    countPagination++;
}

btnLoadMore.addEventListener('click', loadMorePokemon)

const searchPokemon = () => {
    let valueInput = inputSearch.value.toLowerCase();

    if (!valueInput) {
        alert('Digite alguma coisa na busca.')
        pokemonArea.innerHTML = ""

        countPagination = 0;
        listPokemon(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${countPagination}`)
        countPagination++;

        typeAllButton.classList.add('active')

        btnLoadMore.style.display = 'block'
    } else {
        let englishName = valueInput;

        // Check if the input matches a Brazilian name
        for (let key in dadosNomesPokemon) {
            if (key !== 'ID') {
                const pokemonName = dadosNomesPokemon[key].toLowerCase().trim();
                if (pokemonName === valueInput) {
                    englishName = key;
                    break; // Exit the loop once a match is found
                }
            }
        }

        axios({
            method: 'GET',
            url: `https://pokeapi.co/api/v2/pokemon/${englishName}`
        })
        .then(res => {
            const allTypes = document.querySelectorAll('.type-filter')

            allTypes.forEach(type => {
                type.classList.remove('active')
            })

            pokemonArea.innerHTML = ""
            btnLoadMore.style.display = 'none'

            pokemonCounter.textContent = 1;

            const { id, sprites, types, cries } = res.data;

            let name = parseNameBR(id);

            if (!name) {
                name = capitalizeFirstLetter(pokemon.name)
            }

            const typeBR = parseTypeBR(types);

            const urlAPIDetails = `https://pokeapi.co/api/v2/pokemon/${englishName}`

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
                card.addEventListener('click', openDetailsPokemon)
            })

            const closeModal = document.querySelectorAll(".close-modal")

            if (closeModal) {
                closeModal.forEach((close) => {
                    close.addEventListener('click', closeDetailsPokemon)
                })
            }
        })
        .catch(err => {
            alert('Pokémon não encontrado.')
        })
    }
}



btnSearch.addEventListener('click', searchPokemon)
inputSearch.addEventListener('keyup', (event)=>{
    if (event.code==='Enter' || event.code === 'NumpadEnter') {
        searchPokemon()
    }
})