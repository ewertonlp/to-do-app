// Normalização da tela de Cadastro de usuário
const form = document.querySelector('#form-cadastro');
const nome = document.querySelector('#inputNome');
const labelNome = document.querySelector('#labelNome');

const sobrenome = document.querySelector('#inputSobrenome');
const labelSobrenome = document.querySelector('#labelSobrenome');

const email = document.querySelector('#inputEmail');
const labelEmail = document.querySelector('#labelEmail');

const password = document.querySelector('#inputSenha');
const labelSenha = document.querySelector('#labelSenha');

const passwordConfirmaton = document.querySelector('#inputRepetirSenha');
const labelRepetirSenha = document.querySelector('#labelRepetirSenha');


const btnCadastro = document.querySelector('#btn-cadastro');
const btnVerSenha = document.querySelector("#verSenha");
const btnVerConfirmSenha = document.querySelector('#verConfirmSenha');

const regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const msgError = document.querySelector("#msgError");
const msgSuccess = document.querySelector("#msgSuccess");

const cadastroURL = 'https://ctd-todo-api.herokuapp.com/v1/users/';



// Função para Validação dos Inputs
btnCadastro.addEventListener('click', (e) => {
    e.preventDefault();

    if (nome.value != "" && sobrenome.value != "" && email.value != "" && password.value != "" &&
        passwordConfirmaton.value != "") {


        // Criamos objeto para receber as variáveis de cadastro.
        const data = {
            nome: nome.value,
            sobrenome: sobrenome.value,
            email: email.value,
            password: password.value,
            passwordConfirmaton: passwordConfirmaton.value
        }

        const settings = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },

            body:

                JSON.stringify(data),
        };

        // Chamando   a API
        fetch(cadastroURL, settings)

            .then((response) => {
                return response.json();
            })
            .then(function (resposta) {

                console.log(resposta.jwt)
                cadastroSucesso(nome.value, sobrenome.value, email.value, resposta.jwt)
            })
            .catch(error => {
                cadastroErro(error)
            });



    } else {
        // Exibe mensagem quando houver erro nos campos Input
        msgError.setAttribute('style', 'display:block');
        msgError.innerHTML = '<strong>Erro ao cadastrar usuário, tente novamente!</strong>'
        msgSuccess.innerHTML = ''
        msgSuccess.setAttribute('style', 'display:none')
    }


    /*  Ao obter o sucesso, recebe o json (token) do usuário*/
    function cadastroSucesso(nomeUsuario, sobrenomeUsuario, emailUsuario, jsonRecebido) {

        // Atribui os dados ao localStorage com o Nome do User, Sobrenome e o Token
        localStorage.setItem("user", JSON.stringify({
            nome: nomeUsuario,
            sobrenome: sobrenomeUsuario,
            email: emailUsuario,
            token: jsonRecebido
        }))

        // Exibe mensagem de sucesso
        msgSuccess.setAttribute('style', 'display:block');
        msgSuccess.innerHTML = '<strong>Usuário cadastrado com sucesso.</strong>'
        msgError.setAttribute('style', 'display:none')
        msgError.innerHTML = ''

        // Se todos os campos estiverem OK, então redirecionamos para a pagina de tarefas;
        setTimeout(() => {
            window.location.href = "tarefas.html"
        }, 3000)
    }


    // Caso ocorra algum erro, mostra o erro no console
    function cadastroErro(statusRecebido) {

        console.log("Erro ao cadastrar");
        console.log(statusRecebido)
    }
});




// ------------ Normalização dos campos Input  ------------------//  
nome.addEventListener('keyup', () => {

    if (nome.value === "") {
        console.log(nome)
        labelNome.setAttribute('style', 'color: #D85A5A');
        labelNome.innerHTML = '<strong>Nome (Este campo não pode estar vazio)</strong>'
        nome.setAttribute('style', 'border-color: #D85A5A');
    } else {
        labelNome.setAttribute('style', 'color: #4ECa64');
        labelNome.innerHTML = 'Nome';
        nome.setAttribute('style', 'border-color: #4ECa64');

    }
});

sobrenome.addEventListener('keyup', () => {

    if (sobrenome.value === "") {
        labelSobrenome.setAttribute('style', 'color: #D85A5A');
        labelSobrenome.innerHTML = '<strong>Sobrenome (Este campo não pode estar vazio)</strong>'
        sobrenome.setAttribute('style', 'border-color: #D85A5A');
    } else {
        labelSobrenome.setAttribute('style', 'color: #4ECa64');
        labelSobrenome.innerHTML = 'Sobrenome:';
        sobrenome.setAttribute('style', 'border-color: #4ECa64');

    }
});

email.addEventListener('keyup', () => {

    // let inputEmail = email.value.toLowerCase();
    // email.value = inputEmail;

    if (regexMail.test(email.value) == false) {
        labelEmail.setAttribute('style', 'color: #D85A5A');
        labelEmail.innerHTML = '<strong>Email (email inválido ou campo vazio)</strong>'
        email.setAttribute('style', 'border-color: #D85A5A');
    } else {
        labelEmail.setAttribute('style', 'color: #4ECa64');
        labelEmail.innerHTML = 'Email:';
        email.setAttribute('style', 'border-color: #4ECa64');

    }
});


password.addEventListener('keyup', () => {

    if (password.value.length < 8 || password.value.length > 12 || password === "") {
        labelSenha.setAttribute('style', 'color: #D85A5A');
        labelSenha.innerHTML = '<strong>Senha deve conter entre 8 e 12 caracteres</strong>'
        password.setAttribute('style', 'border-color: #D85A5A');
    } else {
        labelSenha.setAttribute('style', 'color: #4ECa64');
        labelSenha.innerHTML = 'Senha:';
        password.setAttribute('style', 'border-color: #4ECa64');

    }
});

passwordConfirmaton.addEventListener('keyup', () => {

    if (passwordConfirmaton.value != password.value || passwordConfirmaton.value == "") {
        labelRepetirSenha.setAttribute('style', 'color: #D85A5A');
        labelRepetirSenha.innerHTML = '<strong>As senhas não conferem</strong>'
        passwordConfirmaton.setAttribute('style', 'border-color: #D85A5A');
    } else {
        labelRepetirSenha.setAttribute('style', 'color: #4ECa64');
        labelRepetirSenha.innerHTML = 'Confirme sua Senha:';
        passwordConfirmaton.setAttribute('style', 'border-color: #4ECa64');

    }
});



// ---------- Lógica para  mostrar e esconder senha ------------- //
btnVerSenha.addEventListener('click', () => {
    let inputPassword = document.querySelector('#inputSenha');

    if (inputPassword.getAttribute('type') == 'password') {
        inputPassword.setAttribute('type', 'text')
    } else {
        inputPassword.setAttribute('type', 'password')
    }
})

btnVerConfirmSenha.addEventListener('click', () => {
    let inputPassword = document.querySelector('#inputRepetirSenha');
    if (inputPassword.getAttribute('type') == 'password') {
        inputPassword.setAttribute('type', 'text')
    } else {
        inputPassword.setAttribute('type', 'password')
    }
})