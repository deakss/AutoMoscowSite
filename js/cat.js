document.addEventListener('DOMContentLoaded', function () {
    // скрипты работают после загрузки html
    // объект для управления корзиной
    const cartManager = {
        cartElement: document.querySelector('.cart_panel'),
        addToCart: function (make, price) {
            const cartItem = document.createElement('a');
            cartItem.classList.add('cart_card');
            const carMakeElement = document.createElement('p');
            carMakeElement.classList.add('make_mod_year');
            carMakeElement.textContent = make;
            const carPriceElement = document.createElement('p');
            carPriceElement.classList.add('car_price');
            carPriceElement.textContent = price;
            const hr = document.createElement('hr');
            hr.style.width = '100%';
            cartItem.appendChild(carMakeElement);
            cartItem.appendChild(carPriceElement);
            cartItem.appendChild(hr);
            this.cartElement.appendChild(cartItem);
        }
    };

    // обработка кнопок "добавить в корзину"
    const carCards = document.querySelectorAll('.car_card');
    carCards.forEach((card) => {
        const addToCartButton = card.querySelector('#add_to_cart');
        addToCartButton.addEventListener('click', () => {
            const make = card.querySelector('.make_mod_year').textContent;
            const price = card.querySelector('.car_price').textContent;
            cartManager.addToCart(make, price);
        });
    });

    // фильтрация
    function applyFilters() {
        // получение отмеченных марок
        const selectedMakes = Array.from(
            document.querySelectorAll('input[name="value-make"]:checked')
        ).map(input => input.value);

        // получение отмеченных цветов
        const selectedColors = Array.from(
            document.querySelectorAll('input[name="value-col"]:checked')
        ).map(input => input.value);

        // получение поискового запроса
        const searchQuery = document.querySelector('#que').value.toLowerCase();

        // перебор карточек на соответствие параметрам поиска и фильтрации
        carCards.forEach(card => {
            const carMake = card.querySelector('.make_mod_year').textContent.toLowerCase();
            const carColor = card.querySelector('.car_color').textContent.toLowerCase();
            const matchesMake = selectedMakes.length === 0 || selectedMakes.some(make => carMake.includes(make.toLowerCase()));
            const matchesColor = selectedColors.length === 0 || selectedColors.some(color => carColor.includes(color.toLowerCase()));
            const matchesQuery = carMake.includes(searchQuery);

            if (matchesMake && matchesColor && matchesQuery) {
                card.style.display = ''; // показываем элемент
            } else {
                card.style.display = 'none'; // скрываем элемент
            }
        });
    }

    // обработчик для изменения чекбоксов
    document.querySelectorAll('input[name="value-make"], input[name="value-col"]').forEach(input => {
        input.addEventListener('change', applyFilters);
    });

    // обработчик для ввода текста в поле поиска
    document.querySelector('#que').addEventListener('input', applyFilters);

    // начальная фильтрация
    applyFilters();

    const catalogContainer = document.querySelector('.catalog');

    // создание карточки автомобиля
    function createCarCard(make, mod, year, mileage, color, price, image = '/images/default.png') {
        const carCard = document.createElement('a');
        carCard.classList.add('car_card');
        carCard.innerHTML = `
            <img src="${image}" alt="${make}">
            <h4 class="make_mod_year">${make} ${mod} ${year}</h4>
            <p class="mileage">Пробег: ${mileage}км.</p>
            <p class="car_color">Цвет: ${color}</p>
            <p class="car_price">Цена: ${price}₽</p>
            <div class="heart-container" title="Like">
                <input type="checkbox" class="checkbox" id="Give-It-An-Id">
                    <div class="svg-container">
                        <svg viewBox="0 0 24 24" class="svg-outline" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z">
                            </path>
                        </svg>
                        <svg viewBox="0 0 24 24" class="svg-filled" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z">
                            </path>
                        </svg>
                        <svg class="svg-celebrate" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="10,10 20,20"></polygon>
                            <polygon points="10,50 20,50"></polygon>
                            <polygon points="20,80 30,70"></polygon>
                            <polygon points="90,10 80,20"></polygon>
                            <polygon points="90,50 80,50"></polygon>
                            <polygon points="80,80 70,70"></polygon>
                        </svg>
                    </div>
                </div>
            <button class="buttons" id="edit_car_button">Редактировать</button>
            <button class="buttons" id="delete_car_button">Удалить</button>
            <button class="buttons" id="add_to_cart">Добавить в корзину</button>
        `;

        // назначение обработчиков для новых кнопок
        carCard.querySelector('#edit_car_button').addEventListener('click', () => editCar(carCard));
        carCard.querySelector('#delete_car_button').addEventListener('click', () => deleteCar(carCard));

        catalogContainer.appendChild(carCard);
    }

    // добавление нового автомобиля
    function addCar() {
        const make = prompt('Введите марку автомобиля:');
        const mod = prompt('Введите модель автомобиля:');
        const year = prompt('Введите год выпуска:');
        const mileage = prompt('Введите пробег:');
        const color = prompt('Введите цвет:');
        const price = prompt('Введите цену:');
        const image = prompt('Введите URL или путь к изображению:');

        // если поля заполнены, запускаем создание карточки
        if (make && mod && year && mileage && color && price) {
            createCarCard(make, mod, year, mileage, color, price, image);
        } else {
            alert('Все поля обязательны для заполнения.');
        }
    }

    // редактирование автомобиля
    function editCar(card) {
        const makeModYearElement = card.querySelector('.make_mod_year');
        const mileageElement = card.querySelector('.mileage');
        const colorElement = card.querySelector('.car_color');
        const priceElement = card.querySelector('.car_price');

        // разделяем запись в поле с маркой на 3 части
        const [make, mod, year] = makeModYearElement.textContent.split(' ');
        const mileage = mileageElement.textContent.replace('Пробег: ', '');
        const color = colorElement.textContent.replace('Цвет: ', '');
        const price = priceElement.textContent.replace('Цена: ', '').replace('₽', '');

        const newMake = prompt('Введите марку автомобиля:', make) || make;
        const newMod = prompt('Введите модель автомобиля:', mod) || mod;
        const newYear = prompt('Введите год выпуска:', year) || year;
        const newMileage = prompt('Введите пробег:', mileage) || mileage;
        const newColor = prompt('Введите цвет:', color) || color;
        const newPrice = prompt('Введите цену:', price) || price;

        // присваиваем значения новым переменным
        makeModYearElement.textContent = `${newMake} ${newMod} ${newYear}`;
        mileageElement.textContent = `Пробег: ${newMileage}`;
        colorElement.textContent = `Цвет: ${newColor}`;
        priceElement.textContent = `Цена: ${newPrice}₽`;
    }

    // удаление автомобиля
    function deleteCar(card) {
        if (confirm('Вы уверены, что хотите удалить этот автомобиль?')) {
            card.remove();
        }
    }

    // назначение обработчиков для существующих кнопок
    document.querySelectorAll('.car_card').forEach((card) => {
        card.querySelector('#edit_car_button').addEventListener('click', () => editCar(card));
        card.querySelector('#delete_car_button').addEventListener('click', () => deleteCar(card));
    });

    // обработчик для кнопки добавления автомобиля
    document.querySelector('#add_car_btn').addEventListener('click', addCar);

});
