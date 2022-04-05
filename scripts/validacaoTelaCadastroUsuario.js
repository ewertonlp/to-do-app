// ! Validação da tela de Cadastro de usuário 

//Captura as entradas de dados e ações do usuário na página de cadastro 
let nome = document.getElementById("inputNomeCadastro");
let sobrenome = document.getElementById("inputSobrenomeCadastro");
let email = document.getElementById("inputEmailCadastro");
let senha = document.getElementById("inputSenhaCadastro");
let repetirSenha = document.getElementById("inputRepetirSenhaCadastro");
let botaoCriarConta = document.getElementById("botaoCriarContaCadastro");

botaoCriarConta.addEventListener('click', evento => {

    evento.preventDefault();

    //Verifica se todos os campos estão preenchidos
    if (nome.value != "" && sobrenome.value != "" && email.value != "" && senha.value != "" &&
        repetirSenha.value != "") {

        // configuracao da API, encontrada na tarefa de criar Usuario.
        let configuracaoRequisicaoCadastro = {
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


        // Chamando   a API
        fetch("https://ctd-todo-api.herokuapp.com/v1/users", configuracaoRequisicaoCadastro)

            .then((response) => {
                return response.json();
            })
            .then(function (resposta) {
                cadastroSucesso(nome.value, sobrenome.value, email.value, resposta.jwt)
            })
            .catch(error => {
                cadastroErro(error)
            });

    } else {

        alert("Preencha todos os campos")

    }


});

/*  Ao obter o sucesso, recebe o json (token) do usuário*/
function cadastroSucesso(nomeUsuario, sobrenomeUsuario, emailUsuario, jsonRecebido) {

    // Atribui os dados ao localStorage com o Nome do User, Sobrenome e o Token
    localStorage.setItem("user", JSON.stringify({
        nome: nomeUsuario,
        sobrenome: sobrenomeUsuario,
        email: emailUsuario,
        token: jsonRecebido
    }))

    // Alerta de sucesso
    alert("Usuário cadastrado com sucesso")

    // Se todos os campos estiverem OK, então redirecionamos para a pagina de tarefas;
    window.location.href = "tarefas.html"

}

// Caso ocorra algum erro, mostra o erro no console
function cadastroErro(statusRecebido) {

    console.log("Erro ao cadastrar");
    console.log(statusRecebido)
}