const timer = document.getElementById('timer');

let totalSeconds = parseInt(timer.textContent);

const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
};

timer.textContent = formatTime(totalSeconds);

const countdown = setInterval(() => {
    totalSeconds--;

    if (totalSeconds < 0) {
        clearInterval(countdown);
        alert("Вы победили в конкурсе!");

        // --- OPTIONAL - Download File ---
        // window.location.assign("https://ftp.zhirov.kz/books/IT/JavaScript/%D0%A1%D0%BE%D0%B2%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%BD%D1%8B%D0%B9%20JavaScript%20%D0%B4%D0%BB%D1%8F%20%D0%BD%D0%B5%D1%82%D0%B5%D1%80%D0%BF%D0%B5%D0%BB%D0%B8%D0%B2%D1%8B%D1%85%20%28%D0%9A%D1%8D%D0%B9%20%D0%A1.%20%D0%A5%D0%BE%D1%80%D1%81%D1%82%D0%BC%D0%B0%D0%BD%29.pdf");

        return;
    }

    timer.textContent = formatTime(totalSeconds);
}, 1000);