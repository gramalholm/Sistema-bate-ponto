import { toggleContainer,resetContainer } from '../Comuns/uiHandler.js';

export function editFunc() {
    const editButton = document.getElementById('editfunc');
    const xButton = document.querySelectorAll('.close-btn');
    const funcContainerEx = document.querySelectorAll('.container-ex');
    const funcContainer = document.querySelector('.admin-container');

    xButton[1].addEventListener('click', () => {
        resetContainer(funcContainerEx[1], funcContainer);
    });

    editButton.addEventListener('click', () => {
        toggleContainer(funcContainerEx[1], funcContainer);
    });

    
}
