const form = document.querySelector('.form');
const input = document.querySelector('.input');
const result = document.querySelector('.result');
const popUp = document.querySelector('.pop-up');
const popUpMessage = document.querySelector('.pop-up__message');
const replayBtn = document.querySelector('.pop-up__replay-btn');

const DIGITS = 3;
const COUNTS = 9;
const INVISIBLE = 'invisible';

let answer;
let cnt;

// 정답 만들기
function makeAnswer() {
  function makeRandomNumber() {
    return String(Math.floor(Math.random() * 10));
  }

  let answer = makeRandomNumber();

  for (let i = 1; i < DIGITS; i += 1) {
    let digit = makeRandomNumber();

    while (answer.includes(digit)) {
      digit = makeRandomNumber();
    }
    answer += digit;
  }

  console.log(answer);

  return answer;
}

// 초기화 함수
function init() {
  answer = makeAnswer();
  cnt = 0;
  popUp.classList.add(INVISIBLE);
  result.innerText = '';
  input.removeAttribute('disabled');
  input.focus();
}

// 전체 자릿수 판별
function checkDigits(userNum) {
  if (userNum.length !== DIGITS) {
    alert('please input 3-digit number');
    return 0;
  }
  return 1;
}

// 중복 자릿수 판별
function checkSameDigit(userNum) {
  for (let i = 0; i < DIGITS; i += 1) {
    if (userNum.indexOf(userNum[i]) !== i) {
      alert('all digits have to be different');
      return 0;
    }
  }
  return 1;
}

// strike 갯수 계산
function countStrike(userNum) {
  let n = 0;
  for (let i = 0; i < DIGITS; i++) {
    if (answer[i] === userNum[i]) {
      n += 1;
    }
  }
  return n;
}

// ball 갯수 계산
function countBall(userNum) {
  let n = 0;
  for (let i = 0; i < DIGITS; i++) {
    if (answer[i] !== userNum[i] && answer.includes(userNum[i])) {
      n += 1;
    }
  }
  return n;
}

// 결과 추가
function addResult(cnt, userNum, strikeCnt, ballCnt) {
  const p = document.createElement('p');
  p.innerText = `#${cnt}-${userNum}: ${strikeCnt}S${ballCnt}B`;
  result.prepend(p);
}

// 게임 승패 출력
function showPopUp(message) {
  popUp.classList.remove(INVISIBLE);
  popUpMessage.innerText = message;
  input.setAttribute('disabled', '');
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const userNum = String(input.value);
  input.value = '';

  // 3자리가 아닌 경우
  if (!checkDigits(userNum)) return;

  // 중복된 자릿수가 있는 경우
  if (!checkSameDigit(userNum)) return;

  // strike, ball 계산 후 할당
  cnt += 1;
  const strikeCnt = countStrike(userNum);
  const ballCnt = countBall(userNum);

  // 결과 추가
  addResult(cnt, userNum, strikeCnt, ballCnt);

  // 승
  if (strikeCnt === DIGITS) {
    showPopUp('YOU WON');
    return;
  }

  // 패
  if (cnt === COUNTS) {
    showPopUp('YOU LOSE');
  }
});

init();
replayBtn.addEventListener('click', init);
