//Variável para guardar tag de nome do usuário
const nomeUsuario = querySelector('.user-info p');

//link de integração com API - recuperar dados do usuário
const urlGetMe = 'https://ctd-todo-api.herokuapp.com/v1/users/getMe';

//JWT que identifica o usuário do login
const jwtSessao = localStorage.getItem('jwt');

const tarefasPendentes = querySelector('.tarefas-pendentes');



function querySelector(el) {
    return document.querySelector(el)
}

function getById(el) {
    return document.getElementById(el)
}

function empty(input) {
    return input.value.trim() === ''
}


// Efetua logoff da página de tarefas

const btnFinalizaSessao = getById('closeApp');
btnFinalizaSessao.addEventListener('click', () => window.location = 'index.html');



window.addEventListener('load', function (evento) {

    evento.preventDefault();

    // const myHeaders = new Headers();

    // myHeaders.append('Content-Type', 'application/json');
    // myHeaders.append('Authorization', jwtSessao);

    // const requestOptions = {
    //     method: 'GET',
    //     headers: myHeaders,
    //     redirect: 'follow'
    // }

    const requestOptions = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: jwtSessao
        },
        // redirect: 'follow'
    }

    fetch(urlGetMe, requestOptions)
        .then(response => {
            if (!response.ok) {
                console.log(response);
                throw response;
                // throw new Error(`Error! status: ${response.status}`);
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

// FUNÇÃO PARA LISTAR AS TAREFAS

function listarTarefa() {

    const urlTarefa = 'https://ctd-todo-api.herokuapp.com/v1/tasks'

    const tarefa = getById('nome');

    const dataCriada = getById('timestamp');

    let skeletonRef = document.getElementById('skeleton');

    const jwtSessao = this.localStorage.getItem("jwt")

    // const myHeaders = new Headers();

    // myHeaders.append('Content-Type', 'application/json');
    // myHeaders.append('Authorization', jwtSessao);


    const settings = {
        method: 'GET',
        // headers: myHeaders
        headers: {
            'content-type': 'application/json',
            authorization: jwtSessao
        }
    }

    fetch(urlTarefa, settings)

        .then((responseTask) => responseTask.json())
        // .then(responseTask => {
        //     if (!responseTask.ok) {
        //         console.log(response);
        //         throw responseTask
        //         // throw new Error(`Error! status: ${response.status}`);
        //     } else {
        //         return responseTask.json();
        //     }
        // })

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

        });

}



// FUNÇÃO PARA CRIAR AS TAREFAS
const urlCriar = 'https://ctd-todo-api.herokuapp.com/v1/tasks';
const inputTarefa = document.getElementById('novaTarefa');
const btnNovaTarefa = querySelector('.nova-tarefa button');


function criarTarefa() {

    //o nosso data se encarrega de pegar do input a descrição da tarefa, e inicia-la como completed false,
    const data = {
        description: novaTarefa.value,
        completed: false
    };
    console.log(data);


    const settings = {

        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Authorization: jwtSessao
        },

        body: JSON.stringify(data)
    }



    fetch(urlCriar, settings)

        .then(
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

// Evento dispara Função criarTarefa() ao clicar no botao +
btnNovaTarefa.addEventListener('click', function (ev) {

    ev.preventDefault();
    criarTarefa();

})


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

