//Get elements by ... 
const pokeList = document.getElementById('pokeList');


// Links and useful stuff
// const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
// Limit entries variant url
// const url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
//URL with just bulbasaur
const url = 'https://pokeapi.co/api/v2/pokemon/7'
getPokemon();

async function getPokemon() {
    const response = await fetch(url);
    const pokemon = await response.json();

    // const pokeInfo = pokemon.map((poke) => {
    //     const pokemonName = pokemon.name
    //     const pokemonId = pokemon.id       
    // })

    const pokemonName = pokemon.name
    const pokemonId = pokemon.id 
    const pokeType1 = pokemon.types[0]?.type.name
    const pokeType2 = pokemon.types[1]?.type.name || "";

    console.log(pokemonId, pokemonName, pokeType1, pokeType2);
}
