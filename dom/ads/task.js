const cards = document.querySelectorAll('.card');

cards.forEach((card) => {
    const rotatorCases = card.querySelectorAll('.rotator__case');

    let currentIndex = 0;

    const runRotator = () => {
        rotatorCases[currentIndex].classList.remove('rotator__case_active');
        
        currentIndex = (currentIndex + 1) % rotatorCases.length;
        const currentCase = rotatorCases[currentIndex];

        currentCase.classList.add('rotator__case_active');
        currentCase.style.color = currentCase.dataset.color;

        setTimeout(runRotator, currentCase.dataset.speed || 1000); 
    };

    setTimeout(runRotator, rotatorCases[0].dataset.speed || 1000);
});
