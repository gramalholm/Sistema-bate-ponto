import { toggleContainer, resetContainer } from '../Comuns/uiHandler.js';

export function alterarSenha() {
    const senhaButton = document.getElementById('senha');
    const xButton = document.querySelectorAll('.close-btn');
    const funcContainerEx = document.querySelectorAll('.container-ex');
    const funcContainer = document.querySelector('.func-container');

    xButton[0].addEventListener('click', () => {
        resetContainer(funcContainerEx[0], funcContainer);
    });

    senhaButton.addEventListener('click', () => {
        toggleContainer(funcContainerEx[0], funcContainer);
    });


    document.getElementById('formAlterar').addEventListener('submit', function (event) {
        event.preventDefault();
        const userEmail = localStorage.getItem("userEmail");
        const newSenha = document.getElementById('newSenha').value;
        const conNewSenha = document.getElementById('conNewSenha').value;

        if(newSenha === conNewSenha){
            fetch("http://localhost:3333/func/func/:id", { 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    user: userEmail,
                    newPassword: newSenha
                }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    resetContainer(funcContainerEx[0], funcContainer);
                    alert('Senha alterada com sucesso!');
                } else if (data.error) {
                    alert('Erro ao alterar senha');
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Erro ao realizar a requisição: ' + error.message);
            });
        }
        else{
            alert('As senhas digitadas, são diferentes.');
        }

        
    });
}
