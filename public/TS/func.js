const checkButton = document.getElementById('check');
const enviarCheckButton = document.getElementById('check-enviar');
const funcContainerEx = document.querySelector('.func-container-ex');
const funcContainer = document.querySelector('.func-container');

checkButton.addEventListener('click', function() {
    funcContainerEx.style.display = 'block';
    funcContainer.style.pointerEvents = 'none';
});

enviarCheckButton.addEventListener('click', function() {
    funcContainerEx.style.display = 'none';
    funcContainer.style.pointerEvents = 'auto';
});