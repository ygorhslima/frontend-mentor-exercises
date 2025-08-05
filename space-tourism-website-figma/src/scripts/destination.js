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