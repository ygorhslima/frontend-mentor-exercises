document.addEventListener("DOMContentLoaded", () => {
    const mainContainer = document.querySelector(".container");
    const successContainer = document.querySelector(".container-success");
    const form = document.querySelector(".container-form");
    const emailInput = document.getElementById("txt_email");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();

        if (email && email.includes("@") && email.includes(".")) {
            // Esconde o container principal
            mainContainer.style.display = "none";

            // Exibe o container de sucesso
            successContainer.style.display = "flex";

            // Atualiza o span com a classe .txt_email_result com o valor digitado
            const emailSpan = document.querySelector('.txt_email_result');
            if (emailSpan) {
                emailSpan.textContent = email;
            }
        } else {
            emailInput.classList.add("input-error");
        }
    });
});
