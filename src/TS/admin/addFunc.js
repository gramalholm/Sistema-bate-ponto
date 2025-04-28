import { toggleContainer,resetContainer } from '../Comuns/uiHandler.js';

export function addFunc() {
    const addButton = document.getElementById('addfunc');
    const xButton = document.querySelectorAll('.close-btn');
    const funcContainerEx = document.querySelectorAll('.container-ex');
    const funcContainer = document.querySelector('.admin-container');

    xButton[3].addEventListener('click', () => {
        resetContainer(funcContainerEx[3], funcContainer);
    });

    addButton.addEventListener('click', () => {
        toggleContainer(funcContainerEx[3], funcContainer);
    });
    
    document.getElementById('formAddfunc').addEventListener('submit', function (event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const senha = document.getElementById('senha').value;
        const email = document.getElementById('email').value;
        const cargo = document.getElementById('cargo').value;
        const horas_totais = document.getElementById('horas_totais').value;
        fetch("http://localhost:3333/admin/", { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                name: nome,
                email: email,
                senha: senha,
                cargo: cargo,
                Hora_chegada: "null",
                Hora_saida: "null",
                Horas_totais: horas_totais
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                resetContainer(funcContainerEx[3], funcContainer);
                alert('Funcionário criado com sucesso!');
            } else if (data.error) {
                alert('Erro ao criar o funcionário');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao realizar a requisição: ' + error.message);
        });
    });
}
