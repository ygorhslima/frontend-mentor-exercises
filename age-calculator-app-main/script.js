document.addEventListener("DOMContentLoaded", () => {
    // Seleção dos elementos do DOM
    const inputDay = document.getElementById("day");
    const inputMonth = document.getElementById("month");
    const inputYear = document.getElementById("year");

    const spanText_years = document.getElementById("text-years");
    const spanText_months = document.getElementById("text-months");
    const spanText_days = document.getElementById("text-days");

    const btnCalc = document.getElementById("btnCalc");

    const errorDay = document.getElementById('error-day');
    const errorMonth = document.getElementById('error-month');
    const errorYear = document.getElementById('error-year');

    const dayLabel = document.querySelector('label[for="day"]');
    const monthLabel = document.querySelector('label[for="month"]');
    const yearLabel = document.querySelector('label[for="year"]');

    /**
     * Função para limpar mensagens de erro e classes de erro dos elementos do formulário.
     */
    function clearErrors() { // Renomeei de clearError para clearErrors (convenção)
        errorDay.textContent = '';
        errorMonth.textContent = '';
        errorYear.textContent = '';

        inputDay.classList.remove("input-error"); // Corrigido 'imput-error' para 'input-error'
        inputMonth.classList.remove('input-error');
        inputYear.classList.remove('input-error');

        dayLabel.classList.remove('label-error');
        monthLabel.classList.remove('label-error');
        yearLabel.classList.remove('label-error');

        // Garante que os spans de resultado também limpem a cor vermelha se existirem
        spanText_years.classList.remove('text-age--invalid');
        spanText_months.classList.remove('text-age--invalid');
        spanText_days.classList.remove('text-age--invalid');
    }

    /**
     * Função para exibir uma mensagem de erro e adicionar classes de erro aos elementos.
     * @param {HTMLElement} errorElement - O span onde a mensagem de erro será exibida.
     * @param {string} message - A mensagem de erro a ser exibida.
     * @param {HTMLElement} inputElement - O input ao qual a classe 'input-error' será adicionada.
     * @param {HTMLElement} labelElement - A label ao qual a classe 'label-error' será adicionada.
     */
    function showError(errorElement, message, inputElement, labelElement) {
        errorElement.textContent = message;
        if (inputElement) inputElement.classList.add('input-error');
        if (labelElement) labelElement.classList.add('label-error');
    }

    /**
     * Função para validar os inputs de dia, mês e ano.
     * Implementa validações de campo vazio, números fora do intervalo e ano futuro.
     * @param {string} dia - O valor do dia do input.
     * @param {string} mes - O valor do mês do input.
     * @param {string} ano - O valor do ano do input.
     * @returns {boolean} - Retorna true se todos os inputs forem válidos, false caso contrário.
     */
    function validarInput(dia, mes, ano) {
        let isValid = true;
        clearErrors(); // Sempre limpa erros anteriores antes de iniciar uma nova validação

        const currentYear = new Date().getFullYear();

        // Validação 1: Campos Vazios
        if (!dia.trim()) {
            showError(errorDay, 'Este campo é obrigatório', inputDay, dayLabel);
            isValid = false; // Importante: marca como inválido
        }
        if (!mes.trim()) {
            showError(errorMonth, 'Este campo é obrigatório', inputMonth, monthLabel);
            isValid = false; // Importante: marca como inválido
        }
        if (!ano.trim()) {
            showError(errorYear, 'Este campo é obrigatório', inputYear, yearLabel);
            isValid = false; // Importante: marca como inválido
        }

        // Se houver algum campo vazio, não continua com as validações numéricas
        if (!isValid) return false;

        // Converte os valores para números (somente se não estiverem vazios)
        const numDay = parseInt(dia, 10);
        const numMonth = parseInt(mes, 10);
        const numYear = parseInt(ano, 10);

        // Validação 2: Números Fora do Intervalo
        if (isNaN(numDay) || numDay < 1 || numDay > 31) {
            showError(errorDay, 'Coloque um dia válido', inputDay, dayLabel);
            isValid = false;
        }
        if (isNaN(numMonth) || numMonth < 1 || numMonth > 12) {
            showError(errorMonth, 'Coloque um mês válido', inputMonth, monthLabel);
            isValid = false;
        }

        // Validação 3: Ano Futuro
        // A mensagem de erro para 'Ano futuro' deve ser exibida no erro do ano, não do dia.
        if (isNaN(numYear) || numYear > currentYear) {
            showError(errorYear, 'Deve ser um ano no passado', inputYear, yearLabel); // Corrigido para errorYear
            isValid = false;
        }

        return isValid; // Retorna true se todas as validações passarem
    }

    /**
     * Função para calcular a idade em anos, meses e dias a partir de uma data de nascimento.
     * @param {string} dataNascimentoStr - A data de nascimento no formato "YYYY-MM-DD".
     * @returns {object} - Um objeto contendo a idade em anos, meses e dias.
     */
    function calcularIdade(dataNascimentoStr) {
        const [year, month, day] = dataNascimentoStr.split('-').map(Number);
        const aniversario = new Date(year, month - 1, day); // Mês é 0-indexado no construtor Date

        const hoje = new Date(); // Data atual

        let anos = hoje.getFullYear() - aniversario.getFullYear();
        let meses = hoje.getMonth() - aniversario.getMonth();
        let dias = hoje.getDate() - aniversario.getDate();

        // Ajusta se o dia atual for menor que o dia do aniversário
        if (dias < 0) {
            meses--;
            // Pega o número de dias do mês anterior ao mês atual.
            // new Date(ano, mes, 0) retorna o último dia do mês anterior.
            dias += new Date(hoje.getFullYear(), hoje.getMonth(), 0).getDate();
        }

        // Ajusta se o mês atual (após o ajuste de dias) for menor que o mês do aniversário
        if (meses < 0) {
            anos--;
            meses += 12; // Adiciona 12 meses para corrigir o valor negativo
        }
        return { anos, meses, dias };
    }

    // Event listener para o botão de cálculo
    btnCalc.addEventListener("click", (e) => {
        e.preventDefault(); // Impede o envio padrão do formulário

        // Pega os valores atuais dos inputs
        const day = inputDay.value;
        const month = inputMonth.value;
        const year = inputYear.value;

        // Executa a validação
        if (validarInput(day, month, year)) {
            // Se a validação passar, formata a data e calcula a idade
            const dataNascimentoFormatada = `${year}-${month}-${day}`;
            const idade = calcularIdade(dataNascimentoFormatada);

            // Exibe os resultados
            spanText_years.textContent = idade.anos;
            spanText_months.textContent = idade.meses;
            spanText_days.textContent = idade.dias; // Corrigido para 'idade.dias'

            // Remove a classe de erro dos spans de resultado caso ela tenha sido adicionada
            spanText_years.classList.remove('text-age--invalid');
            spanText_months.classList.remove('text-age--invalid'); // Espaço removido
            spanText_days.classList.remove('text-age--invalid');

        } else {
            // Se a validação falhar, reseta os textos de idade para "--"
            spanText_days.textContent = '--';
            spanText_months.textContent = '--';
            spanText_years.textContent = '--';

            // Adiciona a classe de erro aos spans de resultado para exibir em vermelho
            spanText_days.classList.add('text-age--invalid');
            spanText_months.classList.add('text-age--invalid');
            spanText_years.classList.add('text-age--invalid');
        }
    });
});