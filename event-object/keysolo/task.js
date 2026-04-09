class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');
    this.timerElement = container.querySelector('.status__timer');

    this.timerId = null;
    this.reset();
    this.registerEvents();
  }

  reset() {
    clearInterval(this.timerId);
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }

  registerEvents() {
    document.addEventListener('keydown', (event) => {
      if (!this.currentSymbol) return;

      const charExpected = this.currentSymbol.textContent.toLowerCase();
      const charPressed = event.key.toLowerCase();

      if (charPressed === charExpected) {
        this.success();
      } else {
        // (This prevents the user from losing if he presses Shift, Alt, etc.)
        if (event.key.length === 1) {
          this.fail();
        }
      }
    });
  }

  startTimer(seconds) {
    clearInterval(this.timerId);
    this.timerId = null;
    
    this.timerElement.textContent = seconds;

    this.timerId = setInterval(() => {
      let currentTime = parseInt(this.timerElement.textContent);
      currentTime -= 1;
      this.timerElement.textContent = currentTime;

      if (currentTime <= 0) {
        clearInterval(this.timerId);
        this.fail();
      }
    }, 1000);
  }

  success() {
    if(this.currentSymbol.classList.contains("symbol_current")) this.currentSymbol.classList.remove("symbol_current");
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;

    if (this.currentSymbol !== null) {
      this.currentSymbol.classList.add('symbol_current');
      return;
    }

    clearInterval(this.timerId); 

    if (++this.winsElement.textContent === 10) {
      alert('Победа!');
      this.reset();
    }
    this.setNewWord();
  }

  fail() {
    this.wordElement.classList.add('word_incorrect');

    clearInterval(this.timerId); 

    if (++this.lossElement.textContent === 5) {
      alert('Вы проиграли!');
      this.reset();
    }

    setTimeout(() => {
        this.setNewWord();
      }, 1000);
  }

  setNewWord() {
    this.wordElement.classList.remove('word_incorrect');

    const word = this.getWord();

    this.renderWord(word);

    this.startTimer(word.length);
  }

  getWord() {
    const words = [
        'bob',
        'awesome',
        'netology',
        'hello',
        'kitty',
        'rock',
        'youtube',
        'popcorn',
        'cinema',
        'love',
        'javascript'
      ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current': ''}">${s}</span>`
      )
      .join('');
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }
}

new Game(document.getElementById('game'))

