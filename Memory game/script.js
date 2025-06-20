const board = document.getElementById('game-board');
const restartBtn = document.getElementById('restart');
const icons = ['🍎', '🍌', '🍇', '🍓', '🍍', '🥝', '🍉', '🍑'];

let cards = [], flipped = [], matched = 0;

function createBoard() {
  board.innerHTML = '';
  matched = 0;
  flipped = [];

  // Duplicate + shuffle
  cards = [...icons, ...icons].sort(() => Math.random() - 0.5);

  cards.forEach(icon => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.icon = icon;

    card.innerHTML = `
      <div class="inner-card">
        <div class="front">?</div>
        <div class="back">${icon}</div>
      </div>
    `;

    card.addEventListener('click', handleFlip);
    board.appendChild(card);
  });
}

function handleFlip() {
  if (
    flipped.length === 2 ||
    this.classList.contains('flipped') ||
    this === flipped[0]
  ) return;

  this.classList.add('flipped');
  flipped.push(this);

  if (flipped.length === 2) {
    const [first, second] = flipped;
    if (first.dataset.icon === second.dataset.icon) {
      matched++;
      flipped = [];
      if (matched === icons.length) {
        setTimeout(() => alert('🎉 You Won the Game!'), 400);
      }
    } else {
      setTimeout(() => {
        flipped.forEach(card => card.classList.remove('flipped'));
        flipped = [];
      }, 1000);
    }
  }
}

restartBtn.addEventListener('click', createBoard);
createBoard();
