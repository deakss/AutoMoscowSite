document.addEventListener('DOMContentLoaded', function() {
    // меню
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
