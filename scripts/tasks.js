function querySelector(el) {
    return document.querySelector(el)
}

function getById(el) {
    return document.getElementById(el)
}

function empty(input) {
    return input.value.trim() === ''
}

const tarefasPendentes = querySelector('.tarefas-pendentes');

// Efetua logoff da página de tarefas

const btnFinalizaSessao = getById('closeApp');

btnFinalizaSessao.addEventListener('click', () => window.location = 'index.html');

//Variável para guardar tag de nome do usuário
const nomeUsuario = querySelector('.user-info p');

//link de integração com API - recuperar dados do usuário
const urlGetMe = 'https://ctd-todo-api.herokuapp.com/v1/users/getMe';

//JWT que identifica o usuário do login
const jwtSessao = localStorage.getItem('jwt');

window.addEventListener('load', function (evento) {

    evento.preventDefault();

    const myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', jwtSessao);

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    }

    fetch(urlGetMe, requestOptions)
        .then(response => {
            if (!response.ok) {
                console.log(response);
                throw new Error(`Error! status: ${response.status}`);
            } else {
                return response.json();
            }
        })
        .then(result => {
            console.log(result);
            //atribui o nome do usuário na tag correspondente
            nomeUsuario.innerHTML = `${result.firstName} ${result.lastName}`
        })
        .catch(err => {

            console.log(err)
            alert("Falha ao validar as informações do usuario!")
        })

})

function listarTarefa() {

    const urlTarefa = 'https://ctd-todo-api.herokuapp.com/v1/tasks'

    // const tarefa = getById('nome');

    // const dataCriada = getById('timestamp');



    let skeletonRef = getById('#skeleton');

    const myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', jwtSessao);


    const settings = {
        method: 'GET',
        headers: myHeaders
    }

    fetch(urlTarefa, settings)
        .then(responseTask => {
            if (!responseTask.ok) {
                console.log(response);
                throw new Error(`Error! status: ${response.status}`);
            } else {
                return response.json();
            }
        })
        .then(function (tasks) {
            // é necessário que o skeleton, que nada mais é que a parte do código sem os dados inseridos com template string, fiquem desabilitado
            //quando é recebido o response pela API

            skeletonRef.style.display = 'none'

            // e então efetuamos o map, onde trazemos de cada tarefa,a  sua descrição especifica, e quando ela foi criada
            //usando template string.
            tasks.map((task) => {

                console.log(task.description)
                console.log(task.createdAt)

                tarefasPendentes.innerHTML
                    += `<li class="tarefa">
                    <div class="not-done"></div>
                    <div class="descricao">
                    <p class="nome">${task.description}</p>
                    <p class="timestamp">${task.createdAt}</p>
                    </div>
                    </li>`

            })
        })

        // neste console log validamos se ele está trazendo o nome do usuario corretamente do login que acessamos no JWT.


        .catch(err => {
            console.log(err);
            alert("Falha ao validar as tarefas do usuario!")


        })

}

const urlCriar = 'https://ctd-todo-api.herokuapp.com/v1/tasks';

const configCriar = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('jwt')
    },
    body: ''

};

function criarTarefa() {

    fetch(urlCriar, configCriar)
        .then(response => response.json())

}

const inputTarefa = document.getElementById('novaTarefa');
const btnNovaTarefa = querySelector('.nova-tarefa button');

btnNovaTarefa.addEventListener('click', function (ev) {

    ev.preventDefault();

    criarTarefa();

})



let configuracaoCriar = {

    method: 'POST',
    body: '',

    headers: {

        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('jwtSessao')

    }
}


function criarTarefa() {

    const urlCriar = 'https://ctd-todo-api.herokuapp.com/v1/tasks'

    configuracaoCriar.body = JSON.stringify({

        description: inputTarefa.value,
        completed: false
    })

    console.log(inputTarefa.value)

    inputTarefa.value = ''

    fetch(urlCriar, configuracaoCriar).then(

        response => {
            response.json().then(

                task => {

                    console.log(task.description, task.completed);
                    const dataFormatada = new Date(task.createdAt).toLocaleDateString(
                        'pt-BR', {

                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    }

                    )

                    tarefasPendentes.innerHTML = `
                        <li class="tarefa">
                            <div class="not-done"></div>
                            <div class="descricao">
                                <p class="nome">${task.description}</p>
                                <p class="timestamp">Criada em: ${dataFormatada}</p>
                            </div> `

                })

        }
    )

}



window.addEventListener('load', () => {


    // se o token recebido for undefined, ele deslogue o usuario.


    if (localStorage.getItem('jwt') === 'undefined') {

        alert('token indefinido!')
    } else {

        listarTarefa()

        btnNovaTarefa.addEventListener('click', event => {

            event.preventDefault()

            criarTarefa()
        })



    }


})