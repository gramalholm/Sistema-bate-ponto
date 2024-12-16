// Função genérica para exibir um container e desativar outro
export function toggleContainer(containerToShow, mainContainer) {
    if (containerToShow && mainContainer) {
        // Mostra o container específico
        containerToShow.style.display = 'block';
        // Desativa interações no contêiner principal
        mainContainer.style.pointerEvents = 'none';
    } else {
        console.error('Um dos elementos não foi encontrado no toggleContainer.');
    }
}

// Função para restaurar o estado inicial
export function resetContainers(containers, mainContainer) {
    if (containers && mainContainer) {
        // Itera sobre o NodeList e esconde cada container individualmente
        containers.forEach(container => {
            container.style.display = 'none';
        });

        // Reativa o container principal
        mainContainer.style.pointerEvents = 'auto';
    } else {
        console.error('Um dos elementos não foi encontrado no resetContainers.');
    }
}