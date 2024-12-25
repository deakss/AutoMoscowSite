document.addEventListener('DOMContentLoaded', () => {
    const mainElement = document.getElementById('element');
    const contentDiv = mainElement.querySelector('.content');
    const img = contentDiv.querySelector('img');
    const positionText = contentDiv.querySelector('p');

    // устанавливаем свойства изображения
    img.src = '/images/order.jpg'; // Здесь можно заменить URL на вашу картинку
    imgHeight = '50px';
    imgWidth = 'auto';
    // функция для центрирования элемента
    function centerElement() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const imgWidth = img.offsetWidth;
        const imgHeight = img.offsetHeight;

        // позиционируем картинку по центру
        contentDiv.style.position = 'absolute';
        contentDiv.style.left = `${(windowWidth - imgWidth) / 2}px`;
        contentDiv.style.top = `${(windowHeight - imgHeight) / 2}px`;
    }

    // центрируем элемент при загрузке
    img.addEventListener('load', () => {
        centerElement();
    });

    // центрируем элемент при изменении размера окна
    window.addEventListener('resize', () => {
        centerElement();
    });

    // обработка кликов по экрану
    mainElement.addEventListener('click', (event) => {
        const { clientX, clientY } = event;
        positionText.textContent = `Мышь нажата в позиции: (${clientX}px, ${clientY}px)`;
    });
});
