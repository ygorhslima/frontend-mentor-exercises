const buttonsFeedback = document.querySelectorAll(".buttons-feedback");
const button_submit_feedback = document.querySelector(".button-submit-feedback");
let rating = null;

buttonsFeedback.forEach((botao)=>{
    botao.addEventListener("click",()=>{
        buttonsFeedback.forEach(btn=>btn.classList.remove("clicado"))
        botao.classList.add("clicado")
        rating = botao.innerText;
    });
});

button_submit_feedback.addEventListener("click",(e)=>{
    if(rating){
        localStorage.setItem("rating",rating)
    }else{
        alert("por favor seleciona uma estrela antes de enviar");
        e.preventDefault();
    }
})