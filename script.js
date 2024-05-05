function getWeatherForecast() {
    const apiKey = 'APIKEY';
    const locationInput = document.getElementById('locationInput').value;
    const apiUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${locationInput}&key=${apiKey}&days=5`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = document.getElementById('weatherInfo');
            if (data.data && data.data.length > 0) {
                weatherInfo.innerHTML = '<h2>5-Day Weather Forecast</h2>';
                data.data.forEach(day => {
                    const date = new Date(day.valid_date).toLocaleDateString();
                    const temperature = day.temp;
                    const description = day.weather.description;
                    const iconCode = day.weather.icon;
                    const iconUrl = `https://www.weatherbit.io/static/img/icons/${iconCode}.png`;
                    weatherInfo.innerHTML += `<div class="forecast-day">
                                                <p>${date}</p>
                                                <img src="${iconUrl}" alt="Weather Icon">
                                                <p>${description}</p>
                                                <p>Temperature: ${temperature}°C</p>
                                              </div>`;
                });
            } else {
                weatherInfo.innerHTML = `<p>Error: Unable to fetch weather forecast for ${locationInput}</p>`;
            }
        })
        .catch(error => {
            const weatherInfo = document.getElementById('weatherInfo');
            weatherInfo.innerHTML = `<p>Error: ${error.message}</p>`;
        });
}