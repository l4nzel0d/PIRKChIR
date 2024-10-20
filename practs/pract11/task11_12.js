const iconCart = document.querySelector(".iconCart");
const cartClose = document.querySelector(".cartButtons .close");
const body = document.querySelector("body");
const displayedProductListHTML = document.querySelector('.displayedProductList');
const cartListHTML = document.querySelector('.cartList');
const cartTabHTML = document.querySelector('.cartTab');
const cartIconCounterHTML = document.querySelector(".cartIconCounter");
const cartTotalCostHTML = document.querySelector(".cartTotalCost");
const overlayElement = document.querySelector('.pageOverlay');
const clearCartConfirmationContainer = document.querySelector('.clearCartConfirmationContainer');


let productList = [];
let cart = {
    products: [],
    totalCost: 0,
    totalItemCount: 0,
};

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

cartClose.addEventListener('click', () => {
    body.classList.remove('showCart');
})

document.addEventListener('keydown', (event) => {
    if (event.key == 'Escape') {
        if (body.classList.contains('showCart')) {
            body.classList.remove('showCart');
        }
    }
})

displayedProductListHTML.addEventListener('click', (event) => {
    let clickPosition = event.target;
    if (clickPosition.classList.contains('addToCart')) {
        let product_id = clickPosition.parentElement.dataset.id;
        addToCart(product_id);
    }
})


const addToCart = (product_id) => {
    let positionOfThisProductInCart = cart.products.findIndex((product) => product.product_id === product_id);
    let productInfo = productList.find(product => product.id == product_id);
    
    if (positionOfThisProductInCart < 0) {
        // New product in the cart
        cart.products.push({
            product_id: product_id,
            quantity: 1,
        });
        // Increment totals
        cart.totalItemCount += 1;
        cart.totalCost += productInfo.price;
    } else {
        // Product already exists in the cart, increment quantity
        cart.products[positionOfThisProductInCart].quantity += 1;
        // Adjust totals based on the added quantity
        cart.totalItemCount += 1;
        cart.totalCost += productInfo.price;
    }

    addCartToHTML();
    addCartToMemory();
};

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

const addCartToHTML = () => {
    cartListHTML.innerHTML = '';
    if (cart.products.length > 0) {
        cart.products.forEach(product => {
            let newProductInCart = document.createElement('div');
            newProductInCart.classList.add('item');
            newProductInCart.dataset.id = product.product_id;
            let positionOfThisProductInProductList = productList.findIndex((element) => element.id == product.product_id);
            let info = productList[positionOfThisProductInProductList];
            newProductInCart.innerHTML = `
            <div class="image">
                <img src="${info.image}" alt="">
            </div>
            <div class="name">
                ${info.name}
            </div>
            <div class="totalPrice">
                $${info.price * product.quantity}
            </div>
            <div class="quantity">
                <span class="minus">
                    <i class="fa-solid fa-minus"></i>
                </span>
                <span class="itemQuantityCounter">${product.quantity}</span>
                <span class="plus">
                    <i class="fa-solid fa-plus"></i>
                </span>
                <span class="trash">
                    <span class="fa-solid fa-trash-can"></span>
                </span>
            </div>
        `;
            cartListHTML.appendChild(newProductInCart);
        })
    }
    updateCartIconCounter();
    updateCartTotalCost();
}

const updateCartIconCounter = () => {
    cartIconCounterHTML.textContent = cart.totalItemCount;
}

const updateCartTotalCost = () => {
    cartTotalCostHTML.textContent = cart.totalCost;
}

cartTabHTML.addEventListener('click', (event) => {
    let clickTarget = event.target;
    console.log(clickTarget);
    let clickTargetParent = clickTarget.parentElement;
    let type = undefined;
    type = ['minus', 'plus', 'trash', 'clear'].find(specialClass => clickTargetParent.classList.contains(specialClass));

    if (['minus', 'plus', 'trash'].includes(type)) {
        let product_id = clickTarget.parentElement.parentElement.parentElement.dataset.id;
        changeQuantity(product_id, type);
    } else if (type == 'clear') {
        askToConfirmClearCart();
    }
})

const askToConfirmClearCart = () => {
    if (cart.totalItemCount == 0) return;
    overlayElement.classList.remove("hidden");
    clearCartConfirmationContainer.classList.remove("hidden");
}

clearCartConfirmationContainer.addEventListener('click', (event) => {
    const target = event.target;

    if (target.tagName !== 'BUTTON') return;

    if (target.id === "confirmClear") {
        clearCart();
    }

    hideConfirmClearCart();
})

const hideConfirmClearCart = () => {
    overlayElement.classList.add("hidden");
    clearCartConfirmationContainer.classList.add("hidden");
}



const clearCart = () => {
    cart.products = [];
    cart.totalItemCount = 0;
    cart.totalCost = 0;
    addCartToHTML();
    localStorage.removeItem('cart');
}

const changeQuantity = (product_id, type) => {
    let positionOfThisProductInCart = cart.products.findIndex((product) => product.product_id == product_id);
    if (positionOfThisProductInCart >= 0) {
        let product = cart.products[positionOfThisProductInCart];
        let productInfo = productList.find(product => product.id == product_id);
        switch (type) {
            case 'plus':
                product.quantity++;
                cart.totalItemCount++;
                cart.totalCost += productInfo.price;
                break;
            case 'minus':
                if (product.quantity > 1) {
                    product.quantity--;
                    cart.totalItemCount--;
                    cart.totalCost -= productInfo.price;
                    break;
                }
                // Otherwise trash block executes
            case 'trash':
                cart.totalItemCount -= product.quantity;
                cart.totalCost -= productInfo.price * product.quantity;
                cart.products.splice(positionOfThisProductInCart, 1);
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
}



// Filter and Sort section

const sortByDropdown = document.getElementById('sortBy');
const minPriceInput = document.getElementById('minPrice');
const maxPriceInput = document.getElementById('maxPrice');
const applyFilterButton = document.getElementById('applyFilter');

let filteredProducts = [...productList];


const applyFiltersAndSort = () => {
    const minPrice = parseFloat(minPriceInput.value) || 0;
    const maxPrice = parseFloat(maxPriceInput.value) || Infinity;

    filteredProducts = productList.filter((product) => {
        return product.price >= minPrice && product.price <= maxPrice
    })

    const sortBy = sortByDropdown.value;
    switch (sortBy) {
        case 'name-asc':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'price-asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
    }

    addFilteredProductsToHTML();
}

const addFilteredProductsToHTML= () => {
    displayedProductListHTML.innerHTML = "";
    filteredProducts.forEach((product) => {
        let newProduct = document.createElement('div');
        newProduct.classList.add('item');
        newProduct.dataset.id = product.id;
        newProduct.innerHTML = `
            <img src="${product.image}" alt="">
            <h2>${product.name}</h2>
            <div class="price">$${product.price}</div>
            <button class="addToCart">Add to Cart</button>
        `;
        displayedProductListHTML.appendChild(newProduct);
    });
}

sortByDropdown.addEventListener('change', applyFiltersAndSort);
applyFilterButton.addEventListener('click', applyFiltersAndSort);


const initApp = () => {
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        productList = data;
        // addDataToHTML();
        applyFiltersAndSort();

        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    })
}

initApp();
addCartToHTML();
