const Api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

const pokemonArea = document.getElementById("js-list-pokemon");
const typeArea = document.getElementById("js-list-types");
const typeAreaMobile = document.querySelector(".dropdown-select");
const pokemonCounter = document.getElementById("js-count-pokemon");
const typeAllButton = document.querySelectorAll(".special-button");
const sectionAllInfoPokemon = document.querySelector(".s-all-info-pokemon");
const btnLoadMore = document.getElementById("js-btn-load-more");

const inputSearch = document.getElementById("js-input-search");
const btnSearch = document.getElementById("js-btn-search");

const pokemonModalImage = document.getElementById("js-pokemon-modal-image");
const pokemonModalName = document.getElementById("js-pokemon-modal-name");
const pokemonModalId = document.getElementById("js-pokemon-modal-id");
const pokemonModalElement = document.getElementById("js-pokemon-modal-element");
const pokemonModalIcon = document.getElementById("js-pokemon-modal-icon");
const pokemonModalCry = document.getElementById("js-pokemon-modal-cry");
const pokemonModalTypes = document.getElementById("js-show-types");
const pokemonModalHeight = document.getElementById("js-pokemon-height");
const pokemonModalWeight = document.getElementById("js-pokemon-weight");
const pokemonModalAbility = document.getElementById("js-pokemon-abilities");
const pokemonModalWeaknesses = document.getElementById("js-pokemon-weaknesses");

const pokemonModalStatsHP = document.getElementById('js-modal-stats-hp')
const pokemonModalStatsATK = document.getElementById('js-modal-stats-atk')
const pokemonModalStatsDEF = document.getElementById('js-modal-stats-def')
const pokemonModalStatsSPATK = document.getElementById('js-modal-stats-sp-atk')
const pokemonModalStatsSPDEF = document.getElementById('js-modal-stats-sp-def')
const pokemonModalStatsSPD = document.getElementById('js-modal-stats-spd')

const activeTypeNameMobile = document.getElementById(
  "js-active-type-name-mobile"
);
const removeDropdown = document.getElementById("js-remove-dropdown");

let countPagination = 0;
const limit = 151;

typeAllButton.forEach(allTypeButtons=>{
  allTypeButtons.addEventListener("click", (event) => filterByTypes(event));
})

const parseNameBR = (id) => {
  if (dadosNomesPokemon[id]) {
    return dadosNomesPokemon[id];
  } else {
    return false;
  }
};

const parseSkillBR = (skill) => {
  const skillId = skill.split("/")[6];
  return dadosHabilidadesPokemon[skillId].trim();
};

const parseTypeBR = (type) => {
  if (type[0].type) {
    return dadosTiposPokemon[type[0].type.url.split("/")[6]];
  } else {
    const numeroTipo = type.split("/")[6];
    return dadosTiposPokemon[numeroTipo];
  }
};

const capitalizeFirstLetter = (str) => {
  return `${str.charAt(0).toUpperCase()}${str.slice(1, str.length)}`;
};

