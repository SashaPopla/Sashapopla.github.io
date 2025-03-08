"use strict";

import { keyAPI } from './data.js';
import { translateWeather } from './data.js';

function getWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const apiKey = keyAPI;
            const urlCurrent = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${apiKey}`;
            const urlForecast = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${apiKey}&days=7`;

            fetch(urlCurrent)
                .then(response => response.json())
                .then(data => {
                    displayWeatherForecast(data);
                    const currentWeather = data.data[0];
                    const tempCurrent = currentWeather.temp;
                    const city = currentWeather.city_name;

                    fetch(urlForecast)
                        .then(response => response.json())
                        .then(data => {
                            const weatherContainer = document.getElementById('weather-container');
                            const weatherCity = document.getElementById('city');
                            weatherContainer.innerHTML = '';
                            weatherCity.innerHTML = '';

                            weatherCity.innerHTML += `<h2>Прогноз погоди для <span>${translateWeather(city)}</span></h2>`;

                            const today = data.data[0];
                            const tempMax = today.max_temp;
                            const tempMin = today.min_temp;
                            const description = today.weather.description;
                            const icon = today.weather.icon;

                            const weatherDay = document.createElement('div');
                            weatherDay.className = 'weather-day';

                            weatherDay.innerHTML = `
                                <h3>Сьогодні</h3>
                                <p>Поточна температура: ${tempCurrent}°C</p>
                                <p>Макс. температура: ${tempMax}°C</p>
                                <p>Мін. температура: ${tempMin}°C</p>
                                <p>Опис: ${translateWeather(description)}</p>
                                <img src="https://www.weatherbit.io/static/img/icons/${icon}.png" alt="${description}">
                            `;

                            weatherContainer.appendChild(weatherDay);

                            data.data.slice(1).forEach(day => {
                                const date = new Date(day.valid_date).toLocaleDateString('uk-UA', { weekday: 'long', day: 'numeric', month: 'short' });
                                const temp = day.temp;
                                const tempMax = day.max_temp;
                                const tempMin = day.min_temp;
                                const description = day.weather.description;
                                const icon = day.weather.icon;

                                const weatherDay = document.createElement('div');
                                weatherDay.className = 'weather-day';

                                weatherDay.innerHTML = `
                                    <h3>${date}</h3>
                                    <p>Температура: ${temp}°C</p>
                                    <p>Макс. температура: ${tempMax}°C</p>
                                    <p>Мін. температура: ${tempMin}°C</p>
                                    <p>Опис: ${translateWeather(description)}</p>
                                    <img src="https://www.weatherbit.io/static/img/icons/${icon}.png" alt="${description}">
                                    `;

                                weatherContainer.appendChild(weatherDay);

                                weatherDay.addEventListener('click', () => {
                                    fetchHourlyForecast(city, day.valid_date);
                                });
                            });
                        })
                        .catch(error => {
                            console.error('Error fetching the weather forecast data:', error);
                            document.getElementById('weather-container').innerHTML = `
                                <p>Не вдалося отримати прогноз погоди. Спробуйте ще раз.</p>
                            `;
                        });
                })
                .catch(error => {
                    console.error('Error fetching the current weather data:', error);
                    document.getElementById('weather-container').innerHTML = `
                        <p>Не вдалося отримати поточну погоду. Спробуйте ще раз.</p>
                    `;
                });
        }, error => {
            console.error('Error getting location:', error);
            document.getElementById('weather-container').innerHTML = `
                <p>Не вдалося визначити місцезнаходження. Перевірте налаштування браузера та спробуйте ще раз.</p>
            `;
        });
    } else {
        document.getElementById('weather-container').innerHTML = `
            <p>Ваш браузер не підтримує геолокацію.</p>
        `;
    }
}

function fetchWeatherByCity(city) {
    const apiKey = keyAPI;
    const urlForecast = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${apiKey}&days=7`;

    fetch(urlForecast)
        .then(response => response.json())
        .then(data => {
            displayWeatherForecast(data);
            const weatherContainer = document.getElementById('weather-container');
            const weatherCity = document.getElementById('city');
            weatherContainer.innerHTML = '';
            weatherCity.innerHTML = '';

            const cityName = data.city_name;
            weatherCity.innerHTML += `<h2>Прогноз погоди для <span>${cityName}</span></h2>`;

            data.data.forEach(day => {
                const date = new Date(day.valid_date).toLocaleDateString('uk-UA', { weekday: 'long', day: 'numeric', month: 'short' });
                const temp = day.temp;
                const tempMax = day.max_temp;
                const tempMin = day.min_temp;
                const description = day.weather.description;
                const icon = day.weather.icon;

                const weatherDay = document.createElement('div');
                weatherDay.className = 'weather-day';

                weatherDay.innerHTML = `
                    <h3>${date}</h3>
                    <p>Температура: ${temp}°C</p>
                    <p>Макс. температура: ${tempMax}°C</p>
                    <p>Мін. температура: ${tempMin}°C</p>
                    <p>Опис: ${translateWeather(description)}</p>
                    <img src="https://www.weatherbit.io/static/img/icons/${icon}.png" alt="${description}">
                `;

                weatherContainer.appendChild(weatherDay);

                weatherDay.addEventListener('click', () => {
                    fetchHourlyForecast(city, day.valid_date);
                });
            });
        })
        .catch(error => {
            console.error('Error fetching the weather forecast data:', error);
            document.getElementById('weather-container').innerHTML = `
                <p>Не вдалося отримати прогноз погоди. Спробуйте ще раз.</p>
            `;
        });
}

function displayWeatherForecast(data) {
    const weatherContainer = document.getElementById('weather-container');
    const weatherCity = document.getElementById('city');
    weatherContainer.innerHTML = '';
    weatherCity.innerHTML = '';

    const cityName = data.city_name;
    weatherCity.innerHTML += `<h2>Прогноз погоди для <span>${cityName}</span></h2>`;

    data.data.forEach((day, index) => {
        const date = new Date(day.valid_date).toLocaleDateString('uk-UA', { weekday: 'long', day: 'numeric', month: 'short' });
        const temp = day.temp;
        const tempMax = day.max_temp;
        const tempMin = day.min_temp;
        const description = translateWeather(day.weather.description);
        const icon = day.weather.icon;

        const weatherDay = document.createElement('div');
        weatherDay.className = 'weather-day';
        weatherDay.innerHTML = `
            <h3>${date}</h3>
            <p>Температура: ${temp}°C</p>
            <p>Макс. температура: ${tempMax}°C</p>
            <p>Мін. температура: ${tempMin}°C</p>
            <p>Опис: ${translateWeather(description)}</p>
            <img src="https://www.weatherbit.io/static/img/icons/${icon}.png" alt="Іконка погоди">
        `;
        
        weatherDay.addEventListener('click', () => {
            fetchHourlyForecast(data.city_name, day.valid_date);
        });

        weatherContainer.appendChild(weatherDay);
    });
}

function fetchHourlyForecast(city, date) {
    const apiKey = keyAPI
    const hourlyUrl = `https://api.weatherbit.io/v2.0/forecast/hourly?city=${city}&key=${apiKey}&hours=48`;

    fetch(hourlyUrl)
        .then(response => response.json())
        .then(data => {
            const hourlyWeather = data.data.filter(hour => hour.timestamp_utc.startsWith(date));
            displayHourlyWeather(hourlyWeather, date);
        })
        .catch(error => {
            console.error('Помилка отримання почасового прогнозу:', error);
        });
}

function displayHourlyWeather(hourlyData, date) {
    const hourlyWeatherContainer = document.getElementById('hourly-weather');
    const detailedDay = document.getElementById('detailed-day');

    detailedDay.innerText = `Детальна погода на ${new Date(date).toLocaleDateString('uk-UA')} день`;
    hourlyWeatherContainer.innerHTML = '';

    hourlyData.forEach(hour => {
        const time = new Date(hour.timestamp_utc).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
        const temp = hour.temp;
        const description = hour.weather.description;
        const icon = hour.weather.icon;

        const hourBlock = document.createElement('div');
        hourBlock.className = 'hour-block';
        hourBlock.innerHTML = `
            <p>${time}</p>
            <p>Температура: ${temp}°C</p>
            <p>Опис: ${translateWeather(description)}</p>
            <img src="https://www.weatherbit.io/static/img/icons/${icon}.png" alt="Іконка погоди">
        `;

        hourlyWeatherContainer.appendChild(hourBlock);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    getWeather();

    document.getElementById('search-btn').addEventListener('click', () => {
        const city = document.getElementById('city-input').value;
        if (city) {
            fetchWeatherByCity(city);
        } else {
            alert('Введіть місто');
        }
    });

    const detailedWeather = document.getElementById('detailed-weather');
    
    detailedWeather.addEventListener('click', () => {
        detailedWeather.classList.toggle('collapsed');
    });
});