import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = null;
console.log(userSelectedDate);

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const startButton = document.querySelector('[data-start]');
    const input = document.querySelector('#datetime-picker');

    const selectedDate = selectedDates[0];

    if (selectedDate.getTime() < new Date().getTime()) {
      //   window.alert('Please choose a date in the future');
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight'
      });

      startButton.disabled = true;
    } else {
      startButton.disabled = false;
      userSelectedDate = selectedDate;
    }
  },
});
const startButton = document.querySelector('[data-start]');
startButton.addEventListener('click', startTimer);

function startTimer() {
  const timerInterval = setInterval(timerUpd, 1000);
  const input = document.querySelector('#datetime-picker');
  input.disabled = true;

  startButton.disabled = true;

  function timerUpd() {
    const currentTime = new Date().getTime();
    const timeDiff = convertMs(userSelectedDate.getTime() - currentTime);
    console.log(timeDiff);

    if (timeDiff.total <= 0) {
      clearInterval(timerInterval);
      startButton.disabled = false;
      input.disabled = false;
      return;
    }

    function convertMs(ms) {
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      const days = Math.floor(ms / day);
      const hours = Math.floor((ms % day) / hour);
      const minutes = Math.floor(((ms % day) % hour) / minute);
      const seconds = Math.floor((((ms % day) % hour) % minute) / second);
      return { days, hours, minutes, seconds, total: ms };
    }

    const displayDay = document.querySelector('[data-days]');
    const displayHour = document.querySelector('[data-hours]');
    const displayMinutes = document.querySelector('[data-minutes]');
    const displaySeconds = document.querySelector('[data-seconds]');

    displayDay.textContent = addLeadingZero(timeDiff.days);
    displayHour.textContent = addLeadingZero(timeDiff.hours);
    displayMinutes.textContent = addLeadingZero(timeDiff.minutes);
    displaySeconds.textContent = addLeadingZero(timeDiff.seconds);

    function addLeadingZero(value) {
      return String(value).padStart(2, '0');
    }
  }
}
