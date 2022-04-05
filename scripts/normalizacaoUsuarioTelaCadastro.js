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
        mensagemErro.innerHTML = "<label><font color='red'><strong>Nome:</strong></font> Insira um nome válido<br></label>"

    }


    //  Verificação do sobrenome: Não pode estar vazio e não pode conter números.
    const sobrenome = getEBI('inputSobrenomeCadastro').value.capitalize()
    if (sobrenome === '') {

        // Mostrar menagem de erro (Sobrenome)
        mensagemErro.innerHTML += "<label><font color='red'><strong> Sobrenome:</strong></font> Insira um nome válido<br></label>"
    }



    // Verificação do e-mail 
    // TODO: Fazer o .toLoweCase para validação do e-mail
    const email = getEBI('inputEmailCadastro').value


    if (/\S+@\S+\.\S+/.test(email) === false || email === ' ' || email === null || email === undefined) {

        // Mostrar menagem de erro (E-mail)
        mensagemErro.innerHTML += "<label><font color='red'><strong> E-mail:</strong></font> Insira um e-mail válido! <br> <em>Exemplo: algumtexto@algumtexto.com</em> <br></label>"

    }

    // Verificação da senha
    const password = getEBI('inputSenhaCadastro').value
    if (password.length < 8 || password.length > 12 || password === "") {

        // Mostrar menagem de erro (Senha)
        mensagemErro.innerHTML += "<label><font color='red'><strong> Senha:</strong></font> A senha deve conter entre 8 e 12 caracteres! <br></label>"
    }

    // Verificação de Confirmação de Senha
    const passwordConfirmation = getEBI('inputRepetirSenhaCadastro').value
    if (passwordConfirmation != password) {

        // Mostrar menagem de erro (Confirmação de Senha)
        mensagemErro.innerHTML += "<label><font color='red'><strong> Confirmação de senha::</strong></font> As senhas precisam ser iguais <br></label>"

    } else {

    }

}