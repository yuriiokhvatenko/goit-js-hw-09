const startBtn = document.querySelector(`[data-start]`);
const stopBtn = document.querySelector(`[data-stop`);
const body = document.querySelector(`body`);

let colorChanger = null;

startBtn.addEventListener('click', backgoundColorChangeStartBtnHandler);
stopBtn.addEventListener('click', backgoundColorChangeStopBtnHandler);

// Функція зміни кольору за інтервалом
function backgoundColorChangeStartBtnHandler() {
    colorChanger = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000)
    startBtn.setAttribute(`disabled`, `disabled`);
}
// Функція зупинки зміни кольору
function backgoundColorChangeStopBtnHandler() {
    clearInterval(colorChanger);
    startBtn.removeAttribute('disabled');
}
// рандомайзер кольору
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}