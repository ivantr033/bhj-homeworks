const counter = document.getElementById('clicker__counter');
const cookie = document.getElementById('cookie');
const speedCounter = document.getElementById('clicker__speed');

let totalClicks = 0;
let lastClickTime = Date.now();

cookie.onclick = () => {
    totalClicks++;
    counter.textContent = totalClicks;

    (cookie.width === 200) ? cookie.width = 180 : cookie.width = 200;
    
    const currentTime = Date.now();
    const timeDiff = (currentTime - lastClickTime) / 1000;

    if (timeDiff > 0) {
        const speed = 1 / timeDiff;
        speedCounter.textContent = speed.toFixed(2);
    }

    lastClickTime = currentTime;
};
