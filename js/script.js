document.addEventListener('DOMContentLoaded', function () {
    // элементы для работы с новостями
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
        const maxScroll = calculateMaxScroll();
        prevBtn.style.visibility = scrollPosition <= 0 ? 'hidden' : 'visible';
        nextBtn.style.visibility = scrollPosition >= maxScroll ? 'hidden' : 'visible';
    }

    // * обновление прокрученного списка
    function updateScrollPosition(direction) {
        const itemWidth = calculateItemWidth();
        const maxScroll = calculateMaxScroll();
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
            newsList.style.transition = 'transform 0.5s ease-in-out';
            newsList.style.transform = `translateX(-${scrollPosition}px)`;
            updateButtons();
        }
    }

    // обработка завершения анимации
    newsList.addEventListener('transitionend', function () {
        newsList.style.transition = '';
    });

    // обработка нажатия на кнопки
    prevBtn.addEventListener('click', () => updateScrollPosition('prev'));
    nextBtn.addEventListener('click', () => updateScrollPosition('next'));

    // обновление кнопок
    updateButtons();

    // адаптация под размер экрана
    window.addEventListener('resize', function () {
        const maxScroll = calculateMaxScroll();
        if (scrollPosition > maxScroll) {
            scrollPosition = maxScroll;
            newsList.style.transform = `translateX(-${scrollPosition}px)`;
        }
        updateButtons();
    });

    // мобильное меню
    const burgerMenu = document.querySelector('.burger-menu');
    const headerNav = document.querySelector('.header-nav');

    if (burgerMenu && headerNav) {
        burgerMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            headerNav.classList.toggle('active');
        });

        // закрытие меню при клике на пункт меню
        const menuItems = headerNav.querySelectorAll('a, button');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                burgerMenu.classList.remove('active');
                headerNav.classList.remove('active');
            });
        });

        // закрытие меню при клике вне его
        document.addEventListener('click', function(event) {
            if (!headerNav.contains(event.target) && !burgerMenu.contains(event.target)) {
                burgerMenu.classList.remove('active');
                headerNav.classList.remove('active');
            }
        });
    }
});
