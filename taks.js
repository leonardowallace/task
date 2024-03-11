// scripts/lista_tarefas.js

document.addEventListener('DOMContentLoaded', function () {
    carregarTarefasSalvas();
});

function addTarefa() {
    var inputTarefa = document.getElementById('tarefaInput');
    var valorTarefa = inputTarefa.value.trim();

    if (valorTarefa !== '') {
        var listaTarefas = document.getElementById('listaTarefas');

        var novaTarefa = document.createElement('li');
        novaTarefa.innerHTML = `
            <input type="checkbox" onclick="marcarConcluida(this)">
            <span>${valorTarefa}</span>
            <button onclick="removerTarefa(this.parentNode)">Remover</button>
        `;

        listaTarefas.appendChild(novaTarefa);
        inputTarefa.value = '';

        salvarTarefas(); // Salva as tarefas no localStorage
    }
}

function removerTarefa(tarefa) {
    tarefa.remove();
    salvarTarefas(); // Salva as tarefas no localStorage após remover uma tarefa
}

function marcarConcluida(checkbox) {
    var tarefa = checkbox.parentNode;
    tarefa.classList.toggle('completed');

    // Adiciona ou remove a linha através do texto
    var span = tarefa.querySelector('span');
    span.style.textDecoration = checkbox.checked ? 'line-through' : 'none';

    salvarTarefas(); // Salva as tarefas no localStorage após marcar/desmarcar uma tarefa como concluída
}

function salvarTarefas() {
    var listaTarefas = document.getElementById('listaTarefas');
    var tarefas = [];

    // Itera sobre cada item da lista e salva no array 'tarefas'
    for (var i = 0; i < listaTarefas.children.length; i++) {
        var tarefa = listaTarefas.children[i];
        var texto = tarefa.querySelector('span').innerText;
        var concluida = tarefa.classList.contains('completed');
        tarefas.push({ texto: texto, concluida: concluida });
    }

    // Salva o array 'tarefas' no localStorage como uma string JSON
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function carregarTarefasSalvas() {
    var listaTarefas = document.getElementById('listaTarefas');
    var tarefasSalvas = localStorage.getItem('tarefas');

    // Se houver tarefas salvas, carrega-as no HTML
    if (tarefasSalvas) {
        tarefasSalvas = JSON.parse(tarefasSalvas);
        for (var i = 0; i < tarefasSalvas.length; i++) {
            var tarefa = tarefasSalvas[i];
            var novaTarefa = document.createElement('li');
            novaTarefa.innerHTML = `
                <input type="checkbox" onclick="marcarConcluida(this)" ${tarefa.concluida ? 'checked' : ''}>
                <span>${tarefa.texto}</span>
                <button onclick="removerTarefa(this.parentNode)">Remover</button>
            `;
            if (tarefa.concluida) {
                novaTarefa.classList.add('completed');
                novaTarefa.querySelector('span').style.textDecoration = 'line-through';
            }
            listaTarefas.appendChild(novaTarefa);
        }
    }
}

// Adiciona um ouvinte de eventos para a tecla "Enter" na caixa de texto
document.getElementById('tarefaInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        addTarefa();
    }
});
