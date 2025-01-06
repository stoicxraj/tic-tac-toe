const cells = document.querySelectorAll('[data-cell]');
const resultScreen = document.getElementById('resultScreen');
const resultText = document.getElementById('resultText');
const newGameButton = document.getElementById('newGameButton');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let board = Array(9).fill(null);

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleClick(cell, index) {
  if (board[index] || resultScreen.style.display === 'flex') return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    showResult(`${currentPlayer} Wins!`);
  } else if (board.every(cell => cell !== null)) {
    showResult("It's a Draw!");
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWin(player) {
  return winningCombinations.some(combination =>
    combination.every(index => board[index] === player)
  );
}

function showResult(message) {
  resultText.textContent = message;
  resultScreen.style.display = 'flex';
}

function resetGame() {
  board.fill(null);
  currentPlayer = 'X';
  resultScreen.style.display = 'none';
  cells.forEach(cell => {
    cell.textContent = '';
  });
}

// Add event listeners to cells and buttons
function initializeGame() {
  cells.forEach((cell, index) => {
    cell.textContent = '';
    cell.removeEventListener('click', () => handleClick(cell, index));
    cell.addEventListener('click', () => handleClick(cell, index), { once: true });
  });
}

newGameButton.addEventListener('click', () => {
  resetGame();
  initializeGame();
});

restartButton.addEventListener('click', () => {
  resetGame();
  initializeGame();
});

// Initialize the game on page load
initializeGame();
