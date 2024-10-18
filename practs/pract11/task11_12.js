const iconCart = document.querySelector(".iconCart");
const cartClose = document.querySelector(".cartButtons .close");
const body = document.querySelector("body");
const displayedProductListHTML = document.querySelector('.displayedProductList');
const cartListHTML = document.querySelector('.cartList');
const cartIconCounterHTML = document.querySelector(".cartIconCounter");
const cartTotalCostHTML = document.querySelector(".cartTotalCost");

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

const addDataToHTML = () => {
    displayedProductListHTML.innerHTML = "";
    if(productList.length > 0){
        productList.forEach(product => {
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
        })
    }
}

displayedProductListHTML.addEventListener('click', (event) => {
    let clickPosition = event.target;
    if (clickPosition.classList.contains('addToCart')) {
        let product_id = clickPosition.parentElement.dataset.id;
        addToCart(product_id);
    }
})


const addToCart = (product_id) => {
    let positionOfThisProductInCart = cart.products.findIndex((product) => product.product_id === product_id);
    if (cart.products.length <= 0) {
        cart.products = [{
            product_id: product_id,
            quantity: 1,
        }]
    } else if (positionOfThisProductInCart < 0) {
        cart.products.push({
            product_id: product_id,
            quantity: 1,
        })
    } else {
        cart.products[positionOfThisProductInCart].quantity += 1;
    }
    cart.totalItemCount = cart.products.reduce((acc, item) => acc + item.quantity, 0);
    cart.totalCost = cart.products.reduce((acc, item) => {
        let productInfo = productList.find(product => product.id == item.product_id);
        return acc + (productInfo.price * item.quantity);
    }, 0);

    console.log(cart)
    addCartToHTML();
    addCartToMemory();
}

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
                    <span class="fa-solid fa-trash"></span>
                </span>
            </div>
        `;
            console.log(newProductInCart);
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

cartListHTML.addEventListener('click', (event) => {
    let clickTarget = event.target;
    let clickTargetParent = clickTarget.parentElement;
    let type = undefined;
    if (clickTargetParent.classList.contains('minus')) {
        type = 'minus';
    }
    else if (clickTargetParent.classList.contains('plus')) {
        type = 'plus';
    }
    else if (clickTargetParent.classList.contains('trash')){
        type = 'trash';
    }

    if (type) {
        let product_id = clickTarget.parentElement.parentElement.parentElement.dataset.id;
        changeQuantity(product_id, type);
    }
})

const changeQuantity = (product_id, type) => {
    let positionOfThisProductInCart = cart.products.findIndex((product) => product.product_id == product_id);
    if (positionOfThisProductInCart >= 0) {
        switch (type) {
            case 'plus':
                cart.products[positionOfThisProductInCart].quantity += 1;
                break;
            case 'minus':
                if (cart.products[positionOfThisProductInCart].quantity - 1 > 0) {
                    cart.products[positionOfThisProductInCart].quantity -= 1;
                    break;
                }
            case 'trash':
                cart.products.splice(positionOfThisProductInCart, 1);
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
}

const initApp = () => {
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        productList = data;
        addDataToHTML();

        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    })
}

initApp();
addCartToHTML();
