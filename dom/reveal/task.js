const reveals = document.querySelectorAll('.reveal');

const handleScroll = () => {
    reveals.forEach(reveal => {
        const { top, bottom } = reveal.getBoundingClientRect();
        const isVisible = (top < window.innerHeight) && (bottom > 0);

        if (isVisible) {
            reveal.classList.add('reveal_active');
        } else {
            // Optional
            reveal.classList.remove('reveal_active');
        }
    });
};

window.addEventListener('scroll', handleScroll);

handleScroll();