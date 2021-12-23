/*Trabalha-se com dados, ou seja, uma classe com as informações de cada pokemon seria ideal
Gerar listagem no html */

class Pokemon {
    constructor(name, url) {
        this.name = name;
        this.url = url;
        this.id = this.url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '');
        this.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${this.id}.png`;
        this.price = Math.floor(Math.random() * 100);
    }
    //Criando método que retorna o html, que retorna as informações de um determinado pokemon
    html() {
        //Criando um elemendo div via JS
        const pokeDiv = document.createElement('div');
        /*Atribuindo a esse elemento o valor da classe model (adicionando uma classe a div criada), 
        que representa cada div de pokemon
        className retorna e define o valor do atributo class do elemento especificado. */
        pokeDiv.className = 'model';
        pokeDiv.setAttribute('data-id', this.id);
        /*Adicionando o conteúdo para a div criada, por Template String " ´ ´ ", assim poderá
        substituir as informnações dinamicamente*/
        pokeDiv.innerHTML = `
            <img class="poke" 
                   src="${this.image}"
                   alt="${this.name}">
            <h2>${this.name}</h2>
            
            <p class="price-from">De ${this.price}</p>
            <p class="price-to">Por ${(this.price * 0.8).toFixed(2)}</p>
            
                 <button class="poke-shopee botao">
                    <img src="img/pokeball.png" alt="Pokeball">
                    <span>Comprar</span>
            </button>

        `;

        return pokeDiv;
    }
}

class PokeList {

    limit = 20;

    //Variáveis para incrementação
    pages = 0;
    currentPage = 0;
    pokemons = [];

    //Seleciona a classe de pokemons, que no caso é a classe pokemons no HTML.
    pokeList = document.querySelector('.pokemons');
    //Seleciona o botão "anterior" no html
    btnAnt = document.querySelector('.btn-ant');
    //Seleciona botão "próximo" no html
    btnProx = document.querySelector('.btn-prox');

    //O construtor é um método especial para criar e inicializar um objeto criado a partir de uma classe.
    constructor() {
        this.addEvents(); // Chamada da função para adicionar os eventos de clique
        this.getPokemons(); // Chamada da função de busca dos pokemons quando dado F5 na página
    }

    //Adicionando eventos de click nos botões da página
    addEvents() {
        this.btnProx.onclick = () => this.PagLater();
        this.btnAnt.onclick = () => this.PagPrevious();
    }

    //Método para passar para próxima página
    async PagLater() {
        const nextPag = this.currentPage += 1;

        if (nextPag < this.pages) {  //Se a numeração da página atual for menor que a quantidade de páginas
            this.getPokemons(nextPag);
        }
    }

    //Método para passar para página anterior 
    async PagPrevious() {
        const antPag = this.currentPage -= 1;
        if (antPag >= 0) {  //Se a numeração da página atual for maior que a numeração da primeira página
            this.getPokemons(antPag);
        }
    }
    //Busca pelos pokemons na API
    async getPokemons(page) {

        this.pokeList.innerHTML = '<div>Loanding Pokémons ...</div>';

        // Volta para o topo da página
        window.scrollTo({ top: 0, behavior: 'smooth' });

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${this.limit * page}`);
        //limit = quantidade de pokémons que vai retornarem um carregamento
        //offset = informa quantos pokémons vai ser pulado

        const json = await response.json();

        this.pages = Math.ceil(json.count / this.limit);

        this.listaPokemons(json.results);
    }


    /*Método para renderizar os pokemons no html
    Função que recebe pokemons no argumento e os redenriza no html a partir dos dados que pede a Class Pokemon.
    Renderizar os pokemons a partir da resposta vinda da API, por response!
    Se observarmos na aba Console, podemos ver que o retorno é um objeto JS, com uma de suas propriedades 
    chamada "results", que são, justamente, os dados que queremos trabalhar. Este vem em formato de Array,
    e podemos também, visualizar que cada elemento nos trás um "name" e uma "url", que deveremos usar na classe.
    Com o método .map podemos alterar o Array, retornando algo diferente a cada atualização.
    Devemos, então, passar o resultado, para dentro da class Pokemon.*/
    listaPokemons(pokemonsApi = []) {

        this.pokeList.innerHTML = '';
        /*A lista de pokemons é limpa antes de dicionar mais 20 pokemons. Se não fizer isso, a cada click do btnProx
        vai acumalando no html, 20 + 20 + 20 ... */

        const pokemons = pokemonsApi.map((pokemon) => new Pokemon(pokemon.name, pokemon.url));
        //Retorna um Array com instâncias da Class Pokemon

        this.pokemons = pokemons;
        //Declarando que a variável de Array "pokemons =[]" recebe o array com instâncias da Class Pokemon

        /*Colocando agora cada pokemon para dentro da classe "pokemons" em seu método html de renderização no HTML do 
        documento, dinamicamente. Lembre-se, .forEach é cada elemento presente em um Array.*/
        pokemons.forEach((pokemon) => {
            const html = pokemon.html();
            //Executando a adição de cada pokemon no html
            this.pokeList.appendChild(html)
        });

        this.addButtons(); // Chamada da função para esconder ou não os botões

        /* 
        Adicionando evento de click nos botões de comprar. Lembre-se querySelector so retorna un único elemento, e, no
        caso, precisa-se selecionar todos os elementos que contenham a mesma classe.
        */
        const btnShopee = document.querySelectorAll('.poke-shopee');
        //Adicionar a cada botão de compra um evento de "click" com loop, para selecionar todos.
        btnShopee.forEach((btn) => {
            btn.addEventListener('click', (event) => {
                event.preventDefault();
                /*
                Em Console é retonado a classe PokeList , quando damos console.log(event.target.attributes), com todas as 
                suas propriedades. Nosso objetivo é apenas identificar cada pokemon pelo seu id, que é retornado como um 
                atributo, elemento de um array quando damos console.log(event.target.attributes), atributos da classe 
                poke-buy-btn (botao). Temos que retornar apenas o atributo id, que o definimos em "data-id" no html, 
                que é um elemento do array Attributes. Como temos que selecionar apenas um atributo, dentro de um array, 
                usamos .getAttribute. Ademais, lembre-se que "event.target" retorna no console quem foi clicado.
                */
                const id = event.target.closest('.model').getAttribute('data-id');
                /** 
                 Seleciona cada pokemon identificado pelo seu id, que é retornado no console, e o armazena 
                 na variável pokemon. Lembre-se, this.pokemons contém cada pokémon, ou seja, o array com 
                 instâncias da Class Pokemon.
                 */
                const pokemon = this.pokemons.find((pokemon) => pokemon.id == id); //condição = true para retornar pokémon
                window.carrinho.adicionar(pokemon);
            });
        });
    }
    //Método para exibir ou esconder os botões de paginação segundo a numeração da página atual
    addButtons() {
        this.currentPage === 0 ? this.btnAnt.style.visibility = 'hidden' : this.btnAnt.style.visibility = 'visible';
        this.currentPage + 1 === this.pages ? this.btnProx.style.visibility = 'hidden' : this.btnProx.style.visibility = 'visible';
    }
};

//Executa escopo quando página termina seu carregamento.
window.onload = async () => {
    new PokeList();
};


