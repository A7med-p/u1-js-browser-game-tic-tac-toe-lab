/*-------------------------------- Constants --------------------------------*/
const winningCombos = 
[
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
];
/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;
/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector('#message');
const resetBtnEl = document.querySelector('#reset');
/*-------------------------------- Functions --------------------------------*/
const placePiece = (idx) => {
  board[idx] = turn;
};

const checkForWinner = () => {
  if (
    (board[0] !== '' && board[0] === board[1] && board[0] === board[2]) ||
    (board[0] !== '' && board[0] === board[3] && board[0] === board[6]) ||
    (board[0] !== '' && board[0] === board[4] && board[0] === board[8]) ||
    (board[1] !== '' && board[1] === board[4] && board[1] === board[7]) ||
    (board[2] !== '' && board[2] === board[5] && board[2] === board[8]) ||
    (board[2] !== '' && board[2] === board[4] && board[2] === board[6]) ||
    (board[3] !== '' && board[3] === board[4] && board[3] === board[5]) ||
    (board[6] !== '' && board[6] === board[7] && board[6] === board[8]) 
  ) {
    winner = true;
  }
};

const checkForTie = () => {
  if (winner) {
    return;
  }

  if (!board.includes('')) {
    tie = true;
  }
};

const switchPlayerTurn = () => {
  if (winner) {
    return;
  }
  if (turn === 'X') {
    turn = 'O';
  } else {
    turn = 'X';
  }
};

const render = () => {
  updateBoard();
  updateMessage();
};

const updateBoard = () => {
  board.forEach((cell, idx) => {
    if (cell === 'X') {
      squareEls[idx].textContent = 'X';
    } else if (cell === 'O') {
      squareEls[idx].textContent = 'O';
    } else {
      squareEls[idx].textContent = '';
    }
  });
};

const updateMessage = () => {
  if (!winner && !tie) {
    if (turn === 'X') {
      messageEl.textContent = "It's X turn";
    } else {
      messageEl.textContent = "It's O turn";
    }
  } else if (!winner && tie) {
    messageEl.textContent = 'its a tie';
  } else {
    if (turn === 'X') {
      messageEl.textContent = 'X wins';
    } else {
      messageEl.textContent = 'O wins';
    }
  }
};

const handleClick = (evt) => {
  const sqIdx = evt.target.id;
  const squareIsFull = board[sqIdx] !== '';
  if (squareIsFull || winner) {
    return;
  }

  placePiece(sqIdx);
  checkForWinner();
  checkForTie();
  switchPlayerTurn();
  render();
};

const init = () => {
  board =
   [
    '', '', '',
    '', '', '',
    '', '', ''
   ];
  turn = 'X';
  winner = false;
  tie = false;
  render();
};

init();
/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach((square) => {
  square.addEventListener('click', handleClick);
});
resetBtnEl.addEventListener('click', init);