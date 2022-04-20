// Verificar se existe a chave jwt no localStorage e redireciona para o login em caso negativo
if (!localStorage.jwt) {
    location.replace('login.html');
}

//Variável para guardar tag de nome do usuário
const nomeUsuario = querySelector('.user-info p');

//links de integração com API
const urlAPI = 'https://ctd-todo-api.herokuapp.com/v1/';

//JWT que identifica o usuário do login
const jwtSessao = localStorage.getItem('jwt');
console.log(jwtSessao);

const tarefasPendentes = querySelector('.tarefas-pendentes');
const tarefasTerminadas = querySelector('.tarefas-terminadas');


//Funções de atalho para chamadas
function querySelector(el) {
    return document.querySelector(el)
}

function getById(el) {
    return document.getElementById(el)
}

function empty(input) {
    return input.value.trim() === ''
}



// Efetuar logoff da página de tarefas
// Pega o botão de finalizar sessão
const btnFinalizaSessao = getById('closeApp');
//Verifica se o usuáio deseja realmente finalizar a sessão e apaga o jwt por segurança
btnFinalizaSessao.addEventListener('click', function () {
    let confirmaFimSessao = confirm(`Deseja finalizar a sessão?`);
    if (confirmaFimSessao) {
        localStorage.clear();
        location.replace('index.html');
    }
})


// FUNÇÃO QUE RENDERIZA A PÁGINA E INSERE O NOME DO USUÁRIO NO HEADER DA PÁGINA
window.addEventListener('load', function (evento) {

    evento.preventDefault();

    const requestOptions = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: jwtSessao
        },
    }

    fetch(`${urlAPI}users/getMe`, requestOptions)
        .then(response => {
            if (!response.ok) {
                console.log(response);
                throw response;
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

    let skeletonRef = document.getElementById('skeleton');

    const settings = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: jwtSessao
        }
    }

    fetch(`${urlAPI}tasks`, settings)

        .then((responseTask) => responseTask.json())

        .then(function (tasks) {
            // é necessário que o skeleton, que nada mais é que a parte do código sem os dados inseridos com template string, fiquem desabilitado
            //quando é recebido o response pela API

            if (skeletonRef) {
                skeletonRef.remove();
            }

            // e então efetuamos o map, onde trazemos de cada tarefa,a  sua descrição especifica, e quando ela foi criada
            //usando template string.
            // tarefasPendentes.innerHTML = '';

            renderizarTarefas(tasks);
            marcaTarefaCompleta();
            if (tarefasTerminadas.querySelectorAll('li').length > 0) {
                retornarTarefaPendente();
                excluirTarefa();
            }
        })

        // neste console log validamos se ele está trazendo o nome do usuario corretamente do login que acessamos no JWT.
        .catch(err => {
            console.log(err);
            alert("Falha ao validar as tarefas do usuario!")

        });

}

// FUNÇÃO PARA RENDERIZAR TAREFAS
function renderizarTarefas(listaTarefas) {

    console.log(listaTarefas);

    //limpando os campos
    tarefasPendentes.innerHTML = '';
    tarefasTerminadas.innerHTML = '';

    listaTarefas.forEach(tarefa => {

        let data = new Date(tarefa.createdAt);

        if (!tarefa.completed) {
            tarefasPendentes.innerHTML += `<li class="tarefa">
            <div class="not-done toggle" id="${tarefa.id}"><i class="fa fa-solid fa-check"></i></div>
            <div class="descricao">
                <p class="nome">${tarefa.description}</p>
                <p class="timestamp"><i class="far fa-calendar-alt"></i> ${data.toLocaleString()}</p>
            </div>
        </li>`
        } else {
            tarefasTerminadas.innerHTML += `<li class="tarefa">
            <div class="done"></div>
            <div class="descricao">
            <p class="nome">${tarefa.description}</p>
            <div>
                <button><i id="${tarefa.id}" class="fas fa-undo-alt change"></i></button>
                <button><i id="${tarefa.id}" class="far fa-trash-alt"></i></button>
            </div>
            </div>
        </li>`

        }
    })
}



// FUNÇÃO PARA CRIAR AS TAREFAS
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


    fetch(`${urlAPI}tasks`, settings)

        .then(response => response.json())
        .then(task => {

            console.log(task.description, task.completed);
            listarTarefa();

            novaTarefa.value = '';

        })
        .catch(error => console.error(`Erro: ${error}`));
}

// Evento dispara Função criarTarefa() ao clicar no botao +
btnNovaTarefa.addEventListener('click', function (ev) {

    ev.preventDefault();
    criarTarefa();

})

// FUNCAO TOGGLE ESTADO
function marcaTarefaCompleta() {

    const icoMudaEstado = document.querySelectorAll('.toggle');

    icoMudaEstado.forEach(item => {
        item.addEventListener('click', function (ev) {
            const id = ev.target.id;
            const tarefa = {};

            if (ev.target.classList.contains('fa-undo-alt')) {
                tarefa.completed = false;
            } else {
                tarefa.completed = true;
            }

            const settingsAtualiza = {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': jwtSessao,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(tarefa)
            }

            fetch(`${urlAPI}tasks/${id}`, settingsAtualiza)

                .then(res => {
                    console.log(res.status);
                    listarTarefa();

                })
                .catch(error => console.error(error));

        })
    })

}


// FUNCAO EXCLUIR TAREFA CONCLUIDA
function excluirTarefa() {

    const icoExcluirTarefa = document.querySelector('.fa-trash-alt');

    icoExcluirTarefa.addEventListener('click', function (ev) {
        const id = ev.target.id;

        const settingsExcluir = {
            method: 'DELETE',
            headers: {
                "Authorization": jwtSessao,
            }
        }
        fetch(`${urlAPI}tasks/${id}`, settingsExcluir)
            .then(res => {
                console.log(res.status);
                listarTarefa();
            })
            .catch(error => console.error(error));


    })

}



// FUNÇÃO PARA RETORNAR A TAREFA PARA O ESTADO PENDENTE
function retornarTarefaPendente() {
    const icoUndoTarefa = document.querySelector('.fa-undo-alt');

    icoUndoTarefa.addEventListener('click', function (ev) {
        const id = ev.target.id;
        const tarefa = {};

        tarefa.completed = false;

        console.log(id);

        const settingsRetornar = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization': jwtSessao,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(tarefa)

        }

        fetch(`${urlAPI}tasks/${id}`, settingsRetornar)

            .then(res => {
                console.log(res.status);
                listarTarefa();
            })

            .catch(error => console.error(error));
    })

}
console.log(retornarTarefaPendente);


window.addEventListener('load', () => {
    // se o token recebido for undefined, ele deslogue o usuario.
    if (localStorage.getItem('jwt') === 'undefined') {
        alert('token indefinido!')
    } else {

        listarTarefa()
    }
})