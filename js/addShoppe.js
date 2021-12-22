/*
Objetivo: intercepte o click no ícone carrinho, adicionando automaticamente a classe "carrinho-aberto"
ao body, e fechar o carrinho, ao clicar fora dele, no botão "X" ou apertando a tecla Esc. (feito)

    TODO:
    Calcular total do carrinho ao adicionar um pokemon
    Renderizar o carrinho ao adicionar
    Abrir o carrinho
    Remover um pokemon
    Calcular total do carrinho ao remover um pokemon
    Renderizar o carrinho ao remover
    Salvar carrinho no cliente
    Carregar caso haja carrinho salvo (localstorage)
*/

//CÓDIGO ORGANIZADO

class Carrinho {

    //Elementos selecionados as variáveis.
    btnAbrirCarrinho = document.querySelector('#btn-carrinho');
    btnFecharCarrinho = document.querySelector('#fechar-carrinho');
    clicarFechar = document.querySelector('.fecha-menu');
    items = [];
    total = 0;

    //Adicionando os eventos de click aos botões, ao clicar fora do carrinho e a tecla Esc
    constructor() {

        this.btnAbrirCarrinho.addEventListener('click', this.abrirCarrinho);
        this.btnFecharCarrinho.addEventListener('click', this.fecharCarrinho);
        this.clicarFechar.addEventListener('click', this.fecharCarrinho);
        document.addEventListener('keydown', this.teclaPress);
        console.log('Carrinho carregado...');
        
    }

    abrirCarrinho(event) {
        event.preventDefault();  //evita os comportamentos padrões.

         document.body.classList.add('carrinho-aberto', 'isOpen'); 

    }

    fecharCarrinho(event) {
        event.preventDefault();  //evita os comportamentos padrões.

          document.body.classList.remove('carrinho-aberto', 'isOpen');

    }

    teclaPress(event){
        event.preventDefault();  //evita os comportamentos padrões.
    
        if (event.key === 'Escape') {
             document.body.classList.remove('carrinho-aberto', 'isOpen'); 
        }
    };
    
    adicionar(pokemon) {
        //jogando os pokemons para dentro da variável items.
        this.items.push(pokemon);
    }
};

// Executa quando a página termina de carregar
window.addEventListener('load' , async () => {
    window.carrinho = new Carrinho();
    //Criando variável de escopo global para adicionar pokemons ao carrinho, isso é para podermos
    //usá-la fora do escopo da classe em que foi criada, que é Carrinho. Comunicação entre documentos.

});

/*

CÓDIGO PRIMITIVO, ANTES DE ORGANIZAR

function Carrinho() {

     //Elementos selecionados as variáveis.
    const btnAbrirCarrinho = document.querySelector('#btn-carrinho');
    const btnFecharCarrinho = document.querySelector('#fechar-carrinho');
    const clicarFechar = document.querySelector('.fecha-menu');
    itens = [];
    total = 0;

    //Evento para abrir o carrinho.
    btnAbrirCarrinho.addEventListener('click', (event) =>{
        event.preventDefault();  //evita os comportamentos padrões.

        document.body.classList.add('carrinho-aberto', 'isOpen');  

    });

    //Evento para fechar carrinho clicando no botão X.
    btnFecharCarrinho.addEventListener('click', (event) => {
        event.preventDefault();  //evita os comportamentos padrões.

        document.body.classList.remove('carrinho-aberto', 'isOpen'); 

    });

     //Evento para fechar carrinho clicando fora do carrinho.
    clicarFechar.addEventListener('click', (event) => {
        event.preventDefault();

        document.body.classList.remove('carrinho-aberto', 'isOpen');

    });
  
    //Evento para fechar carrinho clicando na tecla [Esc].
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            document.body.classList.remove('carrinho-aberto', 'isOpen');
        }
    });

window.addEventListener('load',async()=>{
    window.carrinho = Carrinho(); //Criando variável de escopo global para adicionar pokemons ao carrinho.
})
*/


