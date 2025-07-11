const menuToggle = document.querySelector('.menu-toggle');
const menuClose = document.querySelector('.menu-close');
const navMenu = document.querySelector('.menu');
const overlay = document.querySelector('.overlay');
const body = document.body;

const toggleMenu = () => {
    navMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    body.classList.toggle('menu-open');
};

menuToggle.addEventListener('click', () => {
    toggleMenu();
    menuToggle.style.display = 'none'
    menuClose.style.display = 'block'
});

menuClose.addEventListener('click', () => {
    toggleMenu();
    menuToggle.style.display = 'block'
    menuClose.style.display = 'none'
});
