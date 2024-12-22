// скрипты работают после загрузки html
document.addEventListener('DOMContentLoaded', function () {
    // объект для управления корзиной
    const cartManager = {
        // получаем контейнер корзины
        cartElement: document.querySelector('.cart_panel'),
        // метод добавления в корзину
        addToCart: function (make, price) {
            // создаем "a" с информацией об авто
            const cartItem = document.createElement('a');
            cartItem.classList.add('cart_card'); // добавляем класс элементу

            const carMakeElement = document.createElement('p'); // создаём блок с текстом
            carMakeElement.classList.add('make_mod_year'); // добавляем ему класс
            carMakeElement.textContent = make; // записываем в него название авто

            const carPriceElement = document.createElement('p');
            carPriceElement.classList.add('car_price');
            carPriceElement.textContent = price;
            const hr = document.createElement('hr');
            hr.style.width = '100%';

            // добавляем элементы в карточку и карточку в корзину
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
            // извлечение информации об авто
            const make = card.querySelector('.make_mod_year').textContent;
            const price = card.querySelector('.car_price').textContent;

            // добавление авто в корзину
            cartManager.addToCart(make, price);
        });
    });
});