function openDetailsPokemon() {
  document.documentElement.classList.add("open-modal");

  let codePokemon = this.getAttribute("idPoke");

  let imagePokemon = this.querySelector(".thumb-img");
  let srcImage = imagePokemon.getAttribute("src");

  pokemonModalImage.setAttribute("src", srcImage);

  let namePokemon = this.querySelector("#namePoke");
  pokemonModalName.textContent = namePokemon.textContent;

  let idPokemon = this.querySelector("#idPoke");
  pokemonModalId.textContent = idPokemon.textContent;

  let type = this.classList[2];

  pokemonModalElement.setAttribute("typePokemonModal", type);

  let modalIcon = pokemonModalIcon.querySelector("img");
  modalIcon.setAttribute("src", `./img/icon-types/${type}.svg`);

  let altPokemon = this.querySelector(".icon");
  let altIcon = altPokemon.querySelector("img");

  modalIcon.setAttribute("alt", altIcon.getAttribute("alt"));

  pokemonModalCry.setAttribute(
    "src",
    `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${codePokemon}.ogg`
  );

  Api.get(`pokemon/${codePokemon}`).then((res) => {
    const data = res.data;
    const { types } = res.data;

    let myAbilities = [];
    let abilitiesBR = [];

    let myTypes = [];
    let myTypeNames = [];
    let typesBR = [];

    for (let i = 0; i < data.abilities.length; i++) {
      const ability = data.abilities[i].ability.url;
      myAbilities.push(ability);
    }

    myAbilities.forEach((ability) => {
      const abilityBR = parseSkillBR(ability);
      abilitiesBR.push(abilityBR);
    });

    for (let i = 0; i < types.length; i++) {
      const typeURL = types[i].type.url;
      const typeName = types[i].type.name;
      myTypes.push(typeURL);
      myTypeNames.push(typeName);
    }

    myTypes.forEach((type) => {
      const typeBR = parseTypeBR(type);
      typesBR.push(typeBR.trim());
    });

    let infoPokemonBR = {
      abilitiesBR,
      typesBR,
      height: data.height / 10,
      weight: data.weight / 10,
      stats: data.stats,
      namesTypes: myTypeNames,
    };

    function listTypesOfPokemon() {
      pokemonModalTypes.innerHTML = "";
      pokemonModalAbility.innerHTML = "";

      const spanHeader = document.createElement('span')
      spanHeader.textContent='Habilidades'
      pokemonModalAbility.appendChild(spanHeader)

      const arrayTypes = infoPokemonBR.namesTypes;
      const arrayAbilities = infoPokemonBR.abilitiesBR;

      for (let i = 0; i < arrayTypes.length; i++) {
        const itemList = document.createElement("li");

        const spanList = document.createElement("span");
        spanList.classList = `tag-type ${arrayTypes[i]}`;
        spanList.textContent = typesBR[i];

        itemList.appendChild(spanList);

        pokemonModalTypes.appendChild(itemList);
      }

      for (let i = 0; i < arrayAbilities.length; i++) {
        let strongEl = document.createElement("strong");
        strongEl.textContent = arrayAbilities[i];
        strongEl.classList = `tag-type ${arrayTypes[0]}`;

        pokemonModalAbility.appendChild(strongEl);
      }
    }

    function listPokemonWeaknesses() {
      pokemonModalWeaknesses.innerHTML = "";

      const arrayTipes = infoPokemonBR.namesTypes;

      for (let i = 0; i < arrayTipes.length; i++) {
        Api.get(`type/${arrayTipes[i]}`).then((res) => {
          const weaknesses = res.data.damage_relations.double_damage_from;

          for (let j = 0; j < weaknesses.length; j++) {
            const itemList = document.createElement("li");

            const spanList = document.createElement("span");
            spanList.classList = `tag-type ${weaknesses[j].name}`;
            spanList.textContent = parseTypeBR(weaknesses[j].url);

            itemList.appendChild(spanList);

            pokemonModalWeaknesses.appendChild(itemList);
          }
        });
      }
    }

    listTypesOfPokemon();
    listPokemonWeaknesses();

    pokemonModalHeight.textContent = `${infoPokemonBR.height} m`;
    pokemonModalWeight.textContent = `${infoPokemonBR.weight} kg`;

    pokemonModalStatsHP.style.width = `${infoPokemonBR.stats[0].base_stat}%`
    pokemonModalStatsATK.style.width = `${infoPokemonBR.stats[1].base_stat}%`
    pokemonModalStatsDEF.style.width = `${infoPokemonBR.stats[2].base_stat}%`
    pokemonModalStatsSPATK.style.width = `${infoPokemonBR.stats[3].base_stat}%`
    pokemonModalStatsSPDEF.style.width = `${infoPokemonBR.stats[4].base_stat}%`
    pokemonModalStatsSPD.style.width = `${infoPokemonBR.stats[5].base_stat}%`
  });
}

function closeDetailsPokemon() {
  document.documentElement.classList.remove("open-modal");
}

const createCardPokemon = (infoCard) => {
  const { name, id, sprite, spriteReserva, typeBR, type } = infoCard;

  const card = document.createElement("button");
  card.classList = `card-pokemon js-open-pokemon-details ${type}`;
  card.setAttribute("idPoke", id);

  const image = document.createElement("div");
  image.classList = "image";

  card.appendChild(image);

  const imagePoke = document.createElement("img");
  imagePoke.className = "thumb-img";

  if (sprite) {
    imagePoke.setAttribute("src", sprite);
  } else {
    imagePoke.setAttribute("src", spriteReserva);
  }

  image.appendChild(imagePoke);

  const info = document.createElement("div");
  info.classList = "info";

  const txt = document.createElement("div");
  txt.classList = "txt";

  const idPoke = document.createElement("span");

  if (id < 10) {
    idPoke.textContent = `#00${id}`;
  } else if (id < 100) {
    idPoke.textContent = `#0${id}`;
  } else {
    idPoke.textContent = `#${id}`;
  }

  const namePoke = document.createElement("h3");
  namePoke.setAttribute("id", "namePoke");
  namePoke.textContent = `${name}`;

  idPoke.setAttribute("id", "idPoke");

  txt.append(idPoke, namePoke);

  info.appendChild(txt);

  const icon = document.createElement("div");
  icon.classList = "icon";

  const imageType = document.createElement("img");
  imageType.setAttribute("src", `./img/icon-types/${type}.svg`);
  imageType.setAttribute("alt", `Ícone ${typeBR}`);

  icon.appendChild(imageType);
  info.appendChild(icon);

  card.appendChild(info);

  pokemonArea.appendChild(card);
};

const createPokemonTypes = (typeFilter) => {
  const { name, url, nameBR } = typeFilter;

  const listItem = document.createElement("li");

  const idType = Number(url.split("/")[6]);

  if (idType !== 10001 && idType !== 10002) {
    const typeButton = document.createElement("button");
    typeButton.classList = `type-filter ${name}`;

    const icon = document.createElement("div");
    icon.classList = "icon";
    typeButton.appendChild(icon);

    const imagePoke = document.createElement("img");

    const svgPath = `./img/icon-types/${name}.svg`;

    imagePoke.setAttribute("src", svgPath);

    imagePoke.setAttribute("alt", nameBR);

    pokemonArea.appendChild(typeButton);

    icon.appendChild(imagePoke);

    const span = document.createElement("span");
    span.textContent = nameBR;

    typeButton.appendChild(icon);
    typeButton.appendChild(span);

    typeButton.addEventListener("click", (event) =>
      filterByTypes(event, idType)
    );
    listItem.appendChild(typeButton);

    typeArea.appendChild(listItem);

    // mobile
    let itemTypeMobile = document.createElement("li");

    const typeButtonMobile = document.createElement("button");
    typeButtonMobile.classList = `type-filter ${name}`;

    const iconMobile = document.createElement("div");
    iconMobile.classList = "icon";

    const imagePokeMobile = document.createElement("img");
    imagePokeMobile.setAttribute("src", svgPath);
    imagePokeMobile.setAttribute("alt", nameBR);
    iconMobile.appendChild(imagePokeMobile);

    const spanMobile = document.createElement("span");
    spanMobile.textContent = nameBR;

    typeButtonMobile.appendChild(iconMobile);
    typeButtonMobile.appendChild(spanMobile);

    itemTypeMobile.appendChild(typeButtonMobile);
    typeAreaMobile.appendChild(itemTypeMobile);

    itemTypeMobile.addEventListener("click", (event) =>
      filterByTypes(event, idType)
    );
  }
};

const listPokemon = async (urlAPI) => {
  await Api.get(urlAPI).then((res) => {
    const { count, results } = res.data;
    pokemonCounter.textContent = count;

    // Sort the array of Pokémon IDs
    results.sort((a, b) => a.id - b.id);

    results.forEach((pokemon) => {
      const urlAPIDetails = pokemon.url;
      axios({
        method: "GET",
        url: urlAPIDetails,
      }).then((res) => {
        const { id, sprites, types } = res.data;

        let name = parseNameBR(id);

        if (!name) {
          name = capitalizeFirstLetter(pokemon.name);
        }

        const typeBR = parseTypeBR(types);

        const infoCard = {
          name,
          id,
          sprite: sprites.other.dream_world.front_default,
          spriteReserva: sprites.front_default,
          type: types[0].type.name,
          typeBR,
        };

        createCardPokemon(infoCard);

        const cardsPokemon = document.querySelectorAll(
          ".js-open-pokemon-details"
        );

        cardsPokemon.forEach((card) => {
          card.addEventListener("click", openDetailsPokemon);
        });

        const closeModal = document.querySelectorAll(".close-modal");

        if (closeModal) {
          closeModal.forEach((close) => {
            close.addEventListener("click", closeDetailsPokemon);
          });
        }
      });
    });
  });
};

const listPokemonTypes = async (urlAPI) => {
  await Api.get(urlAPI).then((res) => {
    const { count, results } = res.data;

    document.getElementById("js-count-types").textContent = count;
    results.forEach((type) => {
      const { name, url } = type;
      const nameBR = parseTypeBR(type.url);

      const typeFilter = {
        name,
        url,
        nameBR,
      };

      createPokemonTypes(typeFilter);
    });
  });
};

const filterByTypes = async (event, idType) => {
  if (idType) {
    try {
      const topSection = sectionAllInfoPokemon.offsetTop;
      window.scrollTo({
        top: topSection + 288,
        behavior: "smooth",
      });

      const allTypes = document.querySelectorAll(".type-filter");
      allTypes.forEach((type) => {
        type.classList.remove("active");
      });

      event.currentTarget.classList.add("active");
      activeTypeNameMobile.textContent =
        event.currentTarget.querySelector("span").textContent;
      removeDropdown.classList.remove("active");

      pokemonArea.innerHTML = "";
      btnLoadMore.style.display = "none";

      Api.get(`type/${idType}`).then((res) => {
        const { pokemon } = res.data;
        pokemonCounter.textContent = pokemon.length;

        pokemon.forEach((poke) => {
          const { url } = poke.pokemon;
          axios({
            method: "GET",
            url: `${url}`,
          }).then((res) => {
            const { id, sprites, types } = res.data;

            let name = parseNameBR(id);

            if (!name) {
              name = capitalizeFirstLetter(res.data.name);
            }

            const typeBR = parseTypeBR(types);

            const infoCard = {
              name,
              id,
              sprite: sprites.other.dream_world.front_default,
              spriteReserva: sprites.front_default,
              urlAPIDetails: url,
              type: types[0].type.name,
              typeBR,
            };

            createCardPokemon(infoCard);

            const cardsPokemon = document.querySelectorAll(
              ".js-open-pokemon-details"
            );

            cardsPokemon.forEach((card) => {
              card.addEventListener("click", openDetailsPokemon);
            });

            const closeModal = document.querySelectorAll(".close-modal");

            if (closeModal) {
              closeModal.forEach((close) => {
                close.addEventListener("click", closeDetailsPokemon);
              });
            }
          });
        });
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    const topSection = sectionAllInfoPokemon.offsetTop;
    window.scrollTo({
      top: topSection + 288,
      behavior: "smooth",
    });

    const allTypes = document.querySelectorAll(".type-filter");
    allTypes.forEach((type) => {
      type.classList.remove("active");
    });

    typeAllButton.forEach(allTypeButtons=>{
      allTypeButtons.classList.add("active");
    })

    removeDropdown.classList.remove("active");

    activeTypeNameMobile.textContent = "Todos"

    pokemonArea.innerHTML = "";

    countPagination = 0;

    btnLoadMore.style.display = "block";

    listPokemon(`pokemon/?limit=${limit}&offset=${countPagination}`);

    countPagination++;
  }
};

listPokemon(`pokemon/?limit=${limit}&offset=${countPagination}`);
countPagination++;

listPokemonTypes("type/");

const loadMorePokemon = () => {
  const offset = countPagination * limit;
  listPokemon(`pokemon/?limit=${limit}&offset=${offset}`);

  countPagination++;
};

btnLoadMore.addEventListener("click", loadMorePokemon);

const searchPokemon = () => {
  let valueInput = inputSearch.value.toLowerCase();

  if (!valueInput) {
    alert("Digite alguma coisa na busca.");
    pokemonArea.innerHTML = "";

    countPagination = 0;
    listPokemon(`pokemon/?limit=${limit}&offset=${countPagination}`);
    countPagination++;

    const allTypes = document.querySelectorAll(".type-filter");
      allTypes.forEach((type) => {
        type.classList.remove("active");
      });

    typeAllButton.forEach(allTypeButtons=>{
      allTypeButtons.classList.add("active");
    })
    activeTypeNameMobile.textContent="Todos"

    btnLoadMore.style.display = "block";
  } else {
    let englishName = valueInput;

    // Check if the input matches a Brazilian name
    for (let key in dadosNomesPokemon) {
      if (key !== "ID") {
        const pokemonName = dadosNomesPokemon[key].toLowerCase().trim();
        if (pokemonName === valueInput) {
          englishName = key;
          break; // Exit the loop once a match is found
        }
      }
    }

    Api.get(`pokemon/${englishName}`)
      .then((res) => {
        const allTypes = document.querySelectorAll(".type-filter");

        allTypes.forEach((type) => {
          type.classList.remove("active");
        });

        pokemonArea.innerHTML = "";
        btnLoadMore.style.display = "none";

        pokemonCounter.textContent = 1;

        const { id, sprites, types } = res.data;

        let name = parseNameBR(id);

        if (!name) {
          name = capitalizeFirstLetter(pokemon.name);
        }

        const typeBR = parseTypeBR(types);

        const urlAPIDetails = `pokemon/${englishName}`;

        const infoCard = {
          name,
          id,
          sprite: sprites.other.dream_world.front_default,
          spriteReserva: sprites.front_default,
          urlAPIDetails,
          type: types[0].type.name,
          typeBR,
        };

        createCardPokemon(infoCard);

        const cardsPokemon = document.querySelectorAll(
          ".js-open-pokemon-details"
        );

        cardsPokemon.forEach((card) => {
          card.addEventListener("click", openDetailsPokemon);
        });

        const closeModal = document.querySelectorAll(".close-modal");

        if (closeModal) {
          closeModal.forEach((close) => {
            close.addEventListener("click", closeDetailsPokemon);
          });
        }
      })
      .catch((err) => {
        alert("Pokémon não encontrado.");
      });
  }
};

btnSearch.addEventListener("click", searchPokemon);
inputSearch.addEventListener("keyup", (event) => {
  if (event.code === "Enter" || event.code === "NumpadEnter") {
    searchPokemon();
  }
});
