// Assignment 5 — Dynamic Style Changes: переключатель День / Ночь
const themeBtn = document.getElementById("themeToggle");

function setTheme(theme) {
    if (theme === "night") {
        document.body.classList.add("night");
        document.documentElement.setAttribute("data-bs-theme", "dark"); // тёмный Bootstrap
        themeBtn.textContent = "☀ День";
    } else {
        document.body.classList.remove("night");
        document.documentElement.setAttribute("data-bs-theme", "light");
        themeBtn.textContent = "☾ Ночь";
    }
    localStorage.setItem("theme", theme); // запоминаем выбор для других страниц
}

themeBtn.addEventListener("click", function () {
    if (document.body.classList.contains("night")) {
        setTheme("day");
    } else {
        setTheme("night");
    }
    playSound("click");
});

// При загрузке страницы включаем сохранённую тему (если её нет — дневную)
setTheme(localStorage.getItem("theme") || "day");
