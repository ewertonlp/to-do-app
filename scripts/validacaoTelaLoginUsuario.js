// ! Validação do formulário de login (Tela Login)
//Captura as entradas de dados e ações do usuário na página de Login

let email = document.getElementById("inputEmail");
let senha = document.getElementById("inputSenha");
let btnLogin = document.getElementById('efetuarLogin');


btnLogin.addEventListener('click', evento => {

    evento.preventDefault();

    //Verifica se todos os campos estão preenchidos

    if (email.value != "" && senha.value != "") {

        // configuracao da API, encontrada na tarefa de Logar o usuário.

        let configuracaoRequisicao = {
            method: 'POST',
            body: JSON.stringify({

                "email": email.value,
                "password": senha.value

            }),

            headers: {

                'Content-type': 'application/json'
            },
        };


        // Chamando   a API
        fetch("https://ctd-todo-api.herokuapp.com/v1/users/login", configuracaoRequisicao)

            .then((response) => {

                return response.json()

            }).then(function (resposta) {
                loginSucesso(email.value, resposta.jwt)
            })
            .catch(error => {
                loginErro(error)
            });
    } else {
        alert("Todos os campos devem ser preenchidos para que possa prosseguir")
    }


});

/*  Ao obter o sucesso, recebe o json (token) do usuário*/


function loginSucesso(emailUsuario, jsonRecebido) {


    localStorage.setItem("user", JSON.stringify({
        email: emailUsuario,
        token: jsonRecebido
    }))
    alert("Login realizado com sucesso")


}

function loginErro(statusRecebido) {
    console.log("Erro ao efetuar o login");
    console.log(statusRecebido)
}