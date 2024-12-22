// скрипты работают после загрузки html
document.addEventListener('DOMContentLoaded', function () {
    // получаем элемент
    const but_reg = document.querySelector('button.buttons_link');
    // переменная для хранения ответа пользователя
    var otvet;

    // обработка клика по кнопке регистрации
    but_reg.addEventListener('click', function () {
        // присваиваем значение, полученное из функции
        otvet = ShowDialog();
        // если ответ "Да"
        if (otvet == 'Да' || otvet == 'да') {
            // выводим сообщение
            alert('Круто!');
        }
        // если любой другой ответ
        else {
            // выводим другое сообщение
            alert('Жаль');
        }
    });

    // функция вывода диалогового окна
    function ShowDialog() {
        // присваиваем переменной значение из окна
        otvet = prompt("Уверены, что хотите зарегестрироваться?", '');
        // возвращаем его
        return otvet;
    }
});