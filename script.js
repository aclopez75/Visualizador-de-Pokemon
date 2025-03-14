'use strict';

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
    typeColors(data);
  } catch (error) {
    console.log(error.message);
    // alert("We haven't found any Pokemon with that name in our database.");
  }
}

// Funcion para llamar a la imágen de detrás

function getBackImg (pokemon){
  if(pokemon.sprites.other.showdown.back_default){
    return pokemon.sprites.other.showdown.back_default;
    } else{
      return './img/not-found.png'
    }
}

function typeColors(data) {
  const typesContainer = document.getElementById('typesBox');
  typesContainer.innerHTML = ""; // Limpiar contenido antes de añadir nuevos tipos

  // Mapeo de colores por tipo
  const typeColors = {
      normal: "#A8A878",
      grass: "#78C850",
      fire: "#F08030",
      water: "#6890F0",
      electric: "#F8D030",
      ice: "#98D8D8",
      fighting: "#C03028",
      poison: "#A040A0",
      ground: "#E0C068",
      flying: "#A890F0",
      psychic: "#F85888",
      bug: "#A8B820",
      rock: "#B8A038",
      ghost: "#705898",
      dragon: "#7038F8",
      dark: "#705848",
      steel: "#B8B8D0",
      fairy: "#EE99AC"
  };

  // Recorrer todos los tipos del Pokémon
  data.types.forEach(typeInfo => {
      const typeName = typeInfo.type.name; // Nombre del tipo
      const typeColor = typeColors[typeName] || "#68A090"; // Color, con un fallback
      const typeDiv = document.createElement('div');

      // Aplicar estilos al contenedor del tipo
      typeDiv.style.backgroundColor = typeColor;
      typeDiv.style.color = "black";
      typeDiv.style.padding = "5px 10px";
      typeDiv.style.borderRadius = "10px";
      typeDiv.style.display = "inline-block";
      typeDiv.style.fontWeight = "600";
      typeDiv.style.textTransform = "uppercase";
      typeDiv.style.width = "fit-content";
      typeDiv.style.marginRight = "10px";
      typeDiv.style.marginBottom = "10px";

      // Crear el texto del tipo
      const typeText = document.createElement('span');
      typeText.textContent = typeName;

      // Agregar icono y texto al contenedor del tipo
      typeDiv.appendChild(typeText);

      // Agregar el tipo al contenedor principal
      typesContainer.appendChild(typeDiv);
  });
}

// Función para mostrar la información del Pokémon.
function displayPokemon(data) {
  const pokemonInfo = document.getElementById('container-card');
  pokemonInfo.style.display = "flex";
  const backImg = getBackImg(data);
  const statMaxValues = {
    hp: 255,
    attack: 190,
    defense: 250,
    special_attack: 190,
    special_defense: 250,
    speed: 150
  };

  // Función para obtener el valor máximo de la estadística de la API
function getMaxStatValue(statName) {
  // Convertir el nombre de la estadística a formato con guiones bajos (en caso de que sea con guiones medios)
  const normalizedStatName = statName.replace(/-/g, "_");
  
  // Retornar el valor máximo correspondiente, si existe en el objeto
  return statMaxValues[normalizedStatName] || 0; // Si no existe, retorna 0
}
  
  pokemonInfo.innerHTML = `
  <div id="container">
      <div id="pokemonImg">
          <img id="pokemonFront" src="${data.sprites.other.showdown.front_default}" alt="${data.name}">
          <button id="toggleShiny"><img id="shinySparkleImg" src="./img/shiny-sparkle.png" alt="Shiny"></button>
          <img id="pokemonBack" src="${backImg}" alt="${data.name}">
      </div>

      <div id="pokemonData">
          <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
          <div id="typesBox"></div> 
          <p><strong>Weight:</strong> ${data.weight / 10}kg</p>
          <p><strong>Height:</strong> ${data.height / 10}m</p>
      </div>
  </div>

  <div id="pokemonStats">
      <div class="stats-container">
          ${data.stats.map(stat => { 
              const statName = stat.stat.name;
              const statValue = stat.base_stat;
              const maxStatValue = getMaxStatValue(statName);
              const percentage = (statValue / maxStatValue) * 100;
              
              return ` 
              
              <div class="stat">
              <p class="stat-name">${statName}</p>
                  <div class="bar-container">
                      <div class="bar" style="width: ${percentage}%"></div>
                  </div>
                  <p class="stat-value">${statValue}</p>
              </div>`;
          }).join('')}
      </div>
  </div>
`;

// Variable que va a guardar el audio
const clickSound = new Audio('./click-sound.wav');

let isSoundPlaying = false;

// Función para manejar la reproducción del sonido
function playClickSound() {
  if (isSoundPlaying) {
    // Si el sonido ya se está reproduciendo, lo detenemos y lo reiniciamos
    clickSound.pause();
    clickSound.currentTime = 0; // Rewind al principio
  }
  // Iniciar la reproducción del sonido
  clickSound.play();
  isSoundPlaying = true;

  // Escuchar el evento 'ended' para resetear la funcion una vez que el sonido termine
  clickSound.addEventListener('ended', () => {
    isSoundPlaying = false; // El sonido ha terminado
  });
}

  // Agregar evento al botón para alternar entre imágenes normales y shiny
  document.getElementById("toggleShiny").addEventListener("click", function () {
      const frontImage = document.getElementById("pokemonFront");
      const backImage = document.getElementById("pokemonBack");
      playClickSound();

      if (frontImage.src === data.sprites.other.showdown.front_default) {
          // Cambiar a imágenes shiny
          frontImage.src = data.sprites.other.showdown.front_shiny;
          // this.textContent = "Default";
          if(data.sprites.other.showdown.back_default){
            return backImage.src = data.sprites.other.showdown.back_shiny;
            } else{
              return backImage.src = './img/close.png';
          }
          frontImage.classList.add("shiny");
          backImage.classList.add("shiny");
          
      } else {
          // Volver a imágenes normales
          frontImage.src = data.sprites.other.showdown.front_default;
          // this.textContent = "Shiny";
          if(data.sprites.other.showdown.back_default){
            return backImage.src = data.sprites.other.showdown.back_default;
            } else{
              return backImage.src = './img/close.png';
          }
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

  const searchPokemon = document.getElementById("searchPokemon");

  if (pokemons.length > 0) {
    suggestionsContainer.style.display = "block";
    
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
    searchPokemon.style.borderBottomLeftRadius = "15px";
    searchPokemon.style.borderBottomRightRadius = "15px";
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