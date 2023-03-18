import Notiflix from "notiflix";

const refs = {
  form: document.querySelector(`form`),
  firstDealy: document.querySelector(`[name="delay"]`),
  delayStep: document.querySelector(`[name="step"]`),
  amount: document.querySelector(`[name="amount"]`),
  btn : document.querySelector(`button`)
}


refs.form.addEventListener(`submit`, formSubmit)

function formSubmit(evt) {
  evt.preventDefault()

  let delay = Number(refs.firstDealy.value)

  for(let i = 1; i <= refs.amount.value; i += 1) {
    createPromise(i , delay)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`Fulfilled promise ${i} in ${delay}ms`)
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`Rejected promise ${i} in ${delay}ms`)
    });
  
    delay += Number(refs.delayStep.value)
  }
}


function createPromise(position, delay) {
  const objectInfo = {position,delay}
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    
    setTimeout(() => {
      if (shouldResolve) {
        resolve(objectInfo)
      } else {
        reject(objectInfo)
      }
    }, delay)

  })
  
}