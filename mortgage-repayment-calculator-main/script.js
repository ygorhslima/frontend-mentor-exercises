

document.addEventListener("DOMContentLoaded",()=>{
    // dados do formulario
    const txt_mortgage_amount = document.getElementById("txt_mortgage_amount")
    const txt_mortgage_term = document.getElementById("txt_mortgage_term")
    const txt_interest_rate = document.getElementById("txt_interest_rate")
    // const rb_mortgage_type = document.getElementById("mortgage-type")
    const btn_calculate = document.getElementById("btn_calculate")
    
    // const img_empty = document.querySelector(".container-result .img-result-empty")
    const results_content = document.querySelector(".container-result .results-content")

    const clear_form = document.querySelector(".clear-form")
    const img_empty = document.querySelector(".img-empty")

    clear_form.addEventListener("click",(e)=>{
        e.preventDefault()

        txt_mortgage_amount.value = ""
        txt_mortgage_term.value = ""
        txt_interest_rate.value = ""
    })

    //convertendo os valores dos inputs para number    
    function calcPagamentoMensal(valorHipoteca, prazoAnos, taxaJurosAnual){
        const taxaJurosMensal = (taxaJurosAnual / 100) / 12
        const prazosMeses = prazoAnos * 12
        const pagamentoMensal = valorHipoteca * taxaJurosMensal * Math.pow(1+taxaJurosMensal, prazosMeses) / (Math.pow(1+taxaJurosMensal,prazosMeses)-1)
        return pagamentoMensal
    }
    
    btn_calculate.addEventListener("click",(e)=>{
        
        e.preventDefault()
        // obtendo o valor dos inputs dentro do evento do botão
        let valorHipoteca = Number.parseFloat(txt_mortgage_amount.value)
        let prazoAnos = Number.parseInt(txt_mortgage_term.value)
        let taxaJurosAnual = Number.parseFloat(txt_interest_rate.value)

        //validação básica dos campos
        if(isNaN(valorHipoteca) || isNaN(prazoAnos) || isNaN(taxaJurosAnual)){
            alert("por favor, insira valores válidos para todos os campos")
            return
        }
        // esconde a imagem
        // img_empty.style.display = "none"

        
        const pagamentoMensal = calcPagamentoMensal(valorHipoteca, prazoAnos, taxaJurosAnual)
        const totalPago = pagamentoMensal * prazoAnos * 12

        const formatoMoeda = new Intl.NumberFormat("en-GB",{style: 'currency', currency:'GBP'})
        const pagamentoMensalFormatado = formatoMoeda.format(pagamentoMensal)
        const totalPagoFormatado = formatoMoeda.format(totalPago)


        // Limpa o conteúdo anterior
        results_content.innerHTML = "";
        img_empty.style.display = "none"
        
        const titleResult = document.createElement("h2")
        titleResult.textContent = "Your results"
        results_content.appendChild(titleResult)


        // Cria o parágrafo de resultado
        const paragraphResult = document.createElement("p")
        paragraphResult.textContent = "Your results are shown below based on the information you provided. To adjust the results, edit the form and click \"calculate repayments\" again."
        results_content.appendChild(paragraphResult)
        
        
        const divResultSummary = document.createElement("div")
        divResultSummary.classList.add("results-summary")
        
        const pMonthly = document.createElement("p")
        pMonthly.classList.add("total-repayment-label")
        pMonthly.textContent = "Your monthly repayments"
        divResultSummary.appendChild(pMonthly)
        
        const spanMonthly = document.createElement("p")
        spanMonthly.classList.add("monthly-repayment")
        spanMonthly.textContent = pagamentoMensalFormatado
        divResultSummary.appendChild(spanMonthly)
        
        const hr = document.createElement("hr")
        divResultSummary.appendChild(hr)
        
        const pTotal = document.createElement("p")
        pTotal.classList.add("total-repayment-label")
        pTotal.textContent = "Total you'll repay over the term"
        divResultSummary.appendChild(pTotal)
        
        const spanTotal = document.createElement("p")
        spanTotal.classList.add("total-repayment")
        spanTotal.textContent = totalPagoFormatado
        divResultSummary.appendChild(spanTotal)
        
        results_content.appendChild(divResultSummary)
    })
})
