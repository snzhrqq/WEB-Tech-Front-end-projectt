// Assignment 5 — Keyboard Event Handling: навигация по меню стрелками
// Tab — зайти в меню, стрелки — двигаться по пунктам, Enter — открыть страницу
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

navLinks.forEach(function (link, index) {
    link.addEventListener("keydown", function (event) {
        let newIndex;

        switch (event.key) {
            case "ArrowRight":
            case "ArrowDown":
                newIndex = index + 1;
                if (newIndex === navLinks.length) {
                    newIndex = 0; // с последнего пункта — на первый
                }
                break;
            case "ArrowLeft":
            case "ArrowUp":
                newIndex = index - 1;
                if (newIndex < 0) {
                    newIndex = navLinks.length - 1; // с первого — на последний
                }
                break;
            case "Home":
                newIndex = 0;
                break;
            case "End":
                newIndex = navLinks.length - 1;
                break;
            default:
                return; // другие клавиши не трогаем
        }

        event.preventDefault(); // чтобы страница не прокручивалась стрелками
        navLinks[newIndex].focus();
    });
});
