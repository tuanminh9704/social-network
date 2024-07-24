const getLocation = () => {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}

const showPosition = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log(lat);
    console.log(lon);
}


const buttonGetWheather = document.querySelector(".view-wheather");
console.log(buttonGetWheather);
buttonGetWheather.addEventListener("click", () => {
    getLocation();
})