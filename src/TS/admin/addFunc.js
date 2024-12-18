import { resetContainers } from '../Comuns/uiHandler.js';

export function addFunc() {
    document.getElementById('formAddfunc').addEventListener('submit', function (event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const senha = document.getElementById('senha').value;
        const email = document.getElementById('email').value;
        const cargo = document.getElementById('cargo').value;
        const hora_entrada = document.getElementById('hora_entrada').value;
        const hora_saida = document.getElementById('hora_saida').value;
        const horas_totais = document.getElementById('horas_totais').value;

        fetch("http://localhost:3333/admin/", { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                name: nome,
                email: email,
                senha: senha,
                cargo: cargo,
                Hora_chegada: hora_entrada,
                Hora_saida: hora_saida,
                Horas_totais: horas_totais
            }),
        })
        .then(response => response.json())
        .then(data => {
            const funcContainerEx = document.querySelectorAll('.container-ex');
            const funcContainer = document.querySelector('.admin-container');
            if (data.message) {
                resetContainers(funcContainerEx[3], funcContainer);
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
