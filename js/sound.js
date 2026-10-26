// Assignment 5 — Play Sounds
// Все звуки сайта в одном объекте. Подключается на каждой странице.
const sounds = {
    click: new Audio("sounds/click.wav"),
    add: new Audio("sounds/add.wav"),
    success: new Audio("sounds/success.wav")
};

// Проигрывает звук по имени: playSound("click")
function playSound(name) {
    const sound = sounds[name];
    sound.currentTime = 0; // начинаем с начала, поэтому звуки не накладываются
    sound.play();
}
