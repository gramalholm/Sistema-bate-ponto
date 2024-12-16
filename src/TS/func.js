import { toggleContainer, resetContainers } from './Comuns/uiHandler.js';

const checkButton = document.getElementById('check');
const senhaButton = document.getElementById('senha');
const enviarCheckButton = document.getElementById('check-enviar');
const funcContainerEx = document.querySelectorAll('.container-ex');
const funcContainer = document.querySelector('.func-container');

checkButton.addEventListener('click', () => {
    toggleContainer(funcContainerEx[1], funcContainer);
});

senhaButton.addEventListener('click', () => {
    toggleContainer(funcContainerEx[0], funcContainer);
});

enviarCheckButton.addEventListener('click', () => {
    resetContainers(funcContainerEx, funcContainer);
});