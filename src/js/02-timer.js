import flatpickr from "flatpickr"
import "flatpickr/dist/flatpickr.min.css"

// refs
const refs = {
  input: document.querySelector(`#datetime-picker`),
  btnStart: document.querySelector(`button[data-start]`),
  valueSeconds: document.querySelector(`span[data-seconds]`),
  valueMinutes: document.querySelector(`span[data-minutes]`),
  valueHours: document.querySelector(`span[data-hours]`),
  valueDays: document.querySelector(`span[data-days]`)
}

// initial values
let differenceTime = 0
let timerId = null
let formatDate = null

// event
refs.btnStart.addEventListener(`click`, () => {
  timerId = setInterval(startTimer, 1000)
})

// flatpicker options
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      currentDay(selectedDates[0])
    },
    
  };

// flatpicker
flatpickr("#datetime-picker", options);

// currentDay function
function currentDay(selectedDates) {
  const currentDays = Date.now()

  if(selectedDates < currentDays) {
    Notiflix.Notify.warning('Please choose a date in the future')
    refs.btnStart.setAttribute(`disabled`, '')
    return
  }

  refs.btnStart.removeAttribute(`disabled`)
  
  differenceTime = selectedDates.getTime() - currentDays
  formatDate = convertMs(differenceTime)
  getTimeInterface(formatDate)
}

// disable btn
refs.btnStart.setAttribute(`disabled`, '')

// function when btn is clicked
function startTimer() {
  refs.btnStart.setAttribute(`disabled`, '')
  refs.input.setAttribute(`disabled`, '')

  const IfTimeEnd = formatDate.seconds <= 0 && formatDate.minutes <= 0 && formatDate.hours && formatDate.days <= 0

  if(IfTimeEnd) {
    Notiflix.Notify.success('Time end')
    clearInterval(timerId)
  } else {

   differenceTime -= 1000
    formatDate = convertMs(differenceTime)
    getTimeInterface(differenceTime)
  }
}

// interface

function getTimeInterface() {
  refs.valueSeconds.textContent = formatDate.seconds
  refs.valueMinutes.textContent = formatDate.minutes
  refs.valueHours.textContent = formatDate.hours
  refs.valueDays.textContent = formatDate.days
}


// timer formula

function convertMs(ms) {
  // Number of milliseconds per unit of time
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

//padStart

function addLeadingZero(value) {
  return String(value).padStart(2, '0')
}