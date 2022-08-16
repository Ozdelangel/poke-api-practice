const API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
const PAGE_SIZE = 10;
const pokemonNameContainer = document.getElementById('pokemon-container');

pokemonNameContainer.addEventListener('scroll', handleScroll);
fetchAndAppendPokemon();

function fetchAndAppendPokemon(){
    const url = pokemonUrlCreator();
    fetch(url)
    .then(res => res.json())
    .then(({results,next }) => {
        const fragment = document.createDocumentFragment();
        results.forEach(({name}) => {
            fragment.appendChild(createPokemonNameElement(name));
        });
        pokemonNameContainer.appendChild(fragment);
    });
}

function createPokemonNameElement(name) {
    const pokemonElement = document.createElement('p');
    pokemonElement.classList.add('pokemon-container');
    pokemonElement.textContent = name;
    return pokemonElement
}

function pokemonUrlCreator(){
   const url = new URL(API_BASE_URL); 
   url.searchParams.set('limit', PAGE_SIZE)
   return url
}
