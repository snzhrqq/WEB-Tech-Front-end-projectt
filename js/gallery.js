// Assignment 5 — Manipulating Attributes: галерея с миниатюрами
const mainImage = document.getElementById("mainImage");
const mainCaption = document.getElementById("mainCaption");
const thumbs = document.querySelectorAll(".thumb");

thumbs.forEach(function (thumb) {
    thumb.addEventListener("click", function () {
        mainImage.classList.add("fade"); // картинка плавно исчезает (CSS transition)

        setTimeout(function () {
            // меняем атрибуты большой картинки на атрибуты миниатюры
            mainImage.setAttribute("src", thumb.getAttribute("src"));
            mainImage.setAttribute("alt", thumb.getAttribute("alt"));
            mainCaption.textContent = thumb.getAttribute("data-caption");
            mainImage.classList.remove("fade"); // и плавно появляется
        }, 250);

        // подсвечиваем выбранную миниатюру
        thumbs.forEach(function (otherThumb) {
            otherThumb.classList.remove("active");
        });
        thumb.classList.add("active");

        playSound("click");
    });
});
