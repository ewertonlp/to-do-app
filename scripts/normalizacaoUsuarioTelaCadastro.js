// ! Normalização da tela de Cadastro de usuário

// Fazendo um atalho pra não escrever tanto no código, no momento de selecionar o ID.
function getEBI(el) {
    return document.getElementById(el)
}

// Variável para apresentar os error no HTML com erros
const mensagemErro = getEBI('mensagemErro')

// Criar Cadastro
function createAccount() {

    // TODO: Arrumar o nome e sobrenome as validações, pois está dando erro no momento de cadastrar (não pode haver numeros)
    // Verificação do nome: Não pode estar vazio e não pode conter números.
    const nome = getEBI('inputNomeCadastro').value
    if (nome === '') {

        // Mostrar menagem de erro (Nome)
        mensagemErro.innerHTML += "<font color='red'> <br> <p>Preencha todos os campos <br></p> </font>"
        mensagemErro.innerHTML += "<label><strong>Nome:</strong> Insira um nome válido<br></label>"

    }


    //  Verificação do sobrenome: Não pode estar vazio e não pode conter números.
    const sobrenome = getEBI('inputSobrenomeCadastro').value
    if (sobrenome === '') {

        // Mostrar menagem de erro (Sobrenome)
        mensagemErro.innerHTML += "<font color='red'> <br> <p>Preencha todos os campos <br></p> </font>"
        mensagemErro.innerHTML += '<label><strong>Sobrenome:</strong> Insira um sobrenome válido <br></label>'
    }


    // Verificação do e-mail 
    // TODO: Fazer o .toLoweCase para validação do e-mail
    const email = getEBI('inputEmailCadastro').value

    // Mostrar menagem de erro (E-mail)
    if (/\S+@\S+\.\S+/.test(email) === false || email === ' ' || email === null || email === undefined) {
        mensagemErro.innerHTML += "<font color='red'> <br> <p>Preencha todos os campos <br></p> </font>"
        mensagemErro.innerHTML += "<label><strong>E-mail:</strong> Insira um e-mail válido! <br> <em>Exemplo: algumtexto@algumtexto.com</em> <br></label>"
    }


    // Verificação da senha
    const password = getEBI('inputSenhaCadastro').value
    if (password.length < 8 || password.length > 12 || password === "") {

        // Mostrar menagem de erro (Senha)
        mensagemErro.innerHTML += "<font color='red'> <br> <p>Preencha todos os campos <br></p> </font>"
        mensagemErro.innerHTML += "<label> <strong>Senha:</strong>Senha: A senha deve conter entre 8 e 12 caracteres!</label>"
    }

    // Verificação de Confirmação de Senha
    const passwordConfirmation = getEBI('inputRepetirSenhaCadastro').value
    if (passwordConfirmation != password) {

        // Mostrar menagem de erro (Confirmação de Senha)
        mensagemErro.innerHTML += "<font color='red'> <br> <p>Preencha todos os campos <br></p> </font>"
        mensagemErro.innerHTML += "<label> <strong>Confirmação de senha:</strong>Senhas não conferem!</label>"

    } else {
        // Se todos os campos estiverem OK, então redirecionamos para a pagina de tarefas;
        // window.location.href = "tarefas.html"
    }

}