// Div внутри корзины, в который мы добавляем товары
const cartWrapper = document.querySelector('.cart-wrapper');

function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');

    if (savedCart) {
        cartWrapper.innerHTML = savedCart;

        // Восстановление обработчиков событий для элементов корзины
        restoreCartEventListeners();

        // Обновление итоговой стоимости корзины и отображение кнопки заказа
        calcCartPriceAndDelivery();
        toggleCartStatus();
    }
}

// Восстановление обработчиков событий для элементов корзины
function restoreCartEventListeners() {
    // Обновление количества товаров
    const quantityControls = cartWrapper.querySelectorAll('.counter-wrapper');
    quantityControls.forEach(control => {
        control.addEventListener('click', function (event) {
            // Замените эту функцию на вашу функцию обновления количества
            console.log('Обновление количества');
        });
    });

    // Удаление товаров (если у вас есть кнопка удаления товара)
    const removeButtons = cartWrapper.querySelectorAll('.remove-button');
    removeButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            // Замените эту функцию на вашу функцию удаления товара
            console.log('Удаление товара');
        });
    });

    // Обновление итоговой стоимости корзины
    // Замените эту функцию на вашу функцию обновления итоговой стоимости корзины
    console.log('Обновление итоговой стоимости корзины');
}

// Загрузить корзину из LocalStorage при загрузке страницы
loadCartFromLocalStorage();


// Сохранить корзину в LocalStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', cartWrapper.innerHTML);
}

// Отслеживаем клик на странице
window.addEventListener('click', function (event) {
    // Проверяем что клик был совершен по кнопке "Добавить в корзину"
    if (event.target.hasAttribute('data-cart')) {

        // Находим карточку с товаром, внутри котрой был совершен клик
        const card = event.target.closest('.card');

        // Собираем данные с этого товара и записываем их в единый объект productInfo
        const productInfo = {
            id: card.dataset.id,
            imgSrc: card.querySelector('.product-img').getAttribute('src'),
            title: card.querySelector('.item-title').innerText,
            itemsInBox: card.querySelector('[data-items-in-box]').innerText,
            weight: card.querySelector('.price__weight').innerText,
            price: card.querySelector('.price__currency').innerText,
            counter: card.querySelector('[data-counter]').innerText,
        };

        // Проверять если ли уже такой товар в корзине
        const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);

        // Если товар есть в корзине
        if (itemInCart) {
            const counterElement = itemInCart.querySelector('[data-counter]');
            counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfo.counter);
        } else {
            // Если товара нет в корзине

            // Собранные данные подставим в шаблон для товара в корзине
            const cartItemHTML = `<div class="cart-item" data-id="${productInfo.id}">
								<div class="cart-item__top">
									<div class="cart-item__img">
										<img src="${productInfo.imgSrc}" alt="${productInfo.title}">
									</div>
									<div class="cart-item__desc">
										<div class="cart-item__title">${productInfo.title}</div>
										<div class="cart-item__weight">${productInfo.itemsInBox} </div>

										<!-- cart-item__details -->
										<div class="cart-item__details">

											<div class="items items--small counter-wrapper">
												<div class="items__control" data-action="minus">-</div>
												<div class="items__current" data-counter="">${productInfo.counter}</div>
												<div class="items__control" data-action="plus">+</div>
											</div>

											<div class="price">
												<div class="price__currency">${productInfo.price}</div>
											</div>

										</div>
										<!-- // cart-item__details -->

									</div>
								</div>
							</div>`;

			// Отобразим товар в корзине
			cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML);
		}
		
				// Сбрасываем счетчик добавленного товара на "1"
				card.querySelector('[data-counter]').innerText = '1';
		
				// Отображение статуса корзины Пустая / Полная
				toggleCartStatus();
		
				// Пересчет общей стоимости товаров в корзине
				calcCartPriceAndDelivery();
		
				// Сохранить корзину в LocalStorage
				saveCartToLocalStorage();
			}
		});

		// Находим кнопку "Заказать"
const orderButton = document.querySelector('.btn.btn-primary');

// Находим поля ввода номера телефона и электронной почты
const phoneInput = document.querySelector('.form-control');
const emailInput = document.querySelector('.form-control');

// Обработчик событий для кнопки "Заказать"
orderButton.addEventListener('click', function (event) {
    // Предотвратить поведение отправки формы по умолчанию
    event.preventDefault();

    // Проверить, что поля "Ваш номер телефона" и "Ваша почта" не пустые
    if (phoneInput.value.trim() === '' || emailInput.value.trim() === '') {
        alert('Пожалуйста, заполните поля "Ваш номер телефона" и "Ваша почта"');
        return;
    }

    // Очистить корзину
    clearCart();

    // Отображение сообщения
    alert('Заказ оформлен. Ожидайте звонка от Менеджера для подтверждения');
});

// Функция для очистки корзины
function clearCart() {
    // Удаление всех элементов корзины
    cartWrapper.innerHTML = '';

    // Очистить корзину в LocalStorage
    localStorage.removeItem('cart');

    // Обновление итоговой стоимости корзины и отображение кнопки заказа
    calcCartPriceAndDelivery();
    toggleCartStatus();
}

		
		
		// Загрузить корзину из LocalStorage при загрузке страницы
		loadCartFromLocalStorage();
		
