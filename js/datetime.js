const datetimeBox = document.getElementById("datetime");

function showDateTime() {
    const now = new Date();

    const date = now.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    });

    const time = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit"
    });

    datetimeBox.textContent = date + ", " + time;
}

showDateTime();
setInterval(showDateTime, 1000);
