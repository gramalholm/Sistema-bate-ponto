import { toggleContainer, resetContainers } from '../Comuns/uiHandler.js';

const delButton = document.getElementById('delfunc');
const editButton = document.getElementById('editfunc');
const addButton = document.getElementById('addfunc');
const relatorioButton = document.getElementById('relatorio');
const funcContainerEx = document.querySelectorAll('.container-ex');
const funcContainer = document.querySelector('.admin-container');
const enviarButtons = document.querySelectorAll('.enviar');

// Função que será executada quando o botão for clicado
function handleClick() {
    console.log(funcContainerEx,);
    resetContainers(funcContainerEx, funcContainer);
}

// Adiciona o evento de click para cada botão
enviarButtons.forEach(button => {
    button.addEventListener('click', handleClick);
});

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