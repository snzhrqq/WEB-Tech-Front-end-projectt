// Assignment 5 — Objects, Arrays, Loops, Higher-Order Functions, Switch, Sounds, Animations
// Быстрый подбор товаров + корзина предзаказа (catalog.html)

// 1. МАССИВ ОБЪЕКТОВ — все товары каталога
const products = [
    { name: "Gentle Monster — Sunglasses", category: "glasses", price: 25000, image: "images/product1.jpg" },
    { name: "Gentle Monster × Maison Margiela — Optical", category: "glasses", price: 30000, image: "images/product4.jpg" },
    { name: "Gentle Monster — Rimless Optical", category: "glasses", price: 28000, image: "images/product5.jpg" },
    { name: "Hysteric Glamour — Jacket", category: "jackets", price: 55000, image: "images/product6.jpg" },
    { name: "Saint Laurent — Leather Jacket", category: "jackets", price: 140000, image: "images/product2.jpg" },
    { name: "Ann Demeulemeester — Jacket", category: "jackets", price: 45000, image: "images/product21.jpg" },
    { name: "LGB — Jacket", category: "jackets", price: 40000, image: "images/product19.jpg" },
    { name: "Maison Margiela — Leather Jacket", category: "jackets", price: 60000, image: "images/product13.jpg" },
    { name: "Saint Laurent — Knitted Zip Hoodie", category: "knitwear", price: 20000, image: "images/product7.jpg" },
    { name: "Dior — Sweater", category: "knitwear", price: 13000, image: "images/product8.jpg" },
    { name: "20471120 — Hoodie", category: "knitwear", price: 33000, image: "images/product9.jpg" },
    { name: "Vetements — Hoodie", category: "knitwear", price: 30000, image: "images/product10.jpg" },
    { name: "Jean Paul Gaultier — Long Sleeve", category: "knitwear", price: 15000, image: "images/product11.jpg" },
    { name: "Gucci — Hoodie", category: "knitwear", price: 20000, image: "images/product18.jpg" },
    { name: "Balmain — Sweater", category: "knitwear", price: 25000, image: "images/product14.jpg" },
    { name: "Vivienne Westwood — T-Shirt", category: "tshirts", price: 15000, image: "images/product12.jpg" },
    { name: "Dior — T-Shirt", category: "tshirts", price: 13000, image: "images/product16.jpg" },
    { name: "Saint Laurent — T-Shirt", category: "tshirts", price: 11000, image: "images/product25.jpg" },
    { name: "Rick Owens — Waxed Jeans", category: "pants", price: 48000, image: "images/product23.jpg" },
    { name: "Undercover — Jeans", category: "pants", price: 35000, image: "images/product24.jpg" },
    { name: "Enfants Riches Déprimés — Velvet Pants", category: "pants", price: 27000, image: "images/product17.jpg" },
    { name: "Dior — Sneakers", category: "shoes", price: 65000, image: "images/product3.jpg" },
    { name: "Saint Laurent — Sneakers (white)", category: "shoes", price: 35000, image: "images/product15.jpg" },
    { name: "No Faith Studios — Sneakers", category: "shoes", price: 40000, image: "images/product20.jpg" },
    { name: "Saint Laurent — Sneakers (black)", category: "shoes", price: 35000, image: "images/product22.jpg" }
];

// 2. ОБЪЕКТ С МЕТОДАМИ — корзина предзаказа
const cart = {
    items: [],

    add: function (product) {
        this.items.push(product);
    },

    clear: function () {
        this.items = [];
    },

    getCount: function () {
        return this.items.length;
    },

    getTotal: function () {
        let total = 0;
        for (let i = 0; i < this.items.length; i++) { // цикл for
            total = total + this.items[i].price;
        }
        return total;
    }
};

// Находим элементы на странице
const productGrid = document.getElementById("productGrid");
const filterButtons = document.querySelectorAll(".filter-btn");
const resultText = document.getElementById("resultText");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const cartList = document.getElementById("cartList");
const cartClearBtn = document.getElementById("cartClear");

// 25000 → "25 000 ₸"
function formatPrice(price) {
    return price.toLocaleString("ru-RU") + " ₸";
}

// 3. SWITCH — какие товары показать по нажатой кнопке
function getProductsByFilter(filter) {
    switch (filter) {
        case "glasses":
        case "jackets":
        case "knitwear":
        case "tshirts":
        case "pants":
        case "shoes":
            // filter — функция высшего порядка: принимает другую функцию
            return products.filter(function (product) {
                return product.category === filter;
            });
        case "cheap":
            return products.filter(function (product) {
                return product.price <= 20000;
            });
        case "premium":
            return products.filter(function (product) {
                return product.price >= 50000;
            });
        default: // "all"
            return products;
    }
}

// 4. ЦИКЛ — рисуем карточки товаров на странице
function renderProducts(list) {
    productGrid.innerHTML = ""; // очищаем старые карточки

    for (let i = 0; i < list.length; i++) {
        const product = list[i];

        const card = document.createElement("div");
        card.className = "shop-card";
        card.innerHTML =
            '<img src="' + product.image + '" alt="' + product.name + '">' +
            '<h3>' + product.name + '</h3>' +
            '<p class="shop-price">' + formatPrice(product.price) + '</p>' +
            '<button type="button" class="btn btn-dark btn-sm">В предзаказ</button>';

        card.querySelector("button").addEventListener("click", function () {
            addToCart(product, card);
        });

        productGrid.appendChild(card);
    }

    resultText.textContent = "Показано: " + list.length + " из " + products.length;
}

// Обновляем блок корзины на странице
function updateCart() {
    cartCount.textContent = cart.getCount();
    cartTotal.textContent = formatPrice(cart.getTotal());

    // map — функция высшего порядка: из массива товаров делаем массив строк
    const names = cart.items.map(function (item) {
        return item.name;
    });
    if (names.length === 0) {
        cartList.textContent = "Пока пусто";
    } else {
        cartList.textContent = names.join(", ");
    }
}

// Добавление товара: метод объекта + звук + анимация
function addToCart(product, card) {
    cart.add(product);
    updateCart();
    playSound("add");

    // анимация карточки (CSS @keyframes)
    card.classList.add("added");
    setTimeout(function () {
        card.classList.remove("added");
    }, 500);

    // анимация счётчика через style.transform
    cartCount.style.transform = "scale(1.6)";
    setTimeout(function () {
        cartCount.style.transform = "scale(1)";
    }, 200);
}

// Кнопки фильтров (forEach — тоже функция высшего порядка)
filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        filterButtons.forEach(function (otherButton) {
            otherButton.classList.remove("active");
        });
        button.classList.add("active");

        const filter = button.getAttribute("data-filter");
        renderProducts(getProductsByFilter(filter));
        playSound("click");
    });
});

cartClearBtn.addEventListener("click", function () {
    cart.clear();
    updateCart();
    playSound("click");
});

// При загрузке показываем все товары
renderProducts(products);
updateCart();
