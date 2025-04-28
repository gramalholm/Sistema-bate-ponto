export function toggleContainer(containerToShow, mainContainer) {
    if (containerToShow && mainContainer) {
        containerToShow.style.display = 'block';
        mainContainer.style.pointerEvents = 'none';
    } else {
        console.error('Um dos elementos não foi encontrado no toggleContainer.');
    }
}

export function resetContainer(container, mainContainer) {
    if (container && mainContainer) {
        container.style.display = 'none';
        mainContainer.style.pointerEvents = 'auto';
    } else {
        console.error('Um dos elementos não foi encontrado no resetContainers.');
    }
}