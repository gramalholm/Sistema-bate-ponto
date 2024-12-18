import { toggleContainer,resetContainer } from '../Comuns/uiHandler.js';

export function gerarRelatorio() {
    const editButton = document.getElementById('relatorio');
    const xButton = document.querySelectorAll('.close-btn');
    const funcContainerEx = document.querySelectorAll('.container-ex');
    const funcContainer = document.querySelector('.admin-container');

    xButton[4].addEventListener('click', () => {
        resetContainer(funcContainerEx[4], funcContainer);
    });

    editButton.addEventListener('click', () => {
        toggleContainer(funcContainerEx[4], funcContainer);
    });
}
