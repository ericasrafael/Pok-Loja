//Trabalha-se com dados, ou seja, uma classe com as informações de cada pokemon seria ideal
//Gerar listagem no html, nesse caso, ao clicar no pokemon aparece no html suas informações
class pokemonSelected {
    constructor(options) {
        this.name = options.name;
        this.types = options.types.map(typeItem => typeItem.type.name);
        this.abilities = options.abilities.map(abilityType => abilityType.ability.name);
        this.id = options.id;
        this.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${this.id}.png`;
    };


    html() {
        //Selecionando a classe que aparece no css.
        const pokeDiv = document.querySelector('.poke-abilities');
        pokeDiv.innerHTML = `
                <img class="poke" 
                src="${this.image}" 
                alt="${this.name}">
                < div class= "poke-infor">
                
                <h1>${this.name}</h1>
                    <hr />
                    <h2>Tipo</h2>
                    <ul>
                        <li>${this.types}</li>
                    </ul>
                    <hr />
                    <h2>Habilidades</h2>
                    <ul>
                        <li>${this.abilities}</li>
                    </ul>
            </div>`;
        return pokeDiv;
    }
}

const fakePromise = () => new Promise((resolve) => setTimeout(resolve, 3000));

function getQueryparameters() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    return params; // { id: 1 }
}

async function getPokemonData(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    const response = await fetch(url);

    const data = await response.json();

    return data;
}

window.onload = async function () {
    const { id } = getQueryparameters();

    const pokemonDiv = document.querySelector('.poke-abilities');

    window.carrinho = new Carrinho();

    try {
        await fakePromise();

        const data = await getPokemonData(id);

        const pokemon = new pokemonSelected(data);

    } catch (error) {
        pokemonDiv.innerHTML = `<div class="error">Pokémon não encontrado!</div>`
    }
}