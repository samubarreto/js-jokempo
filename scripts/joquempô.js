let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

const winSFX = new Audio('src/loseDrawSFX.mp3');
const loseDrawSFX = new Audio('src/loseDrawSFX.mp3');

updateScoreElement();

function updateResultElement(result) {
  document.querySelector('.js-result')
  .innerHTML = result;
}

function updateMovesElement(playerMove, botMove) {
  document.querySelector('.js-moves')
  .innerHTML = `Você <img src="src/${playerMove}.png" class="buttonImg"> X <img src="src/${botMove}.png" class="buttonImg"> Bot`;
}

function updateScoreElement() {
  document.querySelector('.js-score')
  .innerHTML = `Vitórias: ${score.wins} · Derrotas: ${score.losses} · Empates: ${score.ties}`;
};

let isAutoPlaying = false;
let intervalId;

// const autoPlay = () => {
//   if (!isAutoPlaying) {
//     document.querySelector('.js-autoplay-button').innerHTML = '🤖 Stop Play';
//     intervalId = setInterval(() => {
//       const playerMove = shuffleBotMove();
//       botMove = shuffleBotMove();
//       playGame(playerMove);
//     }, 1000)
//     isAutoPlaying = true;
//   } else {
//     document.querySelector('.js-autoplay-button').innerHTML = '🤖 Auto Play';
//     clearInterval(intervalId);
//     isAutoPlaying = false
//   }
// }

function autoPlay() {
  if (!isAutoPlaying) {
    document.querySelector('.js-autoplay-button').innerHTML = '🤖 Stop Play';
    intervalId = setInterval(() => {
      const playerMove = shuffleBotMove();
      botMove = shuffleBotMove();
      playGame(playerMove);
    }, 1000)
    isAutoPlaying = true;
  } else {
    document.querySelector('.js-autoplay-button').innerHTML = '🤖 Auto Play';
    clearInterval(intervalId);
    isAutoPlaying = false
  }
}

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    botMove = shuffleBotMove();
    playGame('PEDRA');
  })

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    botMove = shuffleBotMove();
    playGame('PAPEL');
  })

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    botMove = shuffleBotMove();
    playGame('TESOURA');
  })

document.querySelector('.js-reset-button')
  .addEventListener('click', () => {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;

    localStorage.removeItem('score');
    updateScoreElement();
  })

document.querySelector('.js-autoplay-button')
  .addEventListener('click', () => {
    autoPlay();
  })

document.body
  .addEventListener('keydown', (event) => {
    if (event.key === '1') {
      botMove = shuffleBotMove();
      playGame('PEDRA');
    } else if (event.key === '2') {
      botMove = shuffleBotMove();
      playGame('PAPEL');
    } else if (event.key === '3') {
      botMove = shuffleBotMove();
      playGame('TESOURA');
    }
  })

function playGame(playerMove) {

  let result = ''

  if (playerMove === 'TESOURA') {
    if (botMove === 'PEDRA') {
      result = 'Você perdeu.'
    } else if (botMove === 'PAPEL') {
      result = 'Você venceu.'
    } else if (botMove === 'TESOURA') {
      result = 'Empatou.'
    }
  } else if (playerMove === 'PEDRA') {
    if (botMove === 'PEDRA') {
      result = 'Empatou.'
    } else if (botMove === 'PAPEL') {
      result = 'Você perdeu.'
    } else if (botMove === 'TESOURA') {
      result = 'Você venceu.'
    }
  } else if (playerMove === 'PAPEL') {
    if (botMove === 'PEDRA') {
      result = 'Você venceu.'
    } else if (botMove === 'PAPEL') {
      result = 'Empatou.'
    } else if (botMove === 'TESOURA') {
      result = 'Você perdeu.'
    }
  }

  if (result === 'Você venceu.') {
    score.wins++;
    playSound('src/winSFX.mp3');
  } else if (result === 'Você perdeu.') {
    score.losses++;
    playSound('src/loseDrawSFX.mp3');
  } else if (result === 'Empatou.') {
    score.ties++;
    playSound('src/loseDrawSFX.mp3');
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();
  updateResultElement(result);
  updateMovesElement(playerMove, botMove);

}

function shuffleBotMove() {
  const rng = Math.random();
  let botMove = ''

  if (rng >= 0 && rng < 1/3) {
    botMove = 'PEDRA';
  } else if (rng >= 1/3 && rng <= 2/3) {
    botMove = 'PAPEL';
  } else {
    botMove = 'TESOURA';
  }
  return botMove;
}

function playSound(soundName) {
  let sound = new Audio(soundName);
  sound.play();
}
