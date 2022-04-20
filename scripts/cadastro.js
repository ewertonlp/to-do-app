//Captura as entradas de dados e ações do usuário na página de cadastro 
const nome = document.getElementById("inputNome");
const labelNome = document.getElementById('labelNome');
const sobrenome = document.getElementById("inputSobrenome");
const labelSobrenome = document.getElementById('labelSobrenome');
const email = document.getElementById("inputEmail");
const labelEmail = document.getElementById('labelEmail');
const senha = document.getElementById("inputSenha");
const labelSenha = document.getElementById('labelSenha');
const repetirSenha = document.getElementById("inputRepetirSenha");
const labelRepetirSenha = document.getElementById('labelRepetirSenha');
const botaoCriarConta = document.getElementById("botaoCriarContaCadastro");

const regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const btnVerSenha = document.querySelector("#verSenha");
const btnVerConfirmSenha = document.querySelector("#verConfirmSenha");

botaoCriarConta.addEventListener('click', evento => {

    evento.preventDefault();

    //Verifica se todos os campos estão preenchidos

    if (nome.value != "" && sobrenome.value != "" && email.value != "" && senha.value != "" &&
        repetirSenha.value != "") {

        // configuracao da API, encontrada na tarefa de criar Usuario.

        let configuracaoRequisicao = {
            method: 'POST',
            body: JSON.stringify({

                firstName: nome.value,
                lastName: sobrenome.value,
                email: email.value,
                password: senha.value

            }),

            headers: {

                'Content-type': 'application/json'
            },
        };


        // ------------ Chamando a API ---------------------//

        fetch("https://ctd-todo-api.herokuapp.com/v1/users", configuracaoRequisicao)

            .then((response) => {
                // verifica se o status se é 201, que é o status ok. Se não entra no catch.
                if (response.status == 201) {
                    return response.json()
                }
                /* Se o código for diferente de sucesso (201), lança um throw para que a execução caia no Catch() */
                throw response;
            }).then(function (resposta) {
                cadastroSucesso(nome.value, sobrenome.value, email.value, resposta.jwt)
            })
            .catch(error => {
                cadastroErro(error)
            });

    } else {

        alert("Todos os campos devem ser preenchidos para que possa prosseguir")
    }

    mostrarSpinner();
});

/*  Ao obter o sucesso, recebe o json (token) do usuário*/
function cadastroSucesso(nome, sobrenome, email, jsonRecebido) {

    localStorage.setItem("user", JSON.stringify({ nome: nome, sobrenome: sobrenome, email: email, token: jsonRecebido }))

    alert("Usuário cadastrado com sucesso")

    // e então redirecionamos para a pagina de tarefas;
    window.location.href = "../index.html"

}

function cadastroErro(statusRecebido) {

    console.log("Erro ao cadastrar");

    console.log(statusRecebido);
    alert("Erro ao cadastrar usuário")
}




// ----------- Normalização dos campos Email e Senha ------- //
nome.addEventListener('keyup', (event) => {

    if (nome.value.length < 3 || nome.value.length === "") {
        labelNome.setAttribute('style', 'color: #D85A5A');
        labelNome.innerHTML = '<strong>Nome (não pode estar vazio)</strong>'
        nome.setAttribute('style', 'border-color: #D85A5A');
    } else {
        labelNome.setAttribute('style', 'color: #4ECa64');
        labelNome.innerHTML = 'Nome:';
        nome.setAttribute('style', 'border-color: #4ECa64');
    }
})


sobrenome.addEventListener('keyup', (event) => {

    if (sobrenome.value.length < 3 || nome.value.length === "") {
        labelSobrenome.setAttribute('style', 'color: #D85A5A');
        labelSobrenome.innerHTML = '<strong>Sobrenome (não pode estar vazio)</strong>'
        sobrenome.setAttribute('style', 'border-color: #D85A5A');
    } else {
        labelSobrenome.setAttribute('style', 'color: #4ECa64');
        labelSobrenome.innerHTML = 'Sobrenome:';
        sobrenome.setAttribute('style', 'border-color: #4ECa64');
    }
})



email.addEventListener('keyup', (event) => {

    if (regexMail.test(inputEmail.value) == false) {
        labelEmail.setAttribute('style', 'color: #D85A5A');
        labelEmail.innerHTML = '<strong>Email (email inválido ou campo vazio)</strong>'
        inputEmail.setAttribute('style', 'border-color: #D85A5A');
    } else {
        labelEmail.setAttribute('style', 'color: #4ECa64');
        labelEmail.innerHTML = 'Email:';
        inputEmail.setAttribute('style', 'border-color: #4ECa64');

    }

    event.preventDefault();
});

senha.addEventListener('keyup', () => {

    if (senha.value.length < 8 || senha.value.length > 12 || senha === "") {
        labelSenha.setAttribute('style', 'color: #D85A5A');
        labelSenha.innerHTML = '<strong>Senha deve conter entre 8 e 12 caracteres</strong>'
        senha.setAttribute('style', 'border-color: #D85A5A');
    } else {
        labelSenha.setAttribute('style', 'color: #4ECa64');
        labelSenha.innerHTML = 'Senha:';
        senha.setAttribute('style', 'border-color: #4ECa64');

    }
});


repetirSenha.addEventListener('keyup', () => {

    if (repetirSenha.value !== senha.value) {
        labelRepetirSenha.setAttribute('style', 'color: #D85A5A');
        labelRepetirSenha.innerHTML = '<strong>Senhas não conferem</strong>'
        repetirSenha.setAttribute('style', 'border-color: #D85A5A');
    } else {
        labelRepetirSenha.setAttribute('style', 'color: #4ECa64');
        labelRepetirSenha.innerHTML = 'Senha:';
        repetirSenha.setAttribute('style', 'border-color: #4ECa64');

    }
});



// ---------- Lógica para  mostrar e esconder senha ------------- //
btnVerSenha.addEventListener('click', (e) => {
    let senha = document.querySelector('#inputSenha');


    if (senha.getAttribute('type') == 'password') {
        senha.setAttribute('type', 'text')
    } else {
        senha.setAttribute('type', 'password')
    }
});


btnVerConfirmSenha.addEventListener('click', (e) => {
    let confirmSenha = document.querySelector('#inputRepetirSenha');

    if (confirmSenha.getAttribute('type') == 'password') {
        confirmSenha.setAttribute('type', 'text')
    } else {
        confirmSenha.setAttribute('type', 'password')
    }
});