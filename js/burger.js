// скрипты работают после загрузки html
document.addEventListener('DOMContentLoaded', function() {
    // получаем элементы
    const burgerMenu = document.querySelector('.burger-menu');
    const headerNav = document.querySelector('.header-nav');

    // если элементы найдены
    if (burgerMenu && headerNav) {
        // обрабатываем клик по бургер-меню
        burgerMenu.addEventListener('click', function() {
            // добавляем класс active
            this.classList.toggle('active');
            headerNav.classList.toggle('active');
        });

        // закрытие меню при клике на пункт меню
        // получаем все элементы меню
        const menuItems = headerNav.querySelectorAll('a, button');
        // проходимся по каждому элементу
        menuItems.forEach(item => {
            // добавляем обработчик клика на элемент
            item.addEventListener('click', () => {
                // удаляем класс active
                burgerMenu.classList.remove('active');
                headerNav.classList.remove('active');
            });
        });

        // закрытие меню при клике вне его
        // обработчик клика вне меню
        document.addEventListener('click', function(event) {
            // если клик был не в меню и не по бургер-меню
            if (!headerNav.contains(event.target) && !burgerMenu.contains(event.target)) {
                // удаляем класс active
                burgerMenu.classList.remove('active');
                headerNav.classList.remove('active');
            }
        });
    }
});
