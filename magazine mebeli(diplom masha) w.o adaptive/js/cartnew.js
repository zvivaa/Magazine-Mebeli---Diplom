// Вспомогательные функции
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
    const cartJSON = localStorage.getItem("cart");
    return cartJSON ? JSON.parse(cartJSON) : [];
}

// Обновление корзины
function updateCart() {
    const cart = loadCart();

    // Очистить корзину
    const cartWrapper = document.querySelector(".cart-wrapper");
    cartWrapper.innerHTML = '';

    // Отобразить товары в корзине
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <p class="product-title">${item.title}</p>
            <p class="product-price">${item.price} ₽</p>
            <p class="product-quantity">Количество: ${item.quantity}</p>
        `;

        cartWrapper.appendChild(cartItem);
    });

    // Обновление итоговой суммы
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    document.querySelector(".total-price").innerText = totalPrice;
}

// Добавление товара в корзину
function addToCart(title, price) {
    const cart = loadCart();
    const itemIndex = cart.findIndex(item => item.title === title);

    if (itemIndex > -1) {
        // Увеличить количество товара, если он уже есть в корзине
        cart[itemIndex].quantity += 1;
    } else {
        // Добавить новый товар в корзину
        cart.push({ title, price, quantity: 1 });
    }

    saveCart(cart);
    updateCart();
}

// Обработка клика на кнопку "Купить"
document.querySelectorAll('[data-cart]').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.card');
        const title = card.querySelector('.item-title').innerText;
        const price = parseInt(card.querySelector('.price__currency').innerText.replace(/\D/g, ''));

        addToCart(title, price);
    });
});

// Инициализация корзины при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    updateCart();
});
