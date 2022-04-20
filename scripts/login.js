// Reservando as informações dos inputs em variáveis.
const inputEmail = document.getElementById('inputEmail');
const labelEmail = document.querySelector('#labelEmail');
const inputPassword = document.getElementById('inputPassword');
const labelSenha = document.querySelector('#labelSenha');
const btnVerSenha = document.querySelector("#verSenha");
const regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const msgError = document.querySelector('#msgError');
const msgSuccess = document.querySelector('#msgSuccess');

// Trazer URL base da API com endpoint Login
const loginUrl = 'https://ctd-todo-api.herokuapp.com/v1/users/login';


// Função utilizada ao clicar no botão
function login() {

    // normalizamos o campo de email, recebendo o que é digitado e armazenamos na variável email.
    let email = inputEmail.value.toLowerCase();
    inputEmail.value = email;

    // o mesmo é feito para a variável senha. 
    let senha = inputPassword.value


    // se o email digitado passar pelo teste do regex, o mesmo é armazenado na localStorage.
    if (regexMail.test(email)) {
        localStorage.setItem('login', JSON.stringify({
            email: email
        }));


        // Aqui passamos então um objeto, que receberá a variável email e senha como valor para os dois campos obrigatórios para nosso body.
        const data = {
            email: email,
            password: senha,
        };


        // neste console log trazemos então para o  data, o email e senha do usuário.
        console.log(data);

        // criamos uma variável para armazenar as configurações da API e do endpoint , como o seu método e o seu header.
        const settings = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },

            // então chamamos a variável data que recebeu os valores dos campos, e aplicamos o JSON stringfy para tornar o objeto um JSON.
            body:

                JSON.stringify(data),
        };


        // passamos então como parâmetro a variável que contem a URL, e a variável que contem as configurações
        fetch(loginUrl, settings)

            // aqui usamos response para validar se positiva, retornamos a response.json
            .then(response => {
                if (response.status === 201) {

                    console.log(response)
                    return response.json()
                }

                // se não enviado para o catch e apresentado erro de login.
                throw response;
            })

            // com a resposta usamos uma simples função para armazenar o JWT no localStorage, como é proposto pelo exercício.

            .then(function (resposta) {

                // neste console podemos ver como resposta o JWT que é gerado ao logar com sucesso.
                console.log(resposta)
                alert("Login efetuado com sucesso!");

                loginSucesso(resposta.jwt);

            })
            .catch(err => {
                console.log(err);
                alert("Falha no login!")
            });

        // temos então um else para caso reprovado no test do regex, ele apresente a mensagem de formato invalido.
    } else {
        alert("Formato de email invalido")
    }

    function loginSucesso(jwtRecebido) {

        console.log(jwtRecebido);

        // Após obter o jwt, salva no localStorage ou SessionStorage
        localStorage.setItem("jwt", jwtRecebido);

        // Direciona o usuário para a tela de tarefas após sucesso ao logar
        window.location.href = "tarefas.html"
    }

    mostrarSpinner();

}

// ----------- Normalização dos campos Email e Senha ------- //
inputEmail.addEventListener('keyup', (event) => {

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


inputPassword.addEventListener('keyup', () => {

    if (inputPassword.value.length < 8 || inputPassword.value.length > 12 || inputPassword === "") {
        labelSenha.setAttribute('style', 'color: #D85A5A');
        labelSenha.innerHTML = '<strong>Senha deve conter entre 8 e 12 caracteres</strong>'
        inputPassword.setAttribute('style', 'border-color: #D85A5A');
    } else {
        labelSenha.setAttribute('style', 'color: #4ECa64');
        labelSenha.innerHTML = 'Senha:';
        inputPassword.setAttribute('style', 'border-color: #4ECa64');

    }
});



// ---------- Lógica para  mostrar e esconder senha ------------- //
btnVerSenha.addEventListener('click', (e) => {
    let senha = document.querySelector('#inputPassword');

    if (senha.getAttribute('type') == 'password') {
        senha.setAttribute('type', 'text')
    } else {
        senha.setAttribute('type', 'password')
    }
});