const modal = document.getElementById('subscribe-modal');
const closeBtn = document.querySelector('.modal__close');

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

window.addEventListener('DOMContentLoaded', () => {
    const isClosed = getCookie('modal_closed');

    if (!isClosed) {
        modal.classList.add('modal_active');
    }
});

closeBtn.addEventListener('click', () => {
    modal.classList.remove('modal_active');
    document.cookie = "modal_closed=true; max-age=31536000; path=/";
});
