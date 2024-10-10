// Importamos la clase Pokemon desde el archivo Pokemon.js
import Champion from './Champion.js';

// Creamos un array para los 151 pokemons que obtendremos desde la API
var champions = [];

// Seleccionamos el elemento button del DOM usando querySelector 
const button = document.querySelector("button");
// Agregamos un event listener al botón para que se mantenga a la espera de hacer click en él
// Cuando se recibe el click, se ejecuta la función flecha
button.addEventListener("click", () => {
    // Al hacer click sobre el botón, cambiamos su visibilidad y lo ocultamos
    document.querySelector('#button').style.visibility = 'hidden';
    // También cambiamos la visibilidad del elemento #pokedex, y lo mostramos en pantalla
    document.querySelector('#lols').style.visibility = 'visible';
    // LLamada a la función startPokedex() que comenzará el proceso de mostrar los Pokemon
    startLol();
});

// Función asíncrona que va a realizar operaciones con promesas para realizar la llamada a la API
const startLol = async () => {
    const data = await fetch("https://ddragon.leagueoflegends.com/cdn/13.18.1/data/es_ES/champion.json")
    .then(function(result) {
        return result.json();
    });

    const array=data.data;
    Object.entries(array).forEach(([name, champion]) => {
        const champ = new Champion(champion);
        pushChampion(champ);
    });
    // Una vez que todos los Pokemon se han añadido al array, llamamos a la función showPokedex
    await showLol();
};

// Esta función añade el Pokemon que se le pasa como parámetro al array
function pushChampion(champion) {
    champions.push(champion);
}
// Esta función se encarga de mostrar en el DOM los Pokemon que se han obtenido y almacenado en el array 
const showLol = async () => {
    const lols = document.getElementById("lols");
    
    for (var i = 0; i < champions.length; i++) {
        // Agrega la tarjeta de cada Pokémon al HTML
        lols.innerHTML += `
            <div class="card">
                <img class="back" src="${champions[i].full}">
                
                <br>
                ${champions[i].name}<br>
               
            </div>`;
    }
}

//<img class="front" src="${champions[i].pkm_front}" id="front-img-${i}">