document.getElementById('fetchWeatherBtn').addEventListener('click', fetchWeather);

function fetchWeather() {
    const location = document.getElementById('locationInput').value;
    if (location) {
        getWeatherData(location);
    } else {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                getWeatherData(null, latitude, longitude);
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    }
}

function getWeatherData(location, lat, lon) {
    const apiKey = 'YOUR_API_KEY'; // Replace with your WeatherAPI key
    let apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}`;

    if (location) {
        apiUrl += `&q=${location}`;
    } else if (lat && lon) {
        apiUrl += `&q=${lat},${lon}`;
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => console.error('Error fetching the weather data:', error));
}

function displayWeatherData(data) {
    if (data.error) {
        alert(data.error.message);
        return;
    }

    document.getElementById('locationName').textContent = data.location.name;
    document.getElementById('weatherDescription').textContent = data.current.condition.text;
    document.getElementById('temperature').textContent = `Temperature: ${data.current.temp_c}°C`;
    document.getElementById('humidity').textContent = `Humidity: ${data.current.humidity}%`;

    document.querySelector('.weather-info').style.display = 'block';
}
