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
let fillat = document.querySelector('.fill-attack');
let filldf = document.querySelector('.fill-defend');
let fillsa = document.querySelector('.fill-sa');
let fillsd = document.querySelector('.fill-sd');
let fillspd = document.querySelector('.fill-speed');
let evoInfo = document.querySelector('.evo-detail p');
let normalForm = document.querySelector('.normal-form .evo-detail h4');
let evoTypeOne = document.querySelector('.first-evo .evo-detail h4');
let evoTypeTwo = document.querySelector('.second-evo .evo-detail h4');
let moveList = document.querySelector('.moves');



/**
 * Fetches a pokemon.
 */
function fetchPokemon() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=6')
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
            // console.log(pokemon);
            let species = pokemon['species']['url'];
            // console.log(species);
            name.textContent = pokemon['name'];
            img.src = pokemon['sprites']['front_default'];
            type.textContent = pokemon['types']['0']['type']['name'];

            let t2 = pokemon['types']['1'];
            if (t2) {
                type2.classList.remove('none');
                type2.textContent = pokemon['types']['1']['type']['name'];
            } else 
            type2.classList.add('none');

            id.textContent = pokemon['id'];
            weight.textContent = pokemon['weight'] + 'cm';
            height.textContent = pokemon['height'] + 'kg';
            ability.textContent = pokemon['abilities']['0']['ability']['name'] + ', ' + pokemon['abilities']['1']['ability']['name']  ;

            fillHp.style.width = `${pokemon['stats']['0']['base_stat']}%`;
            fillat.style.width = `${pokemon['stats']['1']['base_stat']}%`;
            filldf.style.width = `${pokemon['stats']['2']['base_stat']}%`;
            fillsa.style.width = `${pokemon['stats']['3']['base_stat']}%`;
            fillsd.style.width = `${pokemon['stats']['4']['base_stat']}%`;
            fillspd.style.width = `${pokemon['stats']['5']['base_stat']}%`;

            // move
            let moves = pokemon['moves'];
            console.log(moves);
            moves.forEach(function(move) {
                moveList.insertAdjacentHTML('beforeend', `
                <li onclick=moveDetails('${move['move']['url']}'> ${move['move']['name']} </li>`);
            })

            // fetchEvo(id);
            fetchSpecies(species);

                function fetchSpecies(species) {
                    fetch(species)
                        .then(res => res.json())
                        .then(function(species) {
                            let evo = species['evolution_chain']['url'];
                            // console.log(evo);
                            fetchEvo(evo)
                        })

                }


                function fetchEvo(evo) {
                    fetch(evo)
                        .then(res => res.json())
                        .then(function(evo) {
                            let evolv = evo['chain'];
                            normalForm.textContent = evolv['species']['name'];
                            if (evolv['evolves_to']['0']) {
                                evoTypeOne.textContent = evolv['evolves_to']['0']['species']['name'];
                            } else evoTypeOne.classList.add('none');

                            if (evolv['evolves_to']['0']['evolves_to']['0']) {
                                document.querySelector('.second-evo').classList.remove('none');
                                evoTypeTwo.textContent = evolv['evolves_to']['0']['evolves_to']['0']['species']['name'];
                            } else document.querySelector('.second-evo').classList.add('none');

                            
                        
                            console.log(evolv);
                        })
                }
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

function openEvoContent(id) {
    evoContent.classList.remove('none');

}

// move
function move() {

}


