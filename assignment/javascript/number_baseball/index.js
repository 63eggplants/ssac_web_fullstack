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

let answer = '';
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

  let newAnswer = makeRandomNumber();

  for (let i = 1; i < DIGITS; i++) {
    let digit = makeRandomNumber();

    while (newAnswer.includes(digit)) {
      digit = makeRandomNumber();
    }
    newAnswer += digit;
  }

  console.log(newAnswer);

  return newAnswer;
};

// 초기화 함수
const initializeGame = function () {
  answer = makeAnswer();
  gameCounter.initialize();
  popUp.classList.add(INVISIBLE);
  result.innerText = '';
  input.removeAttribute(DISABLED);
  input.focus();
};

// 전체 자릿수 판별
const checkDigits = function (userNum) {
  if (userNum.length !== DIGITS) {
    alert('please input 3-digit number');
    return 0;
  }
  return 1;
};

// 중복 자릿수 판별
const checkSameDigit = function (userNum) {
  for (let i = 0; i < DIGITS; i++) {
    if (userNum.indexOf(userNum[i]) !== i) {
      alert('all digits have to be different');
      return 0;
    }
  }
  return 1;
};

// strike 갯수 계산
const countStrike = function (userNum) {
  let n = 0;
  for (let i = 0; i < DIGITS; i++) {
    if (answer[i] === userNum[i]) {
      n += 1;
    }
  }
  return n;
};

// ball 갯수 계산
const countBall = function (userNum) {
  let n = 0;
  for (let i = 0; i < DIGITS; i++) {
    if (answer[i] !== userNum[i] && answer.includes(userNum[i])) {
      n += 1;
    }
  }
  return n;
};

// 결과 추가
const addResult = function (obj) {
  const p = document.createElement('p');
  p.innerText = `#${obj.gameCnt}-${obj.userNum}: ${obj.strikeCnt}S${obj.ballCnt}B`;
  result.prepend(p);
};

// 게임 승패 출력
const showPopUp = function (message) {
  popUp.classList.remove(INVISIBLE);
  popUpMessage.innerText = message;
  input.setAttribute('disabled', '');
};

form.addEventListener('submit', e => {
  e.preventDefault();
  const userNum = String(input.value);
  input.value = '';

  // 3자리가 아닌 경우
  if (!checkDigits(userNum)) return;

  // 중복된 자릿수가 있는 경우
  if (!checkSameDigit(userNum)) return;

  // strike, ball 계산 후 할당
  const gameCnt = gameCounter.increase();
  const strikeCnt = countStrike(userNum);
  const ballCnt = countBall(userNum);

  // 결과 추가
  const reulstObj = { gameCnt, userNum, strikeCnt, ballCnt };
  addResult(reulstObj);

  // 승
  if (strikeCnt === DIGITS) {
    showPopUp('YOU WIN');
    return;
  }

  // 패
  if (gameCnt === COUNTS) {
    showPopUp('YOU LOSE');
  }
});

replayBtn.addEventListener('click', initializeGame);

initializeGame();
