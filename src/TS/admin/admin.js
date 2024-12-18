import { toggleContainer, resetContainers } from '../Comuns/uiHandler.js';
import { addFunc } from './addfunc.js';
import { delFunc } from './delFunc.js';

const delButton = document.getElementById('delfunc');
const editButton = document.getElementById('editfunc');
const addButton = document.getElementById('addfunc');
const relatorioButton = document.getElementById('relatorio');
const funcContainerEx = document.querySelectorAll('.container-ex');
const funcContainer = document.querySelector('.admin-container');
const userEmail = localStorage.getItem("userEmail");

if (userEmail) {
    console.log("Usuário logado com o email:", userEmail);
} else {
    console.log("Nenhum usuário está logado.");
}

addFunc();

delFunc();

delButton.addEventListener('click', () => {
    toggleContainer(funcContainerEx[0], funcContainer);
});

editButton.addEventListener('click', () => {
    toggleContainer(funcContainerEx[1], funcContainer);
});

addButton.addEventListener('click', () => {
    toggleContainer(funcContainerEx[3], funcContainer);
});

relatorioButton.addEventListener('click', () => {
    toggleContainer(funcContainerEx[4], funcContainer);
});