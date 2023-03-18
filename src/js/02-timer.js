import flatpickr from "flatpickr"
import "flatpickr/dist/flatpickr.min.css"
import Notiflix from 'notiflix'

const refs = {
  input: document.querySelector("#datetime-picker"),
  btnStart: document.querySelector("[data-start]"),
  seconds: document.querySelector("[data-seconds]"),
  minutes: document.querySelector("[data-minutes]"),
  hours: document.querySelector("[data-hours]"),
  days: document.querySelector("[data-days]"),
}

let differenceTime = 0;
let timerId = null;
let formatDate = null;


//запуск таймеру
refs.btnStart.addEventListener(`click`, () => {
  timerId = setInterval(startTimer, 1000);
})

// flatpicker options
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      currentDay(selectedDates[0]);
    },
    
  };

// flatpicker
flatpickr("#datetime-picker", options);

function currentDay(selectedDates) {
  const currentDays = Date.now();

  if(selectedDates < currentDays) {
    Notiflix.Notify.warning('Choose future date!');
    refs.btnStart.setAttribute(`disabled`, 'disabled');
    return
  }

  refs.btnStart.removeAttribute(`disabled`);
  
  differenceTime = selectedDates.getTime() - currentDays;
  formatDate = convertMs(differenceTime);
  getTimeInterface(formatDate);
}

refs.btnStart.setAttribute(`disabled`, 'disabled')

function startTimer() {
  refs.btnStart.setAttribute(`disabled`, 'disabled')
  refs.input.setAttribute(`disabled`, 'disabled')

  if(formatDate.seconds <= 0 && formatDate.minutes <= 0 && formatDate.hours && formatDate.days <= 0) {
    Notiflix.Notify.success('Time is over');
    clearInterval(timerId)
  } else {

    differenceTime -= 1000;
    formatDate = convertMs(differenceTime);
    getTimeInterface(differenceTime);
  }
}

// interface

function getTimeInterface() {
  refs.seconds.textContent = formatDate.seconds;
  refs.minutes.textContent = formatDate.minutes;
  refs.hours.textContent = formatDate.hours;
  refs.days.textContent = formatDate.days;
}


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
  return String(value).padStart(2, '0')
}