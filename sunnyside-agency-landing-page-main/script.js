const btnMenu = document.querySelector('.btn_menu');
const navMobile = document.querySelector('.container-nav-mobile');

// Alterna a visibilidade do menu ao clicar no botão
btnMenu.addEventListener('click', () => {
  navMobile.classList.toggle('active');
});
