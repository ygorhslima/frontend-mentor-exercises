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
