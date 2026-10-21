const colorBtn = document.getElementById("colorBtn");
const colors = ["#FFFFFF", "#F4F4F2", "#EDE6DB", "#E2E8E4", "#E9E4EF"];
let colorIndex = 0;

colorBtn.addEventListener("click", function () {
    colorIndex = colorIndex + 1;
    if (colorIndex >= colors.length) {
        colorIndex = 0;
    }
    document.body.style.backgroundColor = colors[colorIndex];
});
