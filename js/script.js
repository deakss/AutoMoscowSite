// скрипты работают после загрузки html
document.addEventListener('DOMContentLoaded', function () {
    // получаем элементы
    const newsList = document.querySelector('.news-list');
    const prevBtn = document.querySelector('.nav-btn.prev');
    const nextBtn = document.querySelector('.nav-btn.next');
    const newsItems = document.querySelectorAll('.news-list li');

    // параметры прокрутки новостей
    let scrollPosition = 0;

    // * вычисление ширины новости
    function calculateItemWidth() {
        // ширина элемента, включая отступы
        return newsItems[0].offsetWidth + parseFloat(getComputedStyle(newsItems[0]).marginRight);
    }

    // * вычисление максимального пролистывания
    function calculateMaxScroll() {
        // ширина контейнера
        const containerWidth = document.querySelector('.news-container').clientWidth;
        // ширина элемента, включая отступы
        const itemWidth = calculateItemWidth();
        // количество видимых элементов
        const visibleItems = Math.floor(containerWidth / itemWidth);
        // максимальная прокрутка
        return Math.max(0, (newsItems.length - visibleItems) * itemWidth);
    }

    // * обновление видимости кнопок
    function updateButtons() {
        // вычисляем максимальную прокрутку и записываем её в переменную
        const maxScroll = calculateMaxScroll();
        // если прокрутка достигла одного из краев, то скрываем нужную кнопку
        prevBtn.style.visibility = scrollPosition <= 0 ? 'hidden' : 'visible';
        nextBtn.style.visibility = scrollPosition >= maxScroll ? 'hidden' : 'visible';
    }

    // * обновление прокрученного списка
    function updateScrollPosition(direction) {
        // вычисляем ширину элемента
        const itemWidth = calculateItemWidth();
        // вычисляем максимальную прокрутку
        const maxScroll = calculateMaxScroll();
        // запоминаем старую прокрутку
        const oldPosition = scrollPosition;

        // если нажата правая кнопка, то прокрутить вправо
        if (direction === 'next' && scrollPosition < maxScroll) {
            scrollPosition = Math.min(scrollPosition + itemWidth, maxScroll);
        }
        // если нажата левая кнопка, то прокрутить влево (удивительно)
        else if (direction === 'prev' && scrollPosition > 0) {
            scrollPosition = Math.max(scrollPosition - itemWidth, 0);
        }

        // если еще не достигнут край, то прокрутить
        if (oldPosition !== scrollPosition) {
            // стили для прокрутки
            newsList.style.transition = 'transform 0.5s ease-in-out';
            newsList.style.transform = `translateX(-${scrollPosition}px)`;
            // обновляем видимость кнопок
            updateButtons();
        }
    }

    // обработка завершения анимации
    newsList.addEventListener('transitionend', function () {
        // убираем стили
        newsList.style.transition = '';
    });

    // обработка нажатия на кнопки
    prevBtn.addEventListener('click', () => updateScrollPosition('prev'));
    nextBtn.addEventListener('click', () => updateScrollPosition('next'));

    // обновление кнопок
    updateButtons();

    // адаптация под размер экрана
    window.addEventListener('resize', function () {
        // вычисляем максимальную прокрутку
        const maxScroll = calculateMaxScroll();
        if (scrollPosition > maxScroll) {
            // устанавливаем максимальную прокрутку
            scrollPosition = maxScroll;
            // стили для прокрутки
            newsList.style.transform = `translateX(-${scrollPosition}px)`;
        }
        // обновляем видимость кнопок
        updateButtons();
    });
});
