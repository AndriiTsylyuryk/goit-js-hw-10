import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

let userSelectedDate = [];
console.log(userSelectedDate);

flatpickr("#datetime-picker", {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const startButton = document.querySelector("[data-start]");
        const selectedDate = selectedDates[0];

        if (selectedDate.getTime() < new Date().getTime()) {
            window.alert("Please choose a date in the future");
            startButton.disabled = true;
        } else {
            startButton.disabled = false;
        }
     userSelectedDate.push(selectedDate);
        
    }
    
});

startButton = document.querySelector("[data-start]");
startButton.addEventListener("click", startTimer);