const span_name = document.querySelector(".span_name");
const span_number_card = document.querySelector(".span_number_card");
const span_month = document.querySelector(".span_month");
const span_year = document.querySelector(".span_year");
const span_cvc = document.querySelector(".span_cvc");


//dados do usuário
const txt_name = document.getElementById("txt_name")
txt_name.addEventListener("input",()=>{
    span_name.textContent = txt_name.value.toUpperCase() || "JANE APPLESEED"
})


const txt_number_card = document.getElementById("txt_number_card")
txt_number_card.addEventListener("input",()=>{
    let value = txt_number_card.value.replace(/\D/g,'')
    value=value.replace(/(\d{4})(?=\d)/g, '$1 ');
    span_number_card.textContent = value || "0000 0000 0000 0000"
})

const txt_exp_date_month = document.getElementById("txt_exp_date_month")
txt_exp_date_month.addEventListener("input",()=>{
    span_month.textContent = txt_exp_date_month.value.padStart(2, '0') || "00" //Garante 2 dígitos, adicionando um zero à esquerda se necessário
})

const txt_exp_date_year = document.getElementById("txt_exp_date_year")
txt_exp_date_year.addEventListener("input",()=>{
    span_year.textContent = txt_exp_date_year.value.padStart(2,'0') || "00"
})

const txt_cvc = document.getElementById("txt_cvc")
txt_cvc.addEventListener("input",()=>{
    span_cvc.textContent = txt_cvc.value || "00"
})

const form = document.querySelector(".form")
form.addEventListener("submit",(e)=>{
    e.preventDefault(); // Impede o recarregamento da página

    // Pega os valores atuais dos campos de entrada no momento da submissão
    const name = txt_name.value.toUpperCase();
    let number_card = txt_number_card.value.replace(/\D/g, ''); // Remove não-dígitos
    number_card = number_card.replace(/(\d{4})(?=\d)/g, '$1 '); // Adiciona espaços
    const month = txt_exp_date_month.value.padStart(2, '0');
    const year = txt_exp_date_year.value.padStart(2, '0');
    const cvc = txt_cvc.value;

    // Atualiza o textContent dos spans
    span_name.textContent = name || "JANE APPLESEED";
    span_number_card.textContent = number_card || "0000 0000 0000 0000";
    span_month.textContent = month || "00";
    span_year.textContent = year || "00";
    span_cvc.textContent = cvc || "000";

     // Opcional: Você pode adicionar lógica de validação aqui antes de "confirmar"
    // e/ou exibir uma mensagem de sucesso.
    console.log("Dados do formulário submetidos e exibidos no cartão!");

})