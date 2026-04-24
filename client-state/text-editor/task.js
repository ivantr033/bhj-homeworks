const editor = document.getElementById('editor');
const clearBtn = document.getElementById('clear_btn');

window.addEventListener('DOMContentLoaded', () => {
    const savedText = localStorage.getItem('editor_content');
    if (savedText) {
        editor.value = savedText;
    }
});

editor.addEventListener('input', () => {
    localStorage.setItem('editor_content', editor.value);
});

clearBtn.addEventListener('click', () => {
    editor.value = '';
    localStorage.removeItem('editor_content');
});
