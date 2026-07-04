function showTime() {
    const now = new Date();
    const time = now.toLocaleTimeString();
    document.getElementById('timebox').textContent = time;
}

/* function showTime() {
    const timebox = document.getElementById("timebox");
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    timebox.textContent = `${hours}:${minutes}:${seconds}`;
} */

setInterval(showTime, 1000);
showTime();