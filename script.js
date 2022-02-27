'use strict';

const score0EL = document.getElementById('score--0');
const score1EL = document.getElementById('score--1');
const newBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const winningStatement = document.querySelector('.winning-statement');

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  winningStatement.classList.add('hidden');
  document.querySelector('.player').classList.remove('player--winner');
  player0El.classList.add('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

rollBtn.addEventListener('click', function () {
  if (playing) {
    const diceValue = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice-${diceValue}.png`;
    diceEl.classList.remove('hidden');

    if (diceValue !== 1) {
      currentScore += diceValue;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdBtn.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 25) {
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      winningStatement.classList.remove('hidden');
      winningStatement.textContent = `🥇 Player ${
        activePlayer + 1
      } won the game 🥇`;
    } else {
      switchPlayer();
    }
  }
});

newBtn.addEventListener('click', init);
