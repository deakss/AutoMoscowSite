// скрипты работают после загрузки html
document.addEventListener('DOMContentLoaded', function () {
    // получаем элементы
    const log_input = document.querySelector('input#log');
    const pass_input = document.querySelector('input#pass');
    const but_input = document.querySelector('button.buttons_link');

    // обработка клика
    but_input.addEventListener('click', function () {
        // получаем данные из полей ввода
        var login = log_input.value;
        var pass = pass_input.value;

        // проверка на пустой ввод
        if (isEmpty({ login, pass })) {
            alert('Поля логина и пароля не должны быть пустыми!');
            return;
        }

        // проверяем логин и пароль, передавая их в качестве аргументов
        // если вернулось true
        if (CheckLogin(login, pass)) {
            // показываем первую капчу
            if (showCaptcha()) {
                alert('Здравствуйте!');
            } else {
                alert('Ошибка в капче. Попробуйте снова.');
            }
        } else {
            alert('Неверный логин или пароль');
        }
    });

    // функция проверки введенных данных
    function CheckLogin(log, pass) {
        // если логин и пароль совпадают с нужными
        if (log === 'admin' && pass === 'glavniy') {
            // возвращаем true
            return true;
        }
        return false;
    }

    // функция проверки на пустой ввод
    function isEmpty(obj) {
        return Object.values(obj).some(value => value.trim() === '');
    }

    // функция для показа капчи
    function showCaptcha() {
        // первая капча с буквами
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const captchaLength = 6;
        let captcha = '';

        for (let i = 0; i < captchaLength; i++) {
            captcha += letters[Math.floor(Math.random() * letters.length)];
        }

        const userResponse = prompt(`Введите капчу: ${captcha}`);

        if (userResponse === captcha) {
            return true;
        } else {
            // вторая капча с числами
            const num1 = Math.floor(Math.random() * 10) + 1;
            const num2 = Math.floor(Math.random() * 10) + 1;
            const sum = num1 + num2;

            const mathResponse = prompt(`Решите пример: ${num1} + ${num2}`);

            if (parseInt(mathResponse) === sum) {
                return true;
            }
        }

        return false;
    }
});
