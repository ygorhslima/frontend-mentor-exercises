document.addEventListener('DOMContentLoaded', () => {
    // Seleção de elementos do DOM
    const form = document.getElementById('form');
    const uploadArquivoInput = document.getElementById('upload-arquivo');
    const uploadBox = document.querySelector('.form__upload-box');
    const uploadIcon = uploadBox.querySelector('.form__upload-icon');
    const uploadText = uploadBox.querySelector('p');
    const fullNameInput = document.getElementById('full_name');
    const emailAddressInput = document.getElementById('email_address');
    const githubUsernameInput = document.getElementById('github_username');

    // Novas seleções para o modal
    const ticketModal = document.getElementById('ticketModal');
    const closeButton = document.querySelector('.close-button');
    const modalTicketContent = document.getElementById('modalTicketContent');

    let uploadedAvatar = null; // Para armazenar a URL da imagem carregada

    // --- Funções de Manipulação de Upload (mantém as mesmas) ---

    uploadBox.addEventListener('click', () => {
        uploadArquivoInput.click();
    });

    uploadArquivoInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            handleFileUpload(file);
        }
    });

    uploadBox.addEventListener('dragover', (event) => {
        event.preventDefault();
        uploadBox.classList.add('drag-over');
    });

    uploadBox.addEventListener('dragleave', (event) => {
        event.preventDefault();
        uploadBox.classList.remove('drag-over');
    });

    uploadBox.addEventListener('drop', (event) => {
        event.preventDefault();
        uploadBox.classList.remove('drag-over');
        const file = event.dataTransfer.files[0];
        if (file) {
            handleFileUpload(file);
        }
    });

    function handleFileUpload(file) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                uploadBox.style.backgroundImage = `url(${e.target.result})`;
                uploadBox.style.backgroundSize = 'cover';
                uploadBox.style.backgroundPosition = 'center';
                uploadBox.style.border = 'none';
                uploadIcon.style.display = 'none';
                uploadText.textContent = file.name;
                uploadText.style.fontSize = '0.8em';
                uploadText.style.marginTop = '0';
                uploadedAvatar = e.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            alert('Por favor, faça upload de um arquivo de imagem.');
            uploadBox.style.backgroundImage = 'none';
            uploadBox.style.border = '2px dashed #888';
            uploadIcon.style.display = 'block';
            uploadText.textContent = 'Arraste e solte ou clique para fazer upload';
            uploadText.style.fontSize = '1em';
            uploadText.style.marginTop = '10px';
            uploadedAvatar = null;
        }
    }

    // --- Validação e Geração do Ticket (ajustada para o modal) ---

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const fullName = fullNameInput.value.trim();
        const emailAddress = emailAddressInput.value.trim();
        const githubUsername = githubUsernameInput.value.trim();

        if (!fullName || !emailAddress || !githubUsername) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        if (!isValidEmail(emailAddress)) {
            alert('Por favor, insira um endereço de e-mail válido.');
            return;
        }

        // Se todas as validações passarem, gera o ticket e exibe no modal
        generateTicket(fullName, emailAddress, githubUsername, uploadedAvatar);
    });

    // Função para gerar o HTML do ticket e exibi-lo no modal
    function generateTicket(fullName, emailAddress, githubUsername, avatarUrl) {
        // Obtenha a data atual para o ano da conferência (se não for fixa)
        const currentYear = new Date().getFullYear();
        // A conferência é em 2025, então se o ano atual for 2025 ou posterior, mantém 2025.
        // Se for antes de 2025, ainda coloca 2025. (Ajustado com base na data de hoje).
        const conferenceYear = 2025; 

        // URL do avatar do GitHub
        const githubAvatarUrl = `https://github.com/${githubUsername.replace('@', '')}.png`;
        let ticket = `./assets/images/pattern-ticket.svg` 
        const ticketHTML = `
            <div class="ticket-generated">
                <div class="ticket-generated__message">
                    <p class="ticket-generated__congrats">Parabéns, <span class="highlight">${fullName}</span>! Seu ticket está pronto.</p>
                    <p class="ticket-generated__email-info">Enviamos seu ticket para <span class="highlight">${emailAddress}</span> e enviaremos atualizações até o evento.</p>
                </div>

                <div class="ticket-card">
                    <div class="ticket-card__header">
                        <img src="assets/images/logo-full.svg" alt="Coding Conf Logo" class="ticket-card__logo">
                        <div class="ticket-card__title">Coding Conf</div>
                    </div>
                    <div class="ticket-card__body">
                        <div class="ticket-card__details">
                            <p><strong>Data:</strong> 31 de Janeiro, ${conferenceYear}</p>
                            <p><strong>Local:</strong> Austin, TX</p>
                        </div>
                        <div class="ticket-card__user-info">
                            <img src="${avatarUrl || githubAvatarUrl}" onerror="this.onerror=null;this.src='https://via.placeholder.com/100/333333/FFFFFF?text=No+Avatar';" alt="User Avatar" class="ticket-card__avatar">
                            <div class="ticket-card__name">${fullName}</div>
                            <div class="ticket-card__github">@${githubUsername.replace('@', '')}</div>
                        </div>
                    </div>
                </div>

                <div class="attribution">
                    Desafio por <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.
                    Codificado por <a href="#">Seu Nome Aqui</a>.
                </div>
            </div>
        `;

        // Insere o HTML do ticket no conteúdo do modal
        modalTicketContent.innerHTML = ticketHTML;
        // Exibe o modal
        ticketModal.style.display = 'flex'; // Usamos 'flex' para centralizar com justify-content/align-items
    }

    // --- Fechar o Modal ---

    // Fecha o modal ao clicar no botão de fechar
    closeButton.addEventListener('click', () => {
        ticketModal.style.display = 'none';
    });

    // Fecha o modal ao clicar fora da área do conteúdo do modal
    window.addEventListener('click', (event) => {
        if (event.target === ticketModal) {
            ticketModal.style.display = 'none';
        }
    });

    // Opcional: limpar o formulário após gerar o ticket
    form.reset(); // Limpa todos os campos
    // Também resetar a caixa de upload
    uploadedAvatar = null;
    uploadBox.style.backgroundImage = 'none';
    uploadBox.style.border = '2px dashed #888';
    uploadIcon.style.display = 'block';
    uploadText.textContent = 'Arraste e solte ou clique para fazer upload';
    uploadText.style.fontSize = '1em';
    uploadText.style.marginTop = '10px';
});