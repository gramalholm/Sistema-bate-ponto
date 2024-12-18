import { toggleContainer, resetContainers } from '../Comuns/uiHandler.js';
import { checkin } from './checkin.js';

const checkButton = document.getElementById('check');
const senhaButton = document.getElementById('senha');
const funcContainerEx = document.querySelectorAll('.container-ex');
const funcContainer = document.querySelector('.func-container');

checkin();

checkButton.addEventListener('click', () => {
    toggleContainer(funcContainerEx[1], funcContainer);
});

senhaButton.addEventListener('click', () => {
    toggleContainer(funcContainerEx[0], funcContainer);
});
