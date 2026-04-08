const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const dropdownValue = dropdown.querySelector('.dropdown__value');
    const dropdownList = dropdown.querySelector('.dropdown__list');
    const dropdownItems = dropdown.querySelectorAll('.dropdown__item')

    dropdownValue.onclick = () => {
        dropdownList.classList.toggle('dropdown__list_active');
    };

    dropdownItems.forEach(item => {
        const link = item.querySelector('.dropdown__link');
        link.onclick = (event) => {
            event.preventDefault();
            dropdownValue.textContent = link.textContent.trim();
            dropdownList.classList.remove('dropdown__list_active');
        };
    });
});
