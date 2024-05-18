// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('.form');

input.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const delayValue = input.elements.delay.value;
  const stateValue = input.elements.state.value;

  const prom = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (stateValue === 'fulfilled') {
        resolve(stateValue);
      } else {
        reject(stateValue);
      }
    }, delayValue);
    
  });

  prom.then(() => {
    iziToast
      .success({
        title: 'OK',
        message: `Fulfilled promise in ${delayValue}ms`,
        position: 'topRight'
      });
      input.reset();
  })
  .catch(() => {
    iziToast.error({
      title: 'Error',
      message: `Rejected promise in ${delayValue}ms`,
      position: 'topRight'
    });
    input.reset();
  });

  
}
