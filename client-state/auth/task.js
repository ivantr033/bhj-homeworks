const signin = document.getElementById('signin');
const signinForm = document.getElementById('signin__form');
const welcome = document.getElementById('welcome');
const userIdSpan = document.getElementById('user_id');

const showWelcome = (id) => {
    signin.classList.remove('signin_active');
    welcome.classList.add('welcome_active');
    userIdSpan.textContent = id;
};

const savedUserId = localStorage.getItem('user_id');
if (savedUserId) {
    showWelcome(savedUserId);
}

// Send form
signinForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(signinForm);

    fetch('https://students.netoservices.ru/nestjs-backend/auth', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                localStorage.setItem('user_id', data.user_id);
                showWelcome(data.user_id);
                signinForm.reset();
            } else {
                alert('Неверный логин/пароль');
                signinForm.reset();
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

const logoutBtn = document.createElement('button');
logoutBtn.textContent = 'Выйти';
logoutBtn.className = 'btn';
logoutBtn.style.marginTop = '20px';
welcome.appendChild(logoutBtn);

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('user_id');
    welcome.classList.remove('welcome_active');
    signin.classList.add('signin_active');
});