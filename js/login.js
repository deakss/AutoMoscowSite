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

        // проверяем логин и пароль, передавая их в качестве аргументов
        // если вернулось true
        if (CheckLogin(login, pass)) {
            // выводим сообщение
            alert('Здравствуйте!');
        }
        else {
            alert('Неверный логин или пароль');
        }
    });

    // функция проверки введенных данных
    function CheckLogin(log, pass) {
        // если логин и пароль совпадают с нужными
        if (log == 'admin' && pass == 'glavniy') {
            // возвращаем true
            return true;
        }
    }
});