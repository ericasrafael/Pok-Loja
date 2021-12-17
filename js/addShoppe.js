/*
Objetivo: intercepte o click no ícone carrinho, adicionando automaticamente a classe "carrinho-aberto"
ao body, e fechar o carrinho, ao clicar fora dele, no botão "X" ou apertando a tecla Esc.
*/

//Adicionando a classe para abrir menu dinamicamente, junto a classe de fundo opacity.
const btnAbrirCarrinho = document.querySelector('#btn-carrinho');

btnAbrirCarrinho.addEventListener('click', function (event) {
    event.preventDefault();  //evita os comportamentos padrões.

    document.body.className = 'carrinho-aberto';  //Adicionando a classe "carrinho-aberto" a tag body.

    document.querySelector('.fecha-menu').classList.toggle('isClose');

});

//Removendo a classe para assim, fechar menu dinamicamente, junto a classe de fundo opacity.
const btnFecharCarrinho = document.querySelector('#fechar-carrinho');

btnFecharCarrinho.addEventListener('click', function (event) {
    event.preventDefault();  //evita os comportamentos padrões.

    document.body.className = '';  //Retira do elemento body a classe "cariinho-aberto"

    document.querySelector('.fecha-menu').classList.toggle('isClose');

});

//Adicionando event click a div menu, para remover o fundo opacity e a classe carrinho aberto.
const clicarFechar = document.querySelector('.fecha-menu');
clicarFechar.addEventListener('click', () => {

    document.body.className = '';  //Precisa remover a classe Carrinho-aberto para o menu lateral fechar

    document.querySelector('.fecha-menu').classList.toggle('isClose'); //Removendo fundo opacity

});
//Adicionando a funcionalidade da tecla Esc, que fecha menu lateral quando pressionada
document.addEventListener('keydown', (event) => {
    const tecla = event.key;

    if (tecla === 'Escape') {
        document.body.className = '';  //Precisa remover a classe Carrinho-aberto para o menu lateral fechar

        document.querySelector('.fecha-menu').classList.toggle('isClose'); //Removendo fundo opacity

    }

});


