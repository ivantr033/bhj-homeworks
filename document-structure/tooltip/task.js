const tooltips = Array.from(document.querySelectorAll('.has-tooltip'));

tooltips.forEach(element => {
    element.addEventListener('click', (event) => {
        event.preventDefault();

        const activeTooltip = document.querySelector('.tooltip_active');

        if (activeTooltip && activeTooltip.textContent === element.title) {
            activeTooltip.remove();
            return;
        }

        if (activeTooltip) activeTooltip.remove();

        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip tooltip_active';
        tooltip.innerText = element.title;

        document.body.appendChild(tooltip);

        // Positioning the tooltip
        const { left, top, height } = element.getBoundingClientRect();
    
        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top + height}px`;
    });
});

// Optional
document.addEventListener('scroll', () => {
    const activeTooltip = document.querySelector('.tooltip_active');
    if (activeTooltip) activeTooltip.remove();
});