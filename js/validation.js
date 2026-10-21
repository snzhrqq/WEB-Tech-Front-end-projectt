const form = document.getElementById("registerForm");
const nameInput = document.getElementById("regName");
const emailInput = document.getElementById("regEmail");
const passwordInput = document.getElementById("regPassword");
const confirmInput = document.getElementById("regConfirm");
const success = document.getElementById("regSuccess");

function showError(input, message) {
    const errorBox = input.nextElementSibling;
    errorBox.textContent = message;
    input.classList.add("is-invalid");
}

function clearError(input) {
    const errorBox = input.nextElementSibling;
    errorBox.textContent = "";
    input.classList.remove("is-invalid");
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    let isValid = true;
    success.textContent = "";

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirm = confirmInput.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === "") {
        showError(nameInput, "Введите имя");
        isValid = false;
    } else {
        clearError(nameInput);
    }

    if (email === "") {
        showError(emailInput, "Введите email");
        isValid = false;
    } else if (!emailPattern.test(email)) {
        showError(emailInput, "Неверный формат email, например: you@example.com");
        isValid = false;
    } else {
        clearError(emailInput);
    }

    if (password === "") {
        showError(passwordInput, "Введите пароль");
        isValid = false;
    } else if (password.length < 8) {
        showError(passwordInput, "Пароль должен быть не короче 8 символов");
        isValid = false;
    } else {
        clearError(passwordInput);
    }

    if (confirm === "") {
        showError(confirmInput, "Повторите пароль");
        isValid = false;
    } else if (confirm !== password) {
        showError(confirmInput, "Пароли не совпадают");
        isValid = false;
    } else {
        clearError(confirmInput);
    }

    if (isValid) {
        success.textContent = "Аккаунт создан! Добро пожаловать, " + name + ".";
        form.reset();
    }
});

[nameInput, emailInput, passwordInput, confirmInput].forEach(function (input) {
    input.addEventListener("input", function () {
        clearError(input);
    });
});
