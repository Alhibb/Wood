document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cartContainer');

    function displayCart() {
        const cartContainer = document.getElementById('cartContainer');
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartContainer.innerHTML = '';
        let totalPrice = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
              <h3>${item.name}</h3> 
              <p>Price: ₦${item.price}</p>
              <p>Quantity: <input type="number" value="${item.quantity}" min="1" data-product-id="${item.id}"></p>
              <button class="btn-remove" data-product-id="${item.id}">Remove</button>
            `;
            cartContainer.appendChild(cartItem);

            totalPrice += item.price * item.quantity;

            cartItem.querySelector('input[type="number"]').addEventListener('change', (event) => {
                updateCartItemQuantity(event.target);
            });

            cartItem.querySelector('.btn-remove').addEventListener('click', (event) => {
                removeFromCart(event.target.dataset.productId);
            });
        });

        const totalPriceElement = document.createElement('div');
        totalPriceElement.innerHTML = `<strong>Total Price: ₦${totalPrice.toFixed(2)}</strong>`;
        cartContainer.appendChild(totalPriceElement);
    }
    const checkoutBtn = document.getElementById('checkoutBtn');
    checkoutBtn.addEventListener('click', () => {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn'); 
    
        if (isLoggedIn) {
          window.location.href = 'checkout.html'; 
        } else {
          window.location.href = 'login.html';
        }
      });
    


    function updateCartItemQuantity(quantityInput) {
        const cartItem = quantityInput.closest('.cart-item');
        const productId = quantityInput.dataset.productId;
        const newQuantity = parseInt(quantityInput.value);

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const itemIndex = cart.findIndex(item => item.id === productId);

        if (itemIndex > -1) {
            cart[itemIndex].quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCart(); 
        }
    }

    function removeFromCart(productId) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        displayCart(); 
    }

    displayCart();
});
