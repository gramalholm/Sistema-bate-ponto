import { toggleContainer, resetContainer } from '../Comuns/uiHandler.js';

export async function delFunc() {
    const delButton = document.getElementById('delfunc');
    const xButton = document.querySelectorAll('.close-btn');
    const funcContainerEx = document.querySelectorAll('.container-ex');
    const funcContainer = document.querySelector('.admin-container');

    xButton[0].addEventListener('click', () => {
        resetContainer(funcContainerEx[0], funcContainer);
    });

    delButton.addEventListener('click', () => {
        toggleContainer(funcContainerEx[0], funcContainer);
    });



    document.getElementById('formDelfunc').addEventListener('submit', function (event) {
        event.preventDefault();
        const email = document.getElementById('emailDel').value;

        fetch(`http://localhost:3333/admin/${email}`, { 
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                email: email
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na resposta do servidor');
            }
            return response.json();
        })
        .then(data => {
            console.log("foi");
            const funcContainerEx = document.querySelectorAll('.container-ex');
            console.log("foi");
            const funcContainer = document.querySelector('.admin-container');
            console.log("foi");
            if (data.message) {
                resetContainer(funcContainerEx[0], funcContainer);
                alert('Funcionário deletado com sucesso!');
            } else if (data.error) {
                alert('Erro ao deletar o funcionário');
            }
            console.log("foi");
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao realizar a requisição: ' + error.message);
        });
    });
}
