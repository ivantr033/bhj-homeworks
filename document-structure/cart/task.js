const cart = document.querySelector('.cart');
const cartProducts = document.querySelector('.cart__products');
const products = Array.from(document.querySelectorAll('.product'));

// Save product list in cart (local)
function saveCart() {
    const data = Array.from(cartProducts.querySelectorAll('.cart__product')).map(item => ({
        id: item.dataset.id,
        src: item.querySelector('.cart__product-image').src,
        count: item.querySelector('.cart__product-count').textContent
    }));
    localStorage.setItem('cart_items', JSON.stringify(data));
    
    // Hide cart if empty
    cart.style.display = data.length === 0 ? 'none' : 'block';
}

// Load product list (local) to cart
function loadCart() {
    const saved = JSON.parse(localStorage.getItem('cart_items') || '[]');
    saved.forEach(item => renderProduct(item.id, item.src, parseInt(item.count)));
    cart.style.display = saved.length === 0 ? 'none' : 'block';
}

// Rendering products in cart
function renderProduct(id, src, count) {
    const existingProduct = cartProducts.querySelector(`.cart__product[data-id="${id}"]`);

    if (existingProduct) {
        const countElement = existingProduct.querySelector('.cart__product-count');
        countElement.textContent = parseInt(countElement.textContent) + count;
    } else {
        const productHtml = `
            <div class="cart__product" data-id="${id}">
                <img class="cart__product-image" src="${src}">
                <div class="cart__product-count">${count}</div>
            </div>`;
        cartProducts.insertAdjacentHTML('beforeend', productHtml);
    }
}

// Products list interactions
products.forEach(product => {
    const id = product.dataset.id;
    const addBtn = product.querySelector('.product__add');
    const quantityValue = product.querySelector('.product__quantity-value');
    const productImage = product.querySelector('.product__image');

    // Product controls
    product.addEventListener('click', (e) => {
        let currentCount = parseInt(quantityValue.textContent);
        if (e.target.classList.contains('product__quantity-control_inc')) {
            quantityValue.textContent = currentCount + 1;
        } else if (e.target.classList.contains('product__quantity-control_dec') && currentCount > 1) {
            quantityValue.textContent = currentCount - 1;
        }
    });

    // Adding to cart with Animation
    addBtn.onclick = () => {
        const countToAdd = parseInt(quantityValue.textContent);
        
        // --- Flying animation ---
        const flyImg = productImage.cloneNode();
        const startRect = productImage.getBoundingClientRect();
        
        const inCart = cartProducts.querySelector(`.cart__product[data-id="${id}"]`);
        let endRect;

        if (inCart) {
            endRect = inCart.querySelector('.cart__product-image').getBoundingClientRect();
        } else {
            // If is new, fly to the center of the container
            const cartRect = cartProducts.getBoundingClientRect();
            endRect = {
                left: cartRect.left + (cartProducts.children.length * 110), // 110px is aprox width + margin
                top: cartRect.top
            };
        }

        Object.assign(flyImg.style, {
            position: 'fixed',
            left: `${startRect.left}px`,
            top: `${startRect.top}px`,
            width: `${startRect.width}px`,
            height: `${startRect.height}px`,
            zIndex: '1000',
            transition: 'all 0.6s ease-in-out',
            pointerEvents: 'none',
            borderRadius: '50%'
        });

        document.body.appendChild(flyImg);

        cart.style.display = 'block'; 

        setTimeout(() => {
            Object.assign(flyImg.style, {
                left: `${endRect.left}px`,
                top: `${endRect.top}px`,
                opacity: '0.4'
            });
        }, 10);

        setTimeout(() => {
            flyImg.remove();
            renderProduct(id, productImage.src, countToAdd);
            saveCart();
        }, 600);
    };
});

// Remove products from cart
cartProducts.onclick = (e) => {
    const productInCart = e.target.closest('.cart__product');
    if (productInCart) {
        productInCart.remove();
        saveCart();
    }
};

// Initialization
loadCart();