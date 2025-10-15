
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButton = document.querySelector('.btn');
    const cartItemsContainer = document.querySelector('#cart-items');
    const cartTotal = document.querySelector('#cart-total');
    const clearCartButton = document.querySelector('#clear-cart');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        }
    }

    if (addToCartButton) {
        addToCartButton.addEventListener('click', (e) => {
            e.preventDefault();
            const machineDetails = document.querySelector('#machine-details');
            const productName = machineDetails.querySelector('h2').textContent;
            const price = parseFloat(machineDetails.querySelector('.price').textContent.replace('R', '').replace(',', '.'));
            const quantity = parseInt(document.querySelector('.quantity-input').value);
            const imageSrc = machineDetails.querySelector('.machine-image img').getAttribute('src');

            const item = {
                productName,
                price,
                quantity,
                imageSrc
            };

            cart.push(item);
            localStorage.setItem('cart', JSON.stringify(cart));
            window.location.href = 'cart.html';
        });
    }

    if (cartItemsContainer) {
        if (cart.length > 0) {
            let cartHtml = '';
            let total = 0;
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                cartHtml += `
                    <div class="cart-item">
                        <div class="cart-item-image">
                            <img src="${item.imageSrc}" alt="${item.productName}">
                        </div>
                        <div class="cart-item-details">
                            <h3>${item.productName}</h3>
                            <p>Price: R${item.price.toFixed(2)}</p>
                            <p>Quantity: ${item.quantity}</p>
                        </div>
                        <div class="cart-item-total">
                            <p>Total: R${itemTotal.toFixed(2)}</p>
                        </div>
                    </div>
                `;
                total += itemTotal;
            });
            cartItemsContainer.innerHTML = cartHtml;
            if (cartTotal) {
                cartTotal.innerHTML = `
                    <h3>Total: R${total.toFixed(2)}</h3>
                    <div class="cart-buttons">
                        <a href="index.html" class="btn btn-secondary">Continue Shopping</a>
                        <a href="customer-details.html" class="btn">Checkout</a>
                    </div>
                `;
            }
        } else {
            cartItemsContainer.innerHTML = '<p>Your cart is currently empty.</p>';
        }
    }
    
    if (clearCartButton) {
        clearCartButton.addEventListener('click', () => {
            localStorage.removeItem('cart');
            window.location.reload();
        });
    }

    updateCartCount();
});
