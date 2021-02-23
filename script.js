let headerBg = document.querySelector('.card');
let content = document.querySelector('.content');
let aboutContent = document.querySelector('.about-content');
let aboutContentRight = document.querySelector('.about-content-right');
let statContent = document.querySelector('.stat-content');
let evoContent = document.querySelector('.evo-content');
let moveContent = document.querySelector('.moves-content');
let pokelist = document.querySelector('.pokelist');
let name = document.querySelector('h2');
let img = document.querySelector('.pokemon-image');
let type = document.querySelector('.type-one');
let type2 = document.querySelector('.type-two');
let gen = document.querySelector('.gen-pokemon');
let weight = document.querySelector('.weight-pokemon');
let height = document.querySelector('.height-pokemon');
let ability = document.querySelector('.ability-pokemon');
let habitat = document.querySelector('.habitat-pokemon');
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
let moveList = document.querySelector('.moves-list');
let moveBox = document.querySelector('.moves-box');


fetchPokemon();
// fetch pokemon list
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

// fetch pokemon data
function pokeData(url) {
    fetch(url)
        .then(res => res.json())
        .then(function(pokemon) {
            let species = pokemon['species']['url'];
            let t2 = pokemon['types']['1'];
            name.textContent = pokemon['name'];
            img.src = pokemon['sprites']['front_default'];
            type.textContent = pokemon['types']['0']['type']['name'];
            if (t2) {
                type2.classList.remove('none');
                type2.textContent = pokemon['types']['1']['type']['name'];
            } else
                type2.classList.add('none');
            id.textContent = pokemon['id'];
            weight.textContent = pokemon['weight'] + 'cm';
            height.textContent = pokemon['height'] + 'kg';
            ability.textContent = pokemon['abilities']['0']['ability']['name'] + ', ' + pokemon['abilities']['1']['ability']['name'];
            fillHp.style.width = `${pokemon['stats']['0']['base_stat']}%`;
            fillat.style.width = `${pokemon['stats']['1']['base_stat']}%`;
            filldf.style.width = `${pokemon['stats']['2']['base_stat']}%`;
            fillsa.style.width = `${pokemon['stats']['3']['base_stat']}%`;
            fillsd.style.width = `${pokemon['stats']['4']['base_stat']}%`;
            fillspd.style.width = `${pokemon['stats']['5']['base_stat']}%`;
            fetchSpecies(species);

            // fetch pokemon species
            function fetchSpecies(species) {
                fetch(species)
                    .then(res => res.json())
                    .then(function(species) {
                        let evo = species['evolution_chain']['url'];
                        gen.textContent = species['generation']['name'];
                        habitat.textContent = species['habitat']['name'];
                        fetchEvo(evo);
                    })

            }

            // fetch pokemon evo
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
                    })
            }

            let moves = pokemon['moves'];
            moves.forEach(move => {
                let moveUrl = move['move']['url'];
                fetchMove(moveUrl);
            })

            // fetch pokemon move
            function fetchMove(url) {
                fetch(url)
                    .then(res => res.json())
                    .then(function(move) {
                        moveList.insertAdjacentHTML('beforeend', `
                        <li class="moves-detail"> ${move['name']} <span>${move['power']}</span> </li>`);
                    })
            }
        })
}

function about() {
    statContent.classList.add('none');
    evoContent.classList.add('none');
    moveContent.classList.add('none');
    aboutContent.classList.remove('none');
    aboutContentRight.classList.remove('none');
}

function stat() {
    aboutContent.classList.add('none');
    aboutContentRight.classList.add('none');
    evoContent.classList.add('none');
    moveContent.classList.add('none');
    statContent.classList.remove('none');
}

function evo() {
    aboutContent.classList.add('none');
    aboutContentRight.classList.add('none');
    statContent.classList.add('none');
    moveContent.classList.add('none');
    evoContent.classList.remove('none');
}

function move() {
    aboutContent.classList.add('none');
    aboutContentRight.classList.add('none');
    statContent.classList.add('none');
    evoContent.classList.add('none');
    moveContent.classList.remove('none');
}