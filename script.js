"use strict";

// Función asincrónica para obtener datos del Pokémon de la API.
async function fetchPokemon(pokemonName) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
    );
    if (!response.ok) {
      throw new Error(
        "We haven't found any Pokemon with that name in our database."
      );
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
    pokemonInfo.style.display="flex";
    
    pokemonInfo.innerHTML = `
    <div id="container">
        <div id="pokemonImg">
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <img src="${data.sprites.back_default}" alt="${data.name}">
        </div>

        <div id="pokemonData">
            <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
            <p><strong>Weight:</strong> ${data.weight}</p>
            <p><strong>Height:</strong> ${data.height}</p>
            <p><strong>Types:</strong> ${data.types.map(type => type.type.name).join(', ')}</p>
        </div>
    </div>
    
      <div id="pokemonStats">
        <h3><strong>Base Stats</strong></h3>
        <div class="stats-container">
            ${data.stats.map(stat =>` 
                <div class="stat">
                    <p class="stat-name">${stat.stat.name}</p>
                    <p class="stat-value">${stat.base_stat}</p>
                </div>
            `).join('')}
        </div>
    </div>
    `;
}

// Función para iniciar la búsqueda cuando el usuario escribe un nombre de Pokémon.
document.getElementById("searchPokemon").addEventListener("input", function () {
  const pokemonName = this.value;

  if (pokemonName.length > 0) {
    fetchPokemon(pokemonName); // Realiza la búsqueda cada vez que el usuario escribe.
  } else {
    document.getElementById("container-card").innerHTML = ""; // Limpiar resultados si no hay búsqueda.
  }
});