const API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
const PAGE_SIZE = 10;
const pokemonNameContainer = document.getElementById('pokemon-container');

let canFetchName = true;
let afterID = null;
pokemonNameContainer.addEventListener('scroll', handleScroll());
fetchAndAppendPokemon();

function handleScroll(){
    const bottomSpaceLeftToScroll = (
        this.scrollHeight -
        this.scrollTop - 
        this.clientHeight
    );
    if (bottomSpaceLeftToScroll > 0) return;
    fetchAndAppendPokemon();
}

function fetchAndAppendPokemon(){
    canFetchName = false;
    const url = pokemonUrlCreator();
    fetch(url)
    .then(res => res.json())
    .then(({results,next }) => {
        const fragment = document.createDocumentFragment();
        results.forEach(({name}) => {
            fragment.appendChild(createPokemonNameElement(name));
        });
        pokemonNameContainer.appendChild(fragment);
        if (next) {
            afterID = results[results.length - 1].id;
        }else {
           pokemonNameContainer.removeEventListener('scroll' , handleScroll) 
        }
        canFetchName = true;
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

   if (afterID != null){
    url.searchParams.set('after', afterID)
   }
   return url
}
