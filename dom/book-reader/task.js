const book = document.getElementById('book');

// 1. Font Size Control
const fontSizeControls = document.querySelectorAll('.font-size');
fontSizeControls.forEach(control => {
    control.addEventListener('click', (event) => {
        event.preventDefault();
        
        fontSizeControls.forEach(c => c.classList.remove('font-size_active'));
        control.classList.add('font-size_active');

        const size = control.dataset.size;
        book.classList.remove('book_fs-small', 'book_fs-big');
        if (size) {
            book.classList.add(`book_fs-${size}`);
        }
    });
});

// 2. Text Color Control
const textColorControls = document.querySelectorAll('.book__control_color .color');
textColorControls.forEach(control => {
    control.addEventListener('click', (event) => {
        event.preventDefault();
        
        textColorControls.forEach(c => c.classList.remove('color_active'));
        control.classList.add('color_active');

        const color = control.dataset.textColor;
        book.classList.remove('book_color-gray', 'book_color-whitesmoke', 'book_color-black');
        book.classList.add(`book_color-${color}`);
    });
});

// 3. Background Color Control
const bgColorControls = document.querySelectorAll('.book__control_background .color');
bgColorControls.forEach(control => {
    control.addEventListener('click', (event) => {
        event.preventDefault();
        
        bgColorControls.forEach(c => c.classList.remove('color_active'));
        control.classList.add('color_active');

        const bgColor = control.dataset.bgColor;
        book.classList.remove('book_bg-gray', 'book_bg-black', 'book_bg-white');
        book.classList.add(`book_bg-${bgColor}`);
    });
});