const abrirMenu = document.getElementById('abrirMenu');
const fecharMenu = document.getElementById('fecharMenu');
const menuLateral = document.getElementById('menuLateral');

abrirMenu.addEventListener('click', () => {
  menuLateral.classList.add('mostrar');
});

fecharMenu.addEventListener('click', () => {
  menuLateral.classList.remove('mostrar');
});
