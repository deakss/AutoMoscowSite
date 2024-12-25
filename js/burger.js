document.addEventListener('DOMContentLoaded', function () {
    // класс уведомления
    class Notification {
        constructor(text, isAuto = false) {
            this.text = text;
            this.isAuto = isAuto; // указывает, является ли уведомление автоматическим
        }

        // функция создания элемента уведомлений
        createElement() {
            const listItem = document.createElement('li');
            const notifText = document.createElement('a');
            notifText.textContent = this.text;

            // кнопка удаления
            const deleteButton = document.createElement('button');
            deleteButton.textContent = '✖';
            deleteButton.classList.add('del'); // добавляем общий класс для обработки

            listItem.appendChild(notifText);
            listItem.appendChild(deleteButton);
            return listItem;
        }

        // функция добавления и автоматического удаления элемента 
        notify() {
            const notifList = document.querySelector('.notification-list');
            const listItem = this.createElement();
            notifList.appendChild(listItem);

            // Если уведомление автоматическое, удалить через 4 секунды
            if (this.isAuto) {
                setTimeout(() => {
                    listItem.remove();
                }, 5000);
            }
        }
    }

    function createNotification(text, isAuto = false) {
        const notif = new Notification(text, isAuto);
        notif.notify();
    }

    // Функция для обработки удаления уведомления
    function DeleteNotification(event) {
        const listItem = event.target.closest('li'); // Находим родительский <li>
        if (listItem) {
            listItem.remove(); // Удаляем уведомление
        }
    }

    // Назначаем обработчик на контейнер списка уведомлений
    const notifList = document.querySelector('.notification-list');
    notifList.addEventListener('click', function (event) {
        if (event.target.classList.contains('del')) { // Проверяем, что клик был по кнопке с классом "del"
            DeleteNotification(event);
        }
    });

    // добавляем кнопку "+" для создания пользовательских уведомлений
    const notificationButton = document.getElementById('notification');
    const addButton = document.createElement('button');
    addButton.classList.add('add_notif');
    addButton.textContent = '+';

    notificationButton.appendChild(addButton);

    // обработка нажатия на кнопку "+"
    addButton.addEventListener('click', () => {
        let input;
        do {
            input = prompt('Введите текст уведомления (или нажмите "Отмена" для выхода):');
            if (input && input.trim()) {
                createNotification(input.trim());
            }
        } while (input && input.trim());
    });

    // автоматическое создание уведомлений каждые 3 секунды
    let autoNotificationInterval;
    const startAutoNotifications = () => {
        autoNotificationInterval = setInterval(() => {
            createNotification('Автоматическое уведомление!', true);
        }, 2000);
    };

    const stopAutoNotifications = () => {
        clearInterval(autoNotificationInterval);
    };

    // добавляем обработчик для остановки уведомлений при наведении на контейнер
    const notifContainer = document.querySelector('.notification-container');
    notifContainer.addEventListener('mouseenter', stopAutoNotifications);
    notifContainer.addEventListener('mouseleave', startAutoNotifications);

    // стартуем автоматические уведомления
    startAutoNotifications();

    // получаем элементы
    const burgerMenu = document.querySelector('.burger-menu');
    const headerNav = document.querySelector('.header-nav');

    // если элементы найдены
    if (burgerMenu && headerNav) {
        // обрабатываем клик по бургер-меню
        burgerMenu.addEventListener('click', function () {
            // добавляем класс active
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
        document.addEventListener('click', function (event) {
            if (!headerNav.contains(event.target) && !burgerMenu.contains(event.target)) {
                burgerMenu.classList.remove('active');
                headerNav.classList.remove('active');
            }
        });
    }
});
