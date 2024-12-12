document.addEventListener('DOMContentLoaded', function() {
    // элементы для работы с новостями
    const newsList = document.querySelector('.news-list');
    const prevBtn = document.querySelector('.nav-btn.prev');
    const nextBtn = document.querySelector('.nav-btn.next');
    const newsItems = document.querySelectorAll('.news-list li');
    
    // параметры прокрутки новостей
    let scrollPosition = 0;
    const itemWidth = 330; // ширина элемента + отступ
    const containerWidth = document.querySelector('.news-container').clientWidth - 100; // вычитаем padding
    const visibleItems = Math.floor(containerWidth / itemWidth);
    const maxScroll = Math.max(0, (newsItems.length - visibleItems) * itemWidth);
    
    // логика прокрутки новостей
    function updateButtons() {
        prevBtn.style.visibility = scrollPosition <= 0 ? 'hidden' : 'visible';
        nextBtn.style.visibility = scrollPosition >= maxScroll ? 'hidden' : 'visible';
    }

    function updateScrollPosition(direction) {
        const oldPosition = scrollPosition;
        
        if (direction === 'next' && scrollPosition < maxScroll) {
            scrollPosition = Math.min(scrollPosition + itemWidth, maxScroll);
        } else if (direction === 'prev' && scrollPosition > 0) {
            scrollPosition = Math.max(scrollPosition - itemWidth, 0);
        }

        if (oldPosition !== scrollPosition) {
            newsList.style.transition = 'transform 0.5s ease-in-out';
            newsList.style.transform = `translateX(-${scrollPosition}px)`;
            updateButtons();
        }
    }

    newsList.addEventListener('transitionend', function() {
        newsList.style.transition = '';
    });

    prevBtn.addEventListener('click', () => updateScrollPosition('prev'));
    nextBtn.addEventListener('click', () => updateScrollPosition('next'));
    
    // инициализация
    updateButtons();

    // адаптация под размер экрана
    window.addEventListener('resize', function() {
        const newContainerWidth = document.querySelector('.news-container').clientWidth - 100;
        const newVisibleItems = Math.floor(newContainerWidth / itemWidth);
        const newMaxScroll = Math.max(0, (newsItems.length - newVisibleItems) * itemWidth);
        
        if (scrollPosition > newMaxScroll) {
            scrollPosition = newMaxScroll;
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
