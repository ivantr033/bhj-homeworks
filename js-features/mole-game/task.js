(() => {
    const dead = document.getElementById('dead');
    const lost = document.getElementById('lost');

    const getHole = index => document.getElementById(`hole${index}`);

    const reset = (message) => {
        window.alert(message);
        dead.textContent = 0;
        lost.textContent = 0;
    };

    for (let i = 1; i <= 9; i++) {
        getHole(i).onclick = function() {
            if (this.classList.contains('hole_has-mole')) {
                dead.textContent = parseInt(dead.textContent) + 1;
                this.className = "hole"; // To avoid cheating while mole stays in the same hole ;)
            } else {
                lost.textContent = parseInt(lost.textContent) + 1;
            }

            if (parseInt(dead.textContent) === 10) {
                reset('Поздравляем! Вы выиграли! :)');
            } else if (parseInt(lost.textContent) === 5) {
                reset('Вы проиграли :(');
            }
        };
    }
})();