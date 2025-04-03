const apiKey = '08c1335b20029e7a1c90164f663c5e9b';


function fetchWeather(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                document.getElementById('weather-info').innerHTML = `
                    <h2>${data.name}</h2>
                    <h3>${data.weather[0].description.toUpperCase()}</h3>
                    <h2>${data.main.temp}°C</h2>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Wind Speed: ${data.wind.speed} m/s</p>
                `;
            } else {
                document.getElementById('weather-info').innerHTML = `<p>${data.message}</p>`;
            }
        })
        .catch(error => console.error('Error fetching weather:', error));
}

function fetchWeatherByInput() {
    const location = document.getElementById('location-input').value;
    if (location) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
        fetchWeather(url);
    }
}

function fetchWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
            fetchWeather(url);
        }, error => {
            document.getElementById('weather-info').innerHTML = '<p>Unable to retrieve location.</p>';
        });
    } else {
        document.getElementById('weather-info').innerHTML = '<p>Geolocation is not supported by your browser.</p>';
    }
}