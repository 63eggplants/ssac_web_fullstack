const form = document.querySelector('.form');
const input = document.querySelector('.input');
const result = document.querySelector('.result');
const popUp = document.querySelector('.pop-up');
const popUpMessage = document.querySelector('.pop-up__message');
const replayBtn = document.querySelector('.pop-up__replay-btn');

const DIGITS = 3;
const COUNTS = 9;
const INVISIBLE = 'invisible';
const DISABLED = 'disabled';

const answer = [];

const gameCounter = (function () {
  let num = 0;
  return {
    increase() {
      return ++num;
    },
    initialize() {
      num = 0;
    },
  };
})();

// 정답 만들기
const makeAnswer = function () {
  const makeRandomNumber = function () {
    return String(Math.floor(Math.random() * 10));
  };

  for (let i = 0; i < DIGITS; i++) {
    let digit;

    do {
      digit = makeRandomNumber();
    } while (answer.includes(digit));

    answer[i] = digit;
  }

  console.log(answer);
  return answer;
};

const initializeGame = function () {
  makeAnswer();
  gameCounter.initialize();
  popUp.classList.add(INVISIBLE);
  result.innerText = '';
  input.removeAttribute(DISABLED);
  input.focus();
};

const hasThreeDigit = function (userNum) {
  if (userNum.length !== DIGITS) {
    return false;
  }
  return true;
};

const hasDifferentDigit = function (userNum) {
  for (let i = 0; i < DIGITS; i++) {
    if (userNum.indexOf(userNum[i]) !== i) {
      return false;
    }
  }

  return true;
};

const countStrike = function (userNum) {
  let n = 0;
  for (let i = 0; i < DIGITS; i++) {
    if (answer[i] === userNum[i]) {
      n += 1;
    }
  }
  return n;
};

const countBall = function (userNum) {
  let n = 0;
  for (let i = 0; i < DIGITS; i++) {
    if (answer[i] !== userNum[i] && answer.includes(userNum[i])) {
      n += 1;
    }
  }
  return n;
};

const addResult = function (obj) {
  const p = document.createElement('p');
  p.innerText = `#${obj.gameCnt}-${obj.userNum}: ${obj.strikeCnt}S${obj.ballCnt}B`;
  result.prepend(p);
};

const showPopUp = function (message) {
  popUp.classList.remove(INVISIBLE);
  popUpMessage.innerText = message;
  input.setAttribute('disabled', '');
};

form.addEventListener('submit', e => {
  e.preventDefault();
  const userNum = [...input.value];
  input.value = '';

  if (!hasThreeDigit(userNum)) {
    return alert(`please input ${DIGITS}-digit number`);
  }

  if (!hasDifferentDigit(userNum)) {
    return alert('all digits have to be different');
  }

  const gameCnt = gameCounter.increase();
  const strikeCnt = countStrike(userNum);
  const ballCnt = countBall(userNum);

  const reulstObj = { gameCnt, userNum, strikeCnt, ballCnt };
  addResult(reulstObj);

  if (strikeCnt === DIGITS) {
    return showPopUp('YOU WIN');
  }

  if (gameCnt === COUNTS) {
    showPopUp('YOU LOSE');
  }
});

replayBtn.addEventListener('click', initializeGame);

initializeGame();
