import { resetContainers } from '../Comuns/uiHandler.js';

export function checkin() {
    document.getElementById('formCheckin').addEventListener('submit', function (event) {
        event.preventDefault();
        const tipoCheck = document.querySelector('input[name="check"]:checked').value;
        const userEmail = localStorage.getItem("userEmail");
        const userName = localStorage.getItem("userNome");
        fetch("http://localhost:3333/func/checkin", { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                tipo: tipoCheck,
                email: userEmail,
                nome: userName
            }),
        })
        .then(response => response.json())
        .then(data => {
            const funcContainerEx = document.querySelectorAll('.container-ex');
            const funcContainer = document.querySelector('.func-container');
            if (data.message) {
                resetContainers(funcContainerEx[1], funcContainer);
                alert('Ponto batido com sucesso!');
            } else if (data.error) {
                alert('Erro ao bater o ponto');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao realizar a requisição: ' + error.message);
        });
    });
}
