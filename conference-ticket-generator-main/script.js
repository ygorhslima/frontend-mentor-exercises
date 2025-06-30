const inputArquivoImagem = document.querySelector("#upload-arquivo")
const avatarPreview = document.querySelector("#avatarPreview")
const uploadText = document.querySelector("#uploadText")
const btn_remover = document.querySelector("#btn-remover")
const btn_trocar = document.querySelector("#btn-trocar")

inputArquivoImagem.addEventListener("change", ()=>{
    const file = inputArquivoImagem.files[0];

    if (file && file.type.startsWith("image/")){
        /**objeto utilizado para ler o arquivo */
        const reader = new FileReader()

        // quando o leitor terminar de carregar a imagem
        reader.onload = function (e) {
            // define o src da imagem para o resultado do FileReader
            avatarPreview.src = e.target.result;

            // Ajusta a imagem para preencher a área corretamente
            avatarPreview.style.objectFit = "cover"
            // Oculta o texto de instrução "Drag and drop or click to upload"
            uploadText.style.display = "none"
            //habilita o botão "remove image"
            btn_remover.disabled = false
        }
        //inicia a leitura do arquivo como uma url base64
        reader.readAsDataURL(file)
    }else{
        // Caso o arquivo não seja válido, volta para o ícone padrão
        avatarPreview.src = "./assets/images/icon-upload.svg"

        // Mostra o texto de instrução novamente
        uploadText.style.display = "block";

        // Desabilita o botão de remover
        btn_remover.disabled = true;
    }
})

btn_remover.addEventListener("click",(e)=>{
    e.preventDefault()
    inputArquivoImagem.value = ""
    avatarPreview.src = "./assets/images/icon-upload.svg"
    uploadText.style.display = "block"
    btn_remover.disabled = true
})
btn_trocar.addEventListener("click",(e)=>{
    e.preventDefault()
    inputArquivoImagem.click()
})



/**dados da pessoa */
const full_name = document.querySelector("#full_name")
const email_address = document.querySelector("#email_address")
const github_username = document.querySelector("#github_username")

const btn_gerar_ticket = document.querySelector("#btn_gerar_ticket")

btn_gerar_ticket.addEventListener("click",(e)=>{
    e.preventDefault() // Impede o envio do form
    // obtendo os valores do formulário

    /**OBTENDO OS VALORES DOS DADOS DO FORMULÁRIO */
    const nome = full_name.value
    const email = email_address.value
    const github = github_username.value 
    const file = inputArquivoImagem.files[0]

    /**renderizando o arquivo da imagem junto dos dados */
    const reader = new FileReader()
    
    reader.onload = function(e){
        /**CRIANDO UM OBJETO PARA ADICIONAR OS DADOS NO LOCALSTORAGE */
        const dadosUsuario ={
            nome,
            email,
            github,
            avatarBase64: e.target.result // imagem convertida em texto base64
        }

        // Salva no localStorage
        /**muito impotante: adicionando os dados com a chave usuário_ticket que será utilizado na outra página, convertendo esse objeto em JSON */
        localStorage.setItem("usuario_ticket", JSON.stringify(dadosUsuario))

        // Redireciona para a página do ticket após o clique do botão
        window.location.href = "gerar_ticket.html"
    }
    reader.readAsDataURL(file)
})