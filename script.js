let content = document.querySelector('.content');
let aboutContent = document.querySelector('.about-content');
let aboutContentRight = document.querySelector('.about-content-right');
let statContent = document.querySelector('.stat-content');
let evoContent = document.querySelector('.evo-content');
let pokelist = document.querySelector('.pokelist');
let name = document.querySelector('h2');
let img = document.querySelector('.pokemon-image');
let type = document.querySelector('.type-one');
let type2 = document.querySelector('.type-two');
let weight = document.querySelector('.weight-pokemon');
let height = document.querySelector('.height-pokemon');
let ability = document.querySelector('.ability-pokemon');
let id = document.querySelector('.id-pokemon');
let fillHp = document.querySelector('.fill-hp');



/**
 * Fetches a pokemon.
 */
function fetchPokemon() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=9')
        .then(response => response.json())
        .then(function(allpokemon) {
            let pokemons = allpokemon.results;
            pokemons.forEach(pokemon => {


                pokelist.insertAdjacentHTML('beforeend', `
    			<li onclick=pokeData('${pokemon['url']}')> ${pokemon['name']} </li>`);
            })
        })
}

fetchPokemon();

/**
 * { function_description }
 *
 * @param      {<type>}  url     The url
 */
function pokeData(url) {
    fetch(url)
        .then(res => res.json())
        .then(function(pokemon) {
            console.log(pokemon);
            name.textContent = pokemon['name'];
            img.src = pokemon['sprites']['front_default'];
            type.textContent = pokemon['types']['0']['type']['name'];

            let t2 = pokemon['types']['1'];
            if (!t2) {
                type2.classList.add('none');
            } else type2.textContent = pokemon['types']['1']['type']['name'];

            id.textContent = pokemon['id'];
            weight.textContent = pokemon['weight'] + 'cm';
            height.textContent = pokemon['height'] + 'kg';
            ability.textContent = pokemon['abilities']['0']['ability']['name'] + ', ' + pokemon['abilities']['1']['ability']['name']  ;

            fillHp.style.width = `${pokemon['stats']['0']['base_stat']}%`;
            fillat.style.width = `${pokemon['stats']['0']['base_stat']}%`;
            filldf.style.width = `${pokemon['stats']['0']['base_stat']}%`;
            fillspat.style.width = `${pokemon['stats']['0']['base_stat']}%`;
            fillspdf.style.width = `${pokemon['stats']['0']['base_stat']}%`;
            fillspd.style.width = `${pokemon['stats']['0']['base_stat']}%`;
        })
}


// about

function about() {
    statContent.classList.add('none');
    evoContent.classList.add('none');
    openAboutContent();
}

function openAboutContent() {
    aboutContent.classList.remove('none');
    aboutContentRight.classList.remove('none');
}


// stat

function stat() {
    aboutContent.classList.add('none');
    aboutContentRight.classList.add('none');
    evoContent.classList.add('none');
    openStatContent();
}

function openStatContent() {
    statContent.classList.remove('none');




}

// evo

function evo() {
    aboutContent.classList.add('none');
    aboutContentRight.classList.add('none');
    statContent.classList.add('none');
    openEvoContent();
}

function openEvoContent() {
    evoContent.classList.remove('none');

    fetch('https://pokeapi.co/api/v2/evolution-chain/1')
    .then(res => res.json())
    .then(function(evo) {
        let evolution = evo['chain']['evolves_to'];
        let level = evolution['0']['evolution_details']['0']['min_level'];
        console.log('evolution to ' + evolution['0']['evolves_to'][
            '0']['species']['name'] + ' at level ' + level);
    })
}


