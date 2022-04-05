// Arquivo para normalização da tela de Login

function entrar() {

    // Captura as informações (e-mail e senha)
    let email = document.querySelector('#inputEmail').value;
    const emailNormalizado = email.toLowerCase();
    email.innerHTML = emailNormalizado;

    let senha = document.querySelector('#inputPassword').value;

    // Utilizando regex .test -> ele retorna true quando está correto a validação
    if (senha.length >= 8 && senha.length < 12 && /.com$/.test(email)) {

        // Armazenamento de dados no localStorage
        localStorage.setItem("login", email)

        alert("Login efetuado com sucesso! ")

        //Redirecionamento de tarefas.html
        window.location.href = "tarefas.html"
    }
}