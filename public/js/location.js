
const getWeather = (latitude, longitude) => {
    const apiKey = "9c0f3d00cc94358745434a9284f08da1";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log('Weather data:', data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
};

const getLocation = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        } else {
            reject(new Error('Geolocation is not supported by this browser.'));
        }
    });
};

getLocation().then((position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(position.coords.latitude);
    // return coordinates;
    getWeather(latitude, longitude);
})



