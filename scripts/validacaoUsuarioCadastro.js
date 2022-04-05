// Arquivo para normalização da tela de Cadastro


// Fazendo um atalho pra não escrever tanto no código, no momento de selecionar o ID.
function getEBI(el) {
    return document.getElementById(el)
}

function createAccount() {

    // Verificação do name
    const name = getEBI('name').value
    // Array para capturar a quantidade de palavras no nome
    let fullName = name.split(' ')
    if (name === '' || fullName.length < 2) {
        alert('Insira seu nome e sobrenome!')
    }


    // Verificação do sobrenome
    const sobrenome = getEBI('sobrenome').value
    if (/\d/.test(sobrenome) && sobrenome.length >= 4 && sobrenome.length <= 12) {
        alert('Apelido não pode conter números!')
    }


    // Verificação do e-mail 
    // TODO: Fazer o .toLoweCase para validação do e-mail
    const email = getEBI('email').value
    if (email === '' && /.com$/.test(email)) {
        alert('Insira um e-mail válido!')
    }

    // Verificação da senha
    const password = getEBI('password').value
    if (password.length < 8 || password.length > 12 || password === "") {
        alert('Senha não preenche os requisitos necessários!')
    }

    // Verificação de Confirmação de Senha
    const passwordConfirmation = getEBI('password-confirmation').value
    if (passwordConfirmation != password) {
        alert('Senhas não conferem!')
    }
    else {
        alert('Cadastro efetuado com sucesso!')
    }

    // Armazenamento de dados no localStorage
    localStorage.setItem('name', name)
    localStorage.setItem('nickname', nickname)
    localStorage.setItem('email', email)
    localStorage.setItem('password', password)

    //  Redirecionamento de index.html
    window.location.href = 'index.html'

}

