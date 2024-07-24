
const getLocation = () => {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}

const showPosition = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // console.log(lat, lon);

    fetch(`/weather/check?lat=${lat}&lon=${lon}`)
        .then(response => response.json())
        .then(data => {
            if(data.code == 200){
                // console.log(data.dataWeather);
                const weatherInfo = document.querySelector(".weather-info");
                // console.log(weatherInfo);
                const html = `
                    <div class="card mt-4">
                        <div class="card-body">
                            <h5 class="card-title">${data.dataWeather.name}</h5>
                            <p class="card-text"><strong>Nhiệt độ:</strong> ${data.dataWeather.main.temp} °C</p>
                            <p class="card-text"><strong>Thời tiết:</strong> ${data.dataWeather.weather[0].description}</p>
                            <p class="card-text"><strong>Độ ẩm:</strong> ${data.dataWeather.main.humidity}%</p>
                            <p class="card-text"><strong>Tốc độ gió:</strong> ${data.dataWeather.wind.speed} m/s</p>
                        </div>
                    </div>
                `;
                weatherInfo.innerHTML = html;
            }
        })

}


const buttonGetWheather = document.querySelector(".view-wheather");
// console.log(buttonGetWheather);
buttonGetWheather.addEventListener("click", () => {
    getLocation();
    // console.log(getLocation());
})