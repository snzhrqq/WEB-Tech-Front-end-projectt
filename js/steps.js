// Assignment 5 — Callbacks: многошаговая форма предзаказа (sizing.html)
const preorderForm = document.getElementById("preorderForm");
const formSteps = document.querySelectorAll(".form-step");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const submitOrderBtn = document.getElementById("submitOrder");
const stepIndicator = document.getElementById("stepIndicator");
const stepBar = document.getElementById("stepBar");
const stepError = document.getElementById("stepError");
const orderSummary = document.getElementById("orderSummary");
const orderSuccess = document.getElementById("orderSuccess");

const totalSteps = formSteps.length;
let currentStep = 1;

// CALLBACK — показывает нужный шаг через style.display
function showStep(step) {
    formSteps.forEach(function (formStep, index) {
        if (index + 1 === step) {
            formStep.style.display = "block";
        } else {
            formStep.style.display = "none";
        }
    });

    // кнопки: на первом шаге нет «Назад», на последнем вместо «Далее» — «Отправить»
    if (step === 1) {
        backBtn.style.display = "none";
    } else {
        backBtn.style.display = "inline-block";
    }
    if (step === totalSteps) {
        nextBtn.style.display = "none";
        submitOrderBtn.style.display = "inline-block";
        showSummary();
    } else {
        nextBtn.style.display = "inline-block";
        submitOrderBtn.style.display = "none";
    }

    stepIndicator.textContent = "Шаг " + step + " из " + totalSteps;
    stepBar.style.width = (step / totalSteps) * 100 + "%"; // полоса прогресса
}

// Функция, которая ПРИНИМАЕТ callback и вызывает его
function goToStep(step, callback) {
    currentStep = step;
    callback(currentStep);
}

// ОБЪЕКТ — все данные заказа
function getOrder() {
    return {
        category: document.getElementById("orderCategory").value,
        model: document.getElementById("orderModel").value.trim(),
        size: document.getElementById("orderSize").value,
        name: document.getElementById("orderName").value.trim(),
        phone: document.getElementById("orderPhone").value.trim(),
        city: document.getElementById("orderCity").value
    };
}

// Проверка: все поля текущего шага заполнены
function isStepValid(step) {
    const fields = formSteps[step - 1].querySelectorAll("input, select");
    for (let i = 0; i < fields.length; i++) {
        if (fields[i].value.trim() === "") {
            return false;
        }
    }
    return true;
}

// Шаг 3 — выводим свойства объекта order на страницу
function showSummary() {
    const order = getOrder();
    const labels = {
        category: "Категория",
        model: "Модель",
        size: "Размер",
        name: "Имя",
        phone: "Телефон",
        city: "Город"
    };

    orderSummary.innerHTML = "";
    for (const key in order) { // перебираем свойства объекта
        const li = document.createElement("li");
        li.textContent = labels[key] + ": " + order[key];
        orderSummary.appendChild(li);
    }
}

nextBtn.addEventListener("click", function () {
    if (!isStepValid(currentStep)) {
        stepError.textContent = "Заполните все поля на этом шаге.";
        return;
    }
    stepError.textContent = "";
    goToStep(currentStep + 1, showStep);
    playSound("click");
});

backBtn.addEventListener("click", function () {
    stepError.textContent = "";
    goToStep(currentStep - 1, showStep);
    playSound("click");
});

preorderForm.addEventListener("submit", function (event) {
    event.preventDefault(); // без перезагрузки страницы
    const order = getOrder();
    orderSuccess.textContent = "Спасибо, " + order.name + "! Предзаказ принят, мы свяжемся с вами в течение дня.";
    playSound("success");
    preorderForm.reset();
    goToStep(1, showStep);
});

// При загрузке показываем первый шаг
showStep(currentStep);
