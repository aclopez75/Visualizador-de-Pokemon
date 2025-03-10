'use strict';

// Función asincrónica para obtener datos del Pokémon de la API.
async function fetchPokemon(pokemonName) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
        if (!response.ok) {
            throw new Error("We haven't found any Pokemon with that name in our database.");
        }
        const data = await response.json();
        displayPokemon(data);

    } catch (error) {
        console.log(error.message);
        // Puedes descomentar la siguiente línea para mostrar un mensaje de error
        // alert("We haven't found any Pokemon with that name in our database.");
    }
}

// Función para mostrar la información del Pokémon.
function displayPokemon(data) {
    const pokemonInfo = document.getElementById('container-card');

    pokemonInfo.innerHTML = `
        <div id="pokemonData">
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <img src="${data.sprites.back_default}" alt="${data.name}">
        </div>
        <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
        <p><strong>Peso:</strong> ${data.weight}</p>
        <p><strong>Altura:</strong> ${data.height}</p>
        <p><strong>Tipos:</strong> ${data.types.map(type => type.type.name).join(', ')}</p>
        <p><strong>Estadísticas:</strong></p>
        <ul>
            ${data.stats.map(stat => 
                <li><strong>${stat.stat.name}:</strong> ${stat.base_stat}</li>
            ).join('')}
        </ul>
    `;
}