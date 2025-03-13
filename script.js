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
    // alert("We haven't found any Pokemon with that name in our database.");
  }
}
// Funcion para llamar a la imágen de detrás

function getBackImg (pokemon){
  if(pokemon.sprites.back_default){
    return pokemon.sprites.back_default;
    } else{
      return './img/X1.png'
    }
}


// Función para mostrar la información del Pokémon.
function displayPokemon(data) {
  const pokemonInfo = document.getElementById('container-card');
  pokemonInfo.style.display = "flex";

  pokemonInfo.innerHTML = `
  <div id="container">
      <div id="pokemonImg">
          <img id="pokemonFront" src="${data.sprites.front_default}" alt="${data.name}">
          <img id="pokemonBack" src="${data.sprites.back_default}" alt="${data.name}">
      </div>

      <button id="toggleShiny">✨ Show Shiny ✨</button>

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

  // Agregar evento al botón para alternar entre imágenes normales y shiny
  document.getElementById("toggleShiny").addEventListener("click", function () {
      const frontImage = document.getElementById("pokemonFront");
      const backImage = document.getElementById("pokemonBack");

      if (frontImage.src === data.sprites.front_default) {
          // Cambiar a imágenes shiny
          frontImage.src = data.sprites.front_shiny;
          backImage.src = data.sprites.back_shiny;
          this.textContent = "🔄 Show Normal";
      } else {
          // Volver a imágenes normales
          frontImage.src = data.sprites.front_default;
          backImage.src = data.sprites.back_default;
          this.textContent = "✨ Show Shiny ✨";
      }
  });
}

// Función para iniciar la búsqueda cuando el usuario escribe un nombre de Pokémon.
document.getElementById("searchPokemon").addEventListener("change", function () {
  const pokemonName = this.value;

  if (pokemonName.length > 0) {
    fetchPokemon(pokemonName); // Realiza la búsqueda cada vez que el usuario escribe.
  } else {
    document.getElementById("container-card").innerHTML = ""; // Limpiar resultados si no hay búsqueda.
  }
});

// ---

// Función para buscar sugerencias de Pokémon mientras se escribe en el input.
async function searchSuggestions(query) {
  if (query.length < 1) { // Solo mostrar sugerencias si el texto tiene al menos 1 carácter
    document.getElementById("suggestions").style.display = "none";
    return;
  }

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0`
    );
    const data = await response.json();

    // Filtrar los Pokémon que contengan el texto ingresado en cualquier parte del nombre
    const filteredPokemons = data.results.filter(pokemon =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );

    // Ordenar los Pokémon para que los que coincidan exactamente (empiezan con el texto) vayan primero
    const sortedPokemons = filteredPokemons.sort((a, b) => {
      // Priorizar las coincidencias exactas, luego ordenar alfabéticamente
      const startsWithA = a.name.toLowerCase().startsWith(query.toLowerCase());
      const startsWithB = b.name.toLowerCase().startsWith(query.toLowerCase());

      if (startsWithA && !startsWithB) {
        return -1; // "a" debe ir antes que "b"
      }
      if (!startsWithA && startsWithB) {
        return 1; // "b" debe ir antes que "a"
      }
      return a.name.localeCompare(b.name); // Ordenar alfabéticamente
    });

    // Limitar a 10 resultados
    const topPokemons = sortedPokemons.slice(0, 10);

    showSuggestions(topPokemons); // Muestra las sugerencias en la interfaz
  } catch (error) {
    console.error('Error fetching Pokémon suggestions:', error);
  }
}

// Función para mostrar las sugerencias de Pokémon debajo del input.
function showSuggestions(pokemons) {
  const suggestionsContainer = document.getElementById("suggestions");
  suggestionsContainer.innerHTML = ""; // Limpiar las sugerencias anteriores

  if (pokemons.length > 0) {
    suggestionsContainer.style.display = "block";
    
    const searchPokemon = document.getElementById("searchPokemon");
    searchPokemon.style.borderBottomLeftRadius = "0px";
    searchPokemon.style.borderBottomRightRadius = "0px";
    
    pokemons.forEach(pokemon => {
      const suggestionItem = document.createElement("div");
      suggestionItem.classList.add("suggestion-item");
      suggestionItem.textContent = pokemon.name;
      
      suggestionItem.addEventListener("click", () => {
        document.getElementById("searchPokemon").value = pokemon.name;
        document.getElementById("searchPokemon").style.borderRadius = "15px";
        suggestionsContainer.style.display = "none"; // Ocultar las sugerencias al seleccionar una
        fetchPokemon(pokemon.name); // Mostrar el Pokémon seleccionado
      });
      
      suggestionsContainer.appendChild(suggestionItem);
    });
  } else {
    suggestionsContainer.style.display = "none"; // Si no hay sugerencias, ocultarlas
  }
}

// Event listener para el input de búsqueda
document.getElementById("searchPokemon").addEventListener("input", function () {
  const pokemonName = this.value;

  if (pokemonName.length > 0) {
    searchSuggestions(pokemonName); // Buscar sugerencias mientras el usuario escribe
  } else {
    document.getElementById("suggestions").style.display = "none"; // Ocultar sugerencias cuando el input está vacío
    
    
    // Reiniciar las funciones (excepto la de obtener datos de la API)
    resetSearch(); // Llamamos a la función que limpia la búsqueda
  }

  // Limpiar los resultados si no hay búsqueda
  if (pokemonName.length === 0) {
    document.getElementById("container-card").innerHTML = "";
  }
});

// Función para reiniciar las sugerencias y la interfaz al borrar el input
function resetSearch() {
  // Ocultar las sugerencias de Pokémon
  document.getElementById("searchPokemon").style.borderRadius = "15px";
  
  // Limpiar cualquier información del Pokémon mostrado
  document.getElementById("container-card").style.display = "none";
}