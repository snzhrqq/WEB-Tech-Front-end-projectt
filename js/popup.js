const popup = document.getElementById("popup");
const openBtn = document.getElementById("openPopup");
const closeBtn = document.getElementById("closePopup");
const subscribeForm = document.getElementById("subscribeForm");
const subSuccess = document.getElementById("subSuccess");

openBtn.addEventListener("click", function () {
    popup.classList.add("active");
});

closeBtn.addEventListener("click", function () {
    popup.classList.remove("active");
});

popup.addEventListener("click", function (event) {
    if (event.target === popup) {
        popup.classList.remove("active");
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        popup.classList.remove("active");
    }
});

subscribeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    subSuccess.textContent = "Спасибо! Мы напишем вам на почту.";
    subscribeForm.reset();
});
