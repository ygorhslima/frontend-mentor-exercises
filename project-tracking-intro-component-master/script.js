const body = document.body;

// Cria o elemento de fundo decorativo
const element = document.createElement("div");
element.setAttribute("class", "element");
body.appendChild(element);

// Seleciona os elementos do menu
const btnMenuClicked = document.querySelector(".btnMenuClicked");
const nav = document.querySelector("header nav");
const menuIcon = btnMenuClicked.querySelector("img");

// Variável de controle
let menuOpen = false;

// Evento de clique no botão
btnMenuClicked.addEventListener("click", () => {
  menuOpen = !menuOpen;

  if (menuOpen) {
    nav.classList.add("menu-active");
    menuIcon.src = "images/icon-close.svg"; // muda ícone para "X"
  } else {
    nav.classList.remove("menu-active");
    menuIcon.src = "images/icon-hamburger.svg"; // volta para ícone hambúrguer
  }
});
