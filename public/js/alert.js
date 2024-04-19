// Alert
const showAlert = document.querySelector("[show-alert]");
const dataTime = showAlert.getAttribute("data-time");
console.log(dataTime);
setTimeout(() => {
    showAlert.classList.add("alert-hidden");
}, dataTime);

// End Alert


// Button Close Alert

const buttonCloseAlert = document.querySelector("[close-alert]");
// console.log(buttonCloseAlert);
buttonCloseAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
})
// Ennd Button Close Alert