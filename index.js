//First 151 pokemons
const genOne = 151;
const genTwo = 251;

//Get elements by ... 
const pokeList = document.getElementById('pokemon-container');


// Links and useful stuff
// const url = `https://pokeapi.co/api/v2/pokemon/${pokemon_limit}`;
// Limit entries variant url
// const url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
//URL with just bulbasaur
const url = 'https://pokeapi.co/api/v2/pokemon?limit=151'
getPokemon();


// const function loopThrough() {
//     getPokemon
// }

// async function getPokemon() {
//     const response = await fetch(url);
//     const json = await response.json();


//     const pokemonName = pokemon.name;
//     const pokemonId = pokemon.id; 
//     const pokeType1 = pokemon.types[0]?.type.name
//     const pokeType2 = pokemon.types[1]?.type.name || null;
//     const spriteNormal = pokemon.sprites?.front_default;
//     const spriteShiny = pokemon.sprites?.front_shiny;

//     console.log(pokemonId, pokemonName, pokeType1, pokeType2, spriteNormal, spriteShiny);
// }

async function getPokemon() {

    const response = await fetch(url);
    const json = await response.json();

    const pokemonInfo = await Promise.all(
        json.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url); 
            const details = await res.json();

            return {
                id: details.id,
                name: details.name,
                type1: details.types[0]?.type.name,
                type2: details.types[1]?.type.name || null,
                spriteNormal: details.sprites?.front_default,
                spriteShiny: details.sprites?.front_shiny,
            };
        })
    );

 
    pokemonInfo.forEach(({ id, name, spriteNormal, spriteShiny, type1, type2 }) => {
   
        //pokemon card
        const pokemonDiv = document.createElement("div");
        pokemonDiv.classList.add("pokemon");
        //pokemon dex id and name
        const dexName = document.createElement("div");
        dexName.classList.add("dexName")
            // Spans for name and ID
            const pkIdspan = document.createElement("span");
            pkIdspan.classList.add("number");
            pkIdspan.textContent = `#${id} ${name}`;
            const pkNameSpan = document.createElement("span")
            pkNameSpan.classList.add("name");
            // pkNameSpan.textContent = name;
            dexName.appendChild(pkIdspan);
            dexName.appendChild(pkNameSpan);

            pokemonDiv.appendChild(dexName)

        //image 
        const pokeImgContainer = document.createElement("div")
        pokeImgContainer.classList.add("imageContainer")
        const pokeImg = document.createElement("img")
        pokeImg.src = spriteNormal;
        pokeImg.alt = name;
        pokeImgContainer.appendChild(pokeImg)
        pokemonDiv.appendChild(pokeImgContainer)

        const typeDiv = document.createElement("div");
        typeDiv.classList.add("type");
        
        const pokeType = document.createElement("span");
        pokeType.classList.add("typeSpan");
        pokeType.textContent = type1;
        typeDiv.appendChild(pokeType)
        if(type2) {
            const pokeType1 = document.createElement("span");
            pokeType1.classList.add("typeSpan");
            pokeType1.textContent = type2;
            typeDiv.appendChild(pokeType1)
        }

        pokemonDiv.appendChild(typeDiv)
        pokeList.appendChild(pokemonDiv);
    });
}