// скрипты работают после загрузки html
document.addEventListener('DOMContentLoaded', function () {
    // получаем все кнопки с классом 'like'
    const likeButtons = document.querySelectorAll('button.like');
    // флаг для активации рисования
    let isDrawing = false;
    // время последнего создания сердца
    let lastHeartTime = 0;
    // задержка между сердцами в миллисекундах
    const heartDelay = 25;

    likeButtons.forEach(button => {
        // счетчик внутри текущей кнопки
        const count = button.querySelector('#count');
        // сердце внутри текущей кнопки
        const heart = button.querySelector('#heart');
        // берём текущее количество лайков
        let kol = Number(count.textContent);

        // обработчик клика к текущей кнопке
        button.addEventListener('click', function () {
            // вызываем функции изменения стилей с передачей текущих элементов в качестве аргументов
            ChangeBack(button);
            ChangeHeart(heart);
            ChangeCount(count);

            // включение/выключение рисования
            isDrawing = !isDrawing;
            if (isDrawing) {
                // вызываем функцию рисования сердца при перемещении мыши
                document.addEventListener('mousemove', throttledDrawHearts);
            } else {
                // вызываем функцию рисования сердца при перемещении мыши
                document.removeEventListener('mousemove', throttledDrawHearts);
            }
        });

        // изменение фона при клике
        function ChangeBack(btn) {
            // проверяем, активна ли кнопка
            if (CheckActive(btn)) {
                // если активна
                btn.style.backgroundColor = '#1f20307F';
            } else {
                // если не активна 
                btn.style.backgroundColor = '#EF233C7F';
            }
        }

        // изменение цвета сердца
        function ChangeHeart(heartIcon) {
            // проверяем, активна ли кнопка
            if (CheckActive(button)) {
                // если активна
                heartIcon.style.stroke = '#EF233C';
                heartIcon.style.fill = '#EF233C';
            } else {
                // если не активна
                heartIcon.style.stroke = '#EDF2F4';
                heartIcon.style.fill = 'none';
            }
        }

        // изменение счетчика
        function ChangeCount(countElement) {
            // проверяем, активна ли кнопка
            if (CheckActive(button)) {
                // если активна, увеличиваем счётчик и переприсваиваем его значение
                kol++;
                countElement.textContent = kol;
            } else {
                // если не активна, уменьшаем счётчик и переприсваиваем его значение
                kol--;
                countElement.textContent = kol;
            }
        }

        // проверка активности кнопки
        function CheckActive(btn) {
            // проверяем, активна ли кнопка по фоновому цвету: тут указан цвет активной кнопки
            return btn.style.backgroundColor === 'rgba(239, 35, 60, 0.498)';
        }

        // функция для создания сердец с задержкой
        function throttledDrawHearts(event) {
            // берём текущее время
            const currentTime = Date.now();
            // если прошло достаточно времени, рисуем сердце
            if (currentTime - lastHeartTime >= heartDelay) {
                drawHearts(event);
                lastHeartTime = currentTime;
            }
        }

        // создание сердец при движении мыши
        function drawHearts(event) {
            // создаем сердце
            const heartSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            heartSVG.setAttribute('viewBox', '0 0 24 24');
            heartSVG.setAttribute('fill', 'none');
            heartSVG.style.position = 'absolute';
            // позиция сердца
            heartSVG.style.left = `${event.clientX}px`;
            // позиция сердца
            heartSVG.style.top = `${event.clientY}px`;
            heartSVG.style.width = '20px';
            heartSVG.style.height = '20px';
            heartSVG.style.opacity = '0.7';
            // сердца поверх всех элементов
            heartSVG.style.zIndex = '9999';

            // создаём svg сердечко
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('fill-rule', 'evenodd');
            path.setAttribute('clip-rule', 'evenodd');
            path.setAttribute(
                'd',
                'M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z'
            );
            path.setAttribute('stroke-width', '2');
            path.setAttribute('stroke', '#EF233C');
            path.setAttribute('fill', '#EF233C');
            path.setAttribute('stroke-linecap', 'round');
            path.setAttribute('stroke-linejoin', 'round');

            // добавляем svg к сердцу
            heartSVG.appendChild(path);
            // добавляем сердце на страницу
            document.body.appendChild(heartSVG);

            // удаление сердца через 1 секунду: используем функцию удаления и задержку в миллисекундах
            setTimeout(() => {
                heartSVG.remove();
            }, 1000);
        }
    });
});
