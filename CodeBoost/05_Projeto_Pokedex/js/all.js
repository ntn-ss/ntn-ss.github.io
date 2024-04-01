const playPauseButton=document.getElementById("playPauseButton"),audio=document.getElementById("js-pokemon-modal-cry");playPauseButton.addEventListener("click",function(){audio.paused?(audio.play(),playPauseButton.classList.remove("play"),playPauseButton.classList.add("pause")):(audio.pause(),playPauseButton.classList.remove("pause"),playPauseButton.classList.add("play"))}),audio.addEventListener("ended",function(){playPauseButton.classList.remove("pause"),playPauseButton.classList.add("play")});const Api=axios.create({baseURL:"https://pokeapi.co/api/v2/"}),pokemonArea=document.getElementById("js-list-pokemon"),typeArea=document.getElementById("js-list-types"),typeAreaMobile=document.querySelector(".dropdown-select"),pokemonCounter=document.getElementById("js-count-pokemon"),typeAllButton=document.getElementById("special-button"),sectionAllInfoPokemon=document.querySelector(".s-all-info-pokemon"),btnLoadMore=document.getElementById("js-btn-load-more"),inputSearch=document.getElementById("js-input-search"),btnSearch=document.getElementById("js-btn-search"),pokemonModalImage=document.getElementById("js-pokemon-modal-image"),pokemonModalName=document.getElementById("js-pokemon-modal-name"),pokemonModalId=document.getElementById("js-pokemon-modal-id"),pokemonModalElement=document.getElementById("js-pokemon-modal-element"),pokemonModalIcon=document.getElementById("js-pokemon-modal-icon"),pokemonModalCry=document.getElementById("js-pokemon-modal-cry"),pokemonModalTypes=document.getElementById("js-show-types"),pokemonModalHeight=document.getElementById("js-pokemon-height"),pokemonModalWeight=document.getElementById("js-pokemon-weight"),pokemonModalAbility=document.getElementById("js-pokemon-abilities"),pokemonModalWeaknesses=document.getElementById("js-pokemon-weaknesses"),pokemonModalStatsHP=document.getElementById("js-modal-stats-hp"),pokemonModalStatsATK=document.getElementById("js-modal-stats-atk"),pokemonModalStatsDEF=document.getElementById("js-modal-stats-def"),pokemonModalStatsSPATK=document.getElementById("js-modal-stats-sp-atk"),pokemonModalStatsSPDEF=document.getElementById("js-modal-stats-sp-def"),pokemonModalStatsSPD=document.getElementById("js-modal-stats-spd"),activeTypeNameMobile=document.getElementById("js-active-type-name-mobile"),removeDropdown=document.getElementById("js-remove-dropdown");let countPagination=0;const limit=151;typeAllButton.addEventListener("click",e=>filterByTypes(e));const parseNameBR=e=>dadosNomesPokemon[e]||!1,parseSkillBR=e=>{e=e.split("/")[6];return dadosHabilidadesPokemon[e].trim()},parseTypeBR=e=>{if(e[0].type)return dadosTiposPokemon[e[0].type.url.split("/")[6]];e=e.split("/")[6];return dadosTiposPokemon[e]},capitalizeFirstLetter=e=>""+e.charAt(0).toUpperCase()+e.slice(1,e.length);function openDetailsPokemon(){document.documentElement.classList.add("open-modal");var e=this.getAttribute("idPoke");let t=this.querySelector(".thumb-img");var o=t.getAttribute("src");pokemonModalImage.setAttribute("src",o);o=this.querySelector("#namePoke");pokemonModalName.textContent=o.textContent;o=this.querySelector("#idPoke");pokemonModalId.textContent=o.textContent;o=this.classList[2];pokemonModalElement.setAttribute("typePokemonModal",o);let n=pokemonModalIcon.querySelector("img");n.setAttribute("src",`./img/icon-types/${o}.svg`);let a=this.querySelector(".icon"),s=a.querySelector("img");n.setAttribute("alt",s.getAttribute("alt")),pokemonModalCry.setAttribute("src",`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${e}.ogg`),Api.get("pokemon/"+e).then(e=>{var t=e.data,o=e.data["types"];let n=[],a=[],s=[],l=[],i=[];for(let e=0;e<t.abilities.length;e++){var d=t.abilities[e].ability.url;n.push(d)}n.forEach(e=>{e=parseSkillBR(e);a.push(e)});for(let e=0;e<o.length;e++){var m=o[e].type.url,r=o[e].type.name;s.push(m),l.push(r)}s.forEach(e=>{const t=parseTypeBR(e);i.push(t.trim())});let c={abilitiesBR:a,typesBR:i,height:t.height/10,weight:t.weight/10,stats:t.stats,namesTypes:l};!function(){pokemonModalTypes.innerHTML="",pokemonModalAbility.innerHTML="";var o=c.namesTypes,n=c.abilitiesBR;for(let e=0;e<o.length;e++){const t=document.createElement("li"),a=document.createElement("span");a.classList="tag-type "+o[e],a.textContent=i[e],t.appendChild(a),pokemonModalTypes.appendChild(t)}for(let t=0;t<n.length;t++){let e=document.createElement("strong");e.textContent=n[t],e.classList="tag-type "+o[0],pokemonModalAbility.appendChild(e)}}(),function(){pokemonModalWeaknesses.innerHTML="";var t=c.namesTypes;for(let e=0;e<t.length;e++)Api.get("type/"+t[e]).then(e=>{var t=e.data.damage_relations.double_damage_from;for(let e=0;e<t.length;e++){const o=document.createElement("li"),n=document.createElement("span");n.classList="tag-type "+t[e].name,n.textContent=parseTypeBR(t[e].url),o.appendChild(n),pokemonModalWeaknesses.appendChild(o)}})}(),pokemonModalHeight.textContent=c.height+" m",pokemonModalWeight.textContent=c.weight+" kg",pokemonModalStatsHP.style.width=c.stats[0].base_stat+"%",pokemonModalStatsATK.style.width=c.stats[1].base_stat+"%",pokemonModalStatsDEF.style.width=c.stats[2].base_stat+"%",pokemonModalStatsSPATK.style.width=c.stats[3].base_stat+"%",pokemonModalStatsSPDEF.style.width=c.stats[4].base_stat+"%",pokemonModalStatsSPD.style.width=c.stats[5].base_stat+"%"})}function closeDetailsPokemon(){document.documentElement.classList.remove("open-modal")}const createCardPokemon=e=>{var{name:t,id:o,sprite:n,spriteReserva:a,typeBR:s,type:e}=e;const l=document.createElement("button");l.classList="card-pokemon js-open-pokemon-details "+e,l.setAttribute("idPoke",o);const i=document.createElement("div");i.classList="image",l.appendChild(i);const d=document.createElement("img");d.className="thumb-img",n?d.setAttribute("src",n):d.setAttribute("src",a),i.appendChild(d);const m=document.createElement("div");m.classList="info";const r=document.createElement("div");r.classList="txt";const c=document.createElement("span");c.textContent=o<10?"#00"+o:o<100?"#0"+o:"#"+o;const p=document.createElement("h3");p.setAttribute("id","namePoke"),p.textContent=""+t,c.setAttribute("id","idPoke"),r.append(c,p),m.appendChild(r);const u=document.createElement("div");u.classList="icon";const y=document.createElement("img");y.setAttribute("src",`./img/icon-types/${e}.svg`),y.setAttribute("alt","Ícone "+s),u.appendChild(y),m.appendChild(u),l.appendChild(m),pokemonArea.appendChild(l)},createPokemonTypes=t=>{const{name:o,url:e,nameBR:n}=t,a=document.createElement("li"),s=Number(e.split("/")[6]);if(10001!==s&&10002!==s){const l=document.createElement("button");l.classList="type-filter "+o;const i=document.createElement("div");i.classList="icon",l.appendChild(i);const d=document.createElement("img");t=`./img/icon-types/${o}.svg`;d.setAttribute("src",t),d.setAttribute("alt",n),pokemonArea.appendChild(l),i.appendChild(d);const m=document.createElement("span");m.textContent=n,l.appendChild(i),l.appendChild(m),l.addEventListener("click",e=>filterByTypes(e,s)),a.appendChild(l),typeArea.appendChild(a);let e=document.createElement("li");const r=document.createElement("button");r.classList="type-filter "+o;const c=document.createElement("div");c.classList="icon";const p=document.createElement("img");p.setAttribute("src",t),p.setAttribute("alt",n),c.appendChild(p);const u=document.createElement("span");u.textContent=n,r.appendChild(c),r.appendChild(u),e.appendChild(r),typeAreaMobile.appendChild(e),e.addEventListener("click",e=>filterByTypes(e,s))}},listPokemon=async e=>{await Api.get(e).then(e=>{const{count:t,results:o}=e.data;pokemonCounter.textContent=t,o.sort((e,t)=>e.id-t.id),o.forEach(i=>{var e=i.url;axios({method:"GET",url:e}).then(e=>{var{id:t,sprites:o,types:n}=e.data;let a=parseNameBR(t);a=a||capitalizeFirstLetter(i.name);e=parseTypeBR(n),e={name:a,id:t,sprite:o.other.dream_world.front_default,spriteReserva:o.front_default,type:n[0].type.name,typeBR:e};createCardPokemon(e);const s=document.querySelectorAll(".js-open-pokemon-details");s.forEach(e=>{e.addEventListener("click",openDetailsPokemon)});const l=document.querySelectorAll(".close-modal");l&&l.forEach(e=>{e.addEventListener("click",closeDetailsPokemon)})})})})},listPokemonTypes=async e=>{await Api.get(e).then(e=>{const{count:t,results:o}=e.data;document.getElementById("js-count-types").textContent=t,o.forEach(e=>{var{name:t,url:o}=e,e={name:t,url:o,nameBR:parseTypeBR(e.url)};createPokemonTypes(e)})})},filterByTypes=async(e,t)=>{if(t)try{var o=sectionAllInfoPokemon.offsetTop;window.scrollTo({top:o+288,behavior:"smooth"});const n=document.querySelectorAll(".type-filter");n.forEach(e=>{e.classList.remove("active")}),e.currentTarget.classList.add("active"),activeTypeNameMobile.textContent=e.currentTarget.querySelector("span").textContent,removeDropdown.classList.remove("active"),pokemonArea.innerHTML="",btnLoadMore.style.display="none",Api.get("type/"+t).then(e=>{const t=e.data["pokemon"];pokemonCounter.textContent=t.length,t.forEach(e=>{const i=e.pokemon["url"];axios({method:"GET",url:""+i}).then(e=>{var{id:t,sprites:o,types:n}=e.data;let a=parseNameBR(t);a=a||capitalizeFirstLetter(e.data.name);e=parseTypeBR(n),e={name:a,id:t,sprite:o.other.dream_world.front_default,spriteReserva:o.front_default,urlAPIDetails:i,type:n[0].type.name,typeBR:e};createCardPokemon(e);const s=document.querySelectorAll(".js-open-pokemon-details");s.forEach(e=>{e.addEventListener("click",openDetailsPokemon)});const l=document.querySelectorAll(".close-modal");l&&l.forEach(e=>{e.addEventListener("click",closeDetailsPokemon)})})})})}catch(e){console.error(e)}else{t=sectionAllInfoPokemon.offsetTop;window.scrollTo({top:t+288,behavior:"smooth"});const a=document.querySelectorAll(".type-filter");a.forEach(e=>{e.classList.remove("active")}),e.currentTarget.classList.add("active"),pokemonArea.innerHTML="",countPagination=0,btnLoadMore.style.display="block",listPokemon(`pokemon/?limit=${limit}&offset=`+countPagination),countPagination++}};listPokemon(`pokemon/?limit=${limit}&offset=`+countPagination),countPagination++,listPokemonTypes("type/");const loadMorePokemon=()=>{var e=countPagination*limit;listPokemon(`pokemon/?limit=${limit}&offset=`+e),countPagination++};btnLoadMore.addEventListener("click",loadMorePokemon);const searchPokemon=()=>{var e=inputSearch.value.toLowerCase();if(e){let m=e;for(var t in dadosNomesPokemon)if("ID"!==t)if(dadosNomesPokemon[t].toLowerCase().trim()===e){m=t;break}Api.get("pokemon/"+m).then(e=>{const t=document.querySelectorAll(".type-filter");t.forEach(e=>{e.classList.remove("active")}),pokemonArea.innerHTML="",btnLoadMore.style.display="none",pokemonCounter.textContent=1;var{id:o,sprites:n,types:a}=e.data;let s=parseNameBR(o);s=s||capitalizeFirstLetter(pokemon.name);var l=parseTypeBR(a),e="pokemon/"+m,l={name:s,id:o,sprite:n.other.dream_world.front_default,spriteReserva:n.front_default,urlAPIDetails:e,type:a[0].type.name,typeBR:l};createCardPokemon(l);const i=document.querySelectorAll(".js-open-pokemon-details");i.forEach(e=>{e.addEventListener("click",openDetailsPokemon)});const d=document.querySelectorAll(".close-modal");d&&d.forEach(e=>{e.addEventListener("click",closeDetailsPokemon)})}).catch(e=>{alert("Pokémon não encontrado.")})}else alert("Digite alguma coisa na busca."),pokemonArea.innerHTML="",countPagination=0,listPokemon(`pokemon/?limit=${limit}&offset=`+countPagination),countPagination++,typeAllButton.classList.add("active"),btnLoadMore.style.display="block"};btnSearch.addEventListener("click",searchPokemon),inputSearch.addEventListener("keyup",e=>{"Enter"!==e.code&&"NumpadEnter"!==e.code||searchPokemon()});var slide_hero=new Swiper(".slide-hero",{effect:"fade",pagination:{el:".slide-hero .area-explore .swiper-pagination"}});const btnDropdownSelect=document.querySelector(".js-open-select-custom");btnDropdownSelect&&btnDropdownSelect.addEventListener("click",()=>{btnDropdownSelect.parentElement.classList.toggle("active")});