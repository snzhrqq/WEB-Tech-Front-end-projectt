// Assignment 5 — Selecting and Manipulating HTML Elements: звёзды рейтинга
const stars = document.querySelectorAll(".star");
const ratingText = document.getElementById("ratingText");
const ratingMessages = ["", "Не понравилось", "Так себе", "Нормально", "Хорошо", "Отлично!"];

stars.forEach(function (star, index) {
    star.addEventListener("click", function () {
        const rating = index + 1; // index начинается с 0, а оценка с 1

        // красим все звёзды до выбранной включительно
        stars.forEach(function (otherStar, otherIndex) {
            if (otherIndex < rating) {
                otherStar.classList.add("selected");
            } else {
                otherStar.classList.remove("selected");
            }
        });

        ratingText.textContent = "Ваша оценка: " + rating + " из 5 — " + ratingMessages[rating];
        playSound("click");
    });
});
