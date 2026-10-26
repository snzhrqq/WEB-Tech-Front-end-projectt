// Assignment 5 — Event Listener on Button: кнопка очистки формы
const resetBtn = document.getElementById("resetBtn");
const regForm = document.getElementById("registerForm");
const regMessage = document.getElementById("regSuccess");

resetBtn.addEventListener("click", function () {
    // очищаем все поля формы
    regForm.querySelectorAll("input").forEach(input => input.value = "");

    // убираем красные ошибки, если они были
    regForm.querySelectorAll(".is-invalid").forEach(input => input.classList.remove("is-invalid"));

    regMessage.textContent = "Форма очищена.";
    playSound("click");
});
