const startBrn = document.querySelector('[data-start]');
console.log(startBrn);
const stopBtn = document.querySelector('[data-stop');
console.log(stopBtn);
const body = document.querySelector(`body`);
console.dir(body);

let colorChanger = null;

// body.style.backgroundColor = getRandomHexColor();

// startBrn.classList.toggle(`is-active`);

startBrn.addEventListener('click', backgoundColorChangeStartBtnHandler);
// startBrn.addEventListener('click', () => {
//     startBrn.classList.add(`is-active`);
// })

stopBtn.addEventListener('click', backgoundColorChangeStopBtnHandler);

function backgoundColorChangeStartBtnHandler() {
    startBrn.classList.toggle(`is-active`);
    colorChanger = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000)
    
}

function backgoundColorChangeStopBtnHandler() {
    clearInterval(colorChanger);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}