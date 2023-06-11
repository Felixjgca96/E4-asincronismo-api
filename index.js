const pokeFormulario = document.getElementById("formulario-pokemonm");
const contenedorPoke = document.getElementById("pokemon-contenedor");

pokeFormulario.addEventListener("submit", (event) => {
  event.preventDefault();
  const cardNumberInput = document.getElementById("input-number");
  const cardNumber = cardNumberInput.value;
  if (cardNumber === "") {
    const errorCardHTML = `
        <h2 class="error-mensaje" >Ingrese un Id-Pokemon válido.</h2>
        `;
    contenedorPoke.innerHTML = errorCardHTML;
    return;
  }
  buscarPokemonData(cardNumber);
  cardNumberInput.value = "";
});

function buscarPokemonData(pokemonNumber) {
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Pokémon no encontrado");
      }
      return response.json();
    })
    .then((data) => {
      displayPokemonData(data);
    })
    .catch((error) => {
      mostrarError(error.message);
      const empyCardHTML = `
        <h2 class="error-mensaje" > Pokémon no encontrado.</h2>
        `;
      contenedorPoke.innerHTML = empyCardHTML;
    });
}

function displayPokemonData(pokemonData) {
  const pokemonName = pokemonData.name.toUpperCase();
  const pokemonTypes = pokemonData.types
    .map((type) => type.type.name)
    .join(", ");
  const pokemonHeight = pokemonData.height / 10;
  const pokemonWeight = pokemonData.weight / 10;
  const pokemonImageUrl = pokemonData.sprites.front_default;

  const pokemonCardHTML = `
    <h2>${pokemonName}</h2>
    <img src="${pokemonImageUrl}" alt="${pokemonName}">
    <p><strong>Tipo:</strong> ${pokemonTypes}.</p>
    <p><strong>Altura:</strong> ${pokemonHeight} m</p>
    <p><strong>Peso:</strong> ${pokemonWeight} kg</p>
  `;

  contenedorPoke.innerHTML = pokemonCardHTML;
}

function mostrarError(errorMessage) {
  const errorHTML = `<p class="error-mensaje">${errorMessage}</p>`;
  contenedorPoke.innerHTML = errorHTML;
}
