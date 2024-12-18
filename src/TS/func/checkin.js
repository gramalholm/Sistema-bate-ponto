import { toggleContainer, resetContainer } from '../Comuns/uiHandler.js';

export function checkin() {
    const checkButton = document.getElementById('check');
    const xButton = document.querySelectorAll('.close-btn');
    const funcContainerEx = document.querySelectorAll('.container-ex');
    const funcContainer = document.querySelector('.func-container');

    xButton[1].addEventListener('click', () => {
        resetContainer(funcContainerEx[1], funcContainer);
    });

    checkButton.addEventListener('click', () => {
        toggleContainer(funcContainerEx[1], funcContainer);
    });


    document.getElementById('formCheckin').addEventListener('submit', function (event) {
        event.preventDefault();
        const tipoCheck = document.querySelector('input[name="check"]:checked').value;
        console.log(tipoCheck)
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
            if (data.message) {
                resetContainer(funcContainerEx[1], funcContainer);
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
