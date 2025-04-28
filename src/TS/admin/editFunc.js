import { toggleContainer,resetContainer } from '../Comuns/uiHandler.js';

export function editFunc() {
    const editButton = document.getElementById('editfunc');
    const xButton = document.querySelectorAll('.close-btn');
    const funcContainerEx = document.querySelectorAll('.container-ex');
    const funcContainer = document.querySelector('.admin-container');
    let escolhaCampo, email;
    xButton[1].addEventListener('click', () => {
        resetContainer(funcContainerEx[1], funcContainer);
    });
    xButton[2].addEventListener('click', () => {
        resetContainer(funcContainerEx[2], funcContainer);
    });

    editButton.addEventListener('click', () => {
        toggleContainer(funcContainerEx[1], funcContainer);
    });

    document.getElementById('formEditfunc').addEventListener('submit', function (event) {
        event.preventDefault();
        email = document.getElementById('emailEdit').value;
        console.log(email);
        fetch(`http://localhost:3333/admin/check/:email`, { 
            method: "POST",
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
            const funcContainerEx = document.querySelectorAll('.container-ex');
            const funcContainer = document.querySelector('.admin-container');
            if (data.message) {
                escolhaCampo = document.querySelector('input[name="campo"]:checked').value;
                resetContainer(funcContainerEx[1], funcContainer);
                toggleContainer(funcContainerEx[2], funcContainer);
                
            } else if (data.error) {
                alert('Funcionário não consta no banco de dados');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert("Funcionário não consta no banco de dados");
        });
    });
    document.getElementById('formEditfuncEsc').addEventListener('submit', function (event) {
        event.preventDefault();
        const editCampo = document.getElementById('editCampo').value;
        fetch(`http://localhost:3333/admin/:email`, { 
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                email: email,
                campo: escolhaCampo,
                novoValor: editCampo 
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na resposta do servidor');
            }
            return response.json();
        })
        .then(data => {
            if (data.message) {
                resetContainer(funcContainerEx[2], funcContainer);
                alert('Informação do funcionário editado corretamente.');
            } else if (data.error) {
                alert('Não foi possível editar o funcionário.');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert("Não foi possível editar o funcionário.");
        });
    });
    
}
