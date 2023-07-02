const stopWatch = document.getElementById('stopwatch');
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const reset = document.getElementById('reset');
let timeLag = 0;
let intervalId = null;


window.addEventListener('load', () => {
    stop.disabled = true;
    reset.disabled = true;
})

const updateTime = () => {
    const miliSecond = timeLag % 1000;
    const second = Math.floor(timeLag / 1000) % 60;
    const minute = Math.floor(timeLag / (1000 * 60)) % 60;
    const hour = Math.floor(timeLag / (1000 * 60 * 60));

    const miliSecondValue = miliSecond.toString().padStart(1, '0');
    const secondValue = second.toString().padStart(1, '0');
    const minuteValue = minute.toString().padStart(1, '0');
    const hourValue = hour.toString().padStart(1, '0');

    stopWatch.innerHTML = `${hourValue}:${minuteValue}:${secondValue}:${miliSecondValue}`;
}

start.addEventListener('click', function (e) {
    start.disabled = true;
    stop.disabled = false;
    reset.disabled = false;
    if (intervalId !== null) { return; }
    let pre = new Date();
    intervalId = setInterval(function () {
        const now = new Date();
        timeLag += now - pre;
        pre = now;
        updateTime();
    }, 10);
})

stop.addEventListener('click', function (e) {
    start.disabled = false;
    stop.disabled = true;
    clearInterval(intervalId);
    intervalId = null;
})

reset.addEventListener('click', function (e) {
    start.disabled = false;
    stop.disabled = true;
    reset.disabled = true;
    timeLag = 0;
    updateTime();
    clearInterval(intervalId);
    intervalId = null;
})