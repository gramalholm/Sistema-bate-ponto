import { resetContainers } from '../Comuns/uiHandler.js';

export async function delFunc() {
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
                resetContainers(funcContainerEx[0], funcContainer);
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
