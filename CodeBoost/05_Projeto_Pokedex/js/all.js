"use strict";var playPauseButton=document.getElementById("playPauseButton"),audio=document.getElementById("pokemonCry");playPauseButton.addEventListener("click",function(){audio.paused?(audio.play(),playPauseButton.classList.remove("play"),playPauseButton.classList.add("pause")):(audio.pause(),playPauseButton.classList.remove("pause"),playPauseButton.classList.add("play"))}),audio.addEventListener("ended",function(){playPauseButton.classList.remove("pause"),playPauseButton.classList.add("play")});var pokemonArea=document.getElementById("js-list-pokemon"),typeArea=document.getElementById("js-list-types"),typeAreaMobile=document.querySelector(".dropdown-select"),parseNameBR=function(e){return dadosNomesPokemon[e]||!1},parseTypeBR=function(e){if(e[0].type)return dadosTiposPokemon[e[0].type.url.split("/")[6]];e=e.split("/")[6];return dadosTiposPokemon[e]},capitalizeFirstLetter=function(e){return"".concat(e.charAt(0).toUpperCase()).concat(e.slice(1,e.length))},toggleDetailsPokemon=function(){document.documentElement.classList.toggle("open-modal")},createCardPokemon=function(e){var t=e.name,n=e.id,o=e.sprite,a=e.spriteReserva,i=(e.cry,e.urlAPIDetails,e.typeBR),s=e.type,c=document.createElement("button");c.classList="card-pokemon js-open-pokemon-details ".concat(s),pokemonArea.appendChild(c);var l=document.createElement("div");l.classList="image",c.appendChild(l);e=document.createElement("img");e.className="thumb-img",o?e.setAttribute("src",o):e.setAttribute("src",a),l.appendChild(e);a=document.createElement("div");a.classList="info";l=document.createElement("div");l.classList="txt";e=document.createElement("span");e.textContent=(n<10?"#00":n<100?"#0":"#").concat(n);n=document.createElement("h3");n.textContent="".concat(t),l.append(e,n),a.appendChild(l);n=document.createElement("div");n.classList="icon";l=document.createElement("img");l.setAttribute("src","../../img/icon-types/".concat(s,".svg")),l.setAttribute("alt",i),n.appendChild(l),a.appendChild(n),c.appendChild(a)},createPokemonTypes=function(e){var t,n,o=e.name,a=e.url,i=e.nameBR,s=document.createElement("li");10001!==Number(a.split("/")[6])&&10002!==Number(a.split("/")[6])&&((n=document.createElement("button")).classList="type-filter ".concat(o),(t=document.createElement("div")).classList="icon",n.appendChild(t),e=document.createElement("img"),a="../../img/icon-types/".concat(o,".svg"),e.setAttribute("src",a),e.setAttribute("alt",i),pokemonArea.appendChild(n),t.appendChild(e),(e=document.createElement("span")).textContent=i,n.appendChild(t),n.appendChild(e),s.appendChild(n),typeArea.appendChild(s),e=document.createElement("li"),(n=document.createElement("button")).classList="type-filter ".concat(o),(s=document.createElement("div")).classList="icon",(o=document.createElement("img")).setAttribute("src",a),o.setAttribute("alt",i),s.appendChild(o),(o=document.createElement("span")).textContent=i,n.appendChild(s),n.appendChild(o),e.appendChild(n),typeAreaMobile.appendChild(e))},listPokemon=function(e,t,n){axios({method:"GET",url:e,params:{limit:n,offset:t,order:"id"}}).then(function(e){var t=e.data,e=t.count,t=t.results;document.getElementById("js-count-pokemon").textContent=e,t.forEach(function(s){var c=s.url;axios({method:"GET",url:c}).then(function(e){var t=e.data,n=t.id,o=t.sprites,a=t.types,i=t.cries,e=(e=parseNameBR(n))||capitalizeFirstLetter(s.name),t=parseTypeBR(a),t={name:e,id:n,sprite:o.other.dream_world.front_default,spriteReserva:o.front_default,cry:i.latest,urlAPIDetails:c,type:a[0].type.name,typeBR:t};createCardPokemon(t),document.querySelectorAll(".js-open-pokemon-details").forEach(function(e){e.addEventListener("click",toggleDetailsPokemon)});t=document.querySelectorAll(".close-modal");t&&t.forEach(function(e){e.addEventListener("click",toggleDetailsPokemon)})})})})},listPokemonTypes=function(e){axios({method:"GET",url:e}).then(function(e){var t=e.data,e=t.count,t=t.results;document.getElementById("js-count-types").textContent=e,t.forEach(function(e){var t=e.name,n=e.url,e=parseTypeBR(e.url);createPokemonTypes({name:t,url:n,nameBR:e})})})},btnLoadMore=document.getElementById("js-btn-load-more"),countPagination=0,limit=30;listPokemon("https://pokeapi.co/api/v2/pokemon/?limit=".concat(limit,"&offset=").concat(countPagination)),countPagination++,listPokemonTypes("https://pokeapi.co/api/v2/type/");var loadMorePokemon=function(){listPokemon("https://pokeapi.co/api/v2/pokemon/",countPagination*limit,limit),countPagination++};btnLoadMore.addEventListener("click",loadMorePokemon);var slide_hero=new Swiper(".slide-hero",{effect:"fade",pagination:{el:".slide-hero .area-explore .swiper-pagination"}}),btnDropdownSelect=document.querySelector(".js-open-select-custom");btnDropdownSelect&&btnDropdownSelect.addEventListener("click",function(){btnDropdownSelect.parentElement.classList.toggle("active")});