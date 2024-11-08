window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

document.getElementById('weather-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const place = document.getElementById('place-input').value;
    fetchWeather(place);
});

function fetchWeather(place) {
    const apiKey = '862ecd6e92e26beb9bd5e1140edfd70b'; 
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${apiKey}&units=metric`;

    
    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const weatherInfo = `
                    <h2>Weather in ${data.name}</h2>
                    <p>Temperature: ${data.main.temp}°C</p>
                    <p>Weather: ${data.weather[0].description}</p>
                `;
                document.getElementById('weather-info').innerHTML = weatherInfo;
            } else {
                document.getElementById('weather-info').innerHTML = `<p>Error: ${data.message}</p>`;
            }
        })
        .catch(error => {
            document.getElementById('weather-info').innerHTML = `<p>Error: ${error.message}</p>`;
        });

    
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "200") {
                const forecastDays = data.list.filter((item, index) => index % 8 === 0).slice(0, 5);
                const forecastHtml = forecastDays.map(day => `
                    <div class="forecast-day">
                        <h3>${new Date(day.dt_txt).toLocaleDateString()}</h3>
                        <p>Temperature: ${day.main.temp}°C</p>
                        <p>Weather: ${day.weather[0].description}</p>
                    </div>
                `).join('');
                document.getElementById('forecast').innerHTML = forecastHtml;
            } else {
                document.getElementById('forecast').innerHTML = `<p>Error: ${data.message}</p>`;
            }
        })
        .catch(error => {
            document.getElementById('forecast').innerHTML = `<p>Error: ${error.message}</p>`;
        });
}
