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