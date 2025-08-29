# Frontend Mentor - Space tourism website

## Descrição do Projeto

Este projeto é uma página web responsiva que faz parte de um site de turismo espacial.
Ela é dividida em 4 páginas

A página index (inicial)
Página destination (destino)
Página crew (equipe)
Página technology (tecnologias usadas)

# principais tecnologias usadas

**HTML**: Estrutura da página e elementos.
**CSS**: Estilização responsiva para desktop e mobile, Animações de elementos e organização da estrutura do site.
**JavaScript**: Navegação entre os itens e interatividade.

## implementações principais do site

### Menu

O Menu foi a primeira implementação que fiz no projeto, é um menu fixo que está em todas as páginas, fazendo o link entre as páginas do site, a estilização segue um padrão, no JavaScript implementei uma funcionalidade de Menu para telas em celulares, o que o script faz é adicionar e remover o menu lateral criado no CSS

```javascript
    // botão de abrir o menu
    const abrirMenu = document.getElementById('abrirMenu');
    // botão de fechar o menu
    const fecharMenu = document.getElementById('fecharMenu');
    const menuLateral = document.getElementById('menuLateral');

    abrirMenu.addEventListener('click', () => {
        menuLateral.classList.add('mostrar');
        abrirMenu.style.display = 'none'
    });

    fecharMenu.addEventListener('click', () => {
        menuLateral.classList.remove('mostrar');
        abrirMenu.style.display = 'block'
    });


```

### animação do planeta

foi bem simples, utilizei a funcionalidade interna do CSS chamado @keyframes, onde você pode animar um elemento HTML, para rotacionar a imagem do planeta utilizei outro conceito, chamado transform, onde você pode trabalhar por exemplo com rotação e translação de um elemento, a ideia foi fazer uma rotação completa de 0° até 360° nos períodos de 0% a 100% como mostra o código abaixo:

```css


/* Imagem do planeta */
.image-planet img {
    width: 350px;
    height: auto;
    animation: animationPlanet 20s linear infinite; /* Rotação contínua */
}

/* ------------------------------
   ANIMAÇÃO DO PLANETA
   Rotação completa de 360°
------------------------------ */
@keyframes animationPlanet {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg); /* Gira completamente */
    }
}

```

### navegação entre os itens

a navegação entre os itens nas páginas do site tem um padrão para funcionar no HTML


```html
    <main>
      <div class="list">
        <!-- Moon -->
        <div class="item active">
      
        </div>
      </div>
    </main>
```
 
Os métodos de navegação em cada página são um pouco diferente, mas no html o conteúdo principal do site sempre tem uma div de classe .list e dentro do .list os itens, e um deles precisam está com a classe active, que por padrão, todos os itens estão como display:none; o que o active faz é mostrar o item

## destination-navigation

neste script, eu obtenho cada botão dos planetas e os itens de cada planeta, isto é, mostra as imagens dos planetas, seu título e sua descrição
quando cada botão for clicado eu vou adicionar ou remover a classe active que contenha o mesmo índice

```js
const botoes = [...document.querySelectorAll(".button-planets")];
const planetas = [...document.querySelectorAll(".item")];


botoes.forEach((botao, index)=>{
    botao.addEventListener('click',()=>{
        // remover classe active de todos os itens
        planetas.forEach(item => item.classList.remove("active"))
        // adiciona classe active no item correspondente
        planetas[index].classList.add("active")        
    })
})

```

## crew-navigation

Outra lógica mas muito parecido com o anterior, este código controla a exibição de uma lista de itens, permitindo navegar entre eles usando dois botões (avançar e voltar) e os indicadores numerados. A função showItem recebe o índice do item atual, percorre todos os itens e:

Adiciona a classe active apenas ao item cujo índice corresponde ao índice atual, mostrando-o na tela.
Para os indicadores, adiciona a classe active e altera o estilo do indicador que corresponde ao item ativo, enquanto remove a classe e o estilo dos demais.
Os botões de avançar e voltar atualizam o índice atual, garantindo que a navegação seja cíclica: ao passar do último item, volta para o primeiro; ao voltar do primeiro, vai para o último. Por fim, a função showItem é chamada ao carregar a página para inicializar o primeiro item ativo.

```js
const items = document.querySelectorAll(".list .item");
const nextBtn = document.querySelector(".btn_next");
const prevBtn = document.querySelector(".btn_prev");
const indicators = document.querySelectorAll(".indicator-crew");
let currentIndex = 0;

function showItem(index) {
    items.forEach((item, i) => {
        item.classList.toggle("active", i === index);
        
        if (i === index) {
            indicators[i].classList.add("active");
            indicators[i].style.backgroundColor = "black"; // indicador ativo
        } else {
            indicators[i].classList.remove("active");
            indicators[i].style.backgroundColor = "transparent"; // desativa os outros
        }
    });
}

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % items.length;
    showItem(currentIndex);
});

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    showItem(currentIndex);
});

// Inicializa
showItem(currentIndex);

```

## technology-navigation
Mesma lógica do anterior, porém aqui não tenho a representação dos indicators, os indicators para este caso são os próprios botões
```js

const item = [...document.querySelectorAll(".list .item")];
const indicators = document.querySelectorAll(".indicator-technology");

let currentIndex = 0;
function showItem(index){
    item.forEach((item, i)=>{
        item.classList.toggle("active", i === index);
        indicators[i].classList.toggle("active",i === index);
    });
}

indicators.forEach((indicator, i)=>{
    indicator.addEventListener("click",()=>{
        currentIndex = i
        showItem(currentIndex)
    });
});


```