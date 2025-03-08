"use strict";

export const keyAPI = 'c080a3898ecf433da64badbc1b505fa2';

export const translations = {
    'Clear sky': 'Ясне небо',
    'Clear Sky': 'Ясне небо',
    'Few clouds': 'Мало хмар',
    'Scattered clouds': 'Розсіяні хмари',
    'Broken clouds': 'Рвані хмари',
    'Shower rain': 'Зливовий дощ',
    'Rain': 'Дощ',
    'Thunderstorm': 'Гроза',
    'Snow': 'Сніг',
    'Mist': 'Туман',
    'Overcast clouds': 'Похмуро',
    'Drizzle': 'Мряка',
    'Freezing rain': 'Крижаний дощ',
    'Light snow': 'Легкий сніг',
    'Heavy snow': 'Сильний сніг',
    'Sleet': 'Мокрий сніг',
    'Haze': 'Димка',
    'Fog': 'Туман',
    'Sand': 'Пісок у повітрі',
    'Dust': 'Пилова буря',
    'Ash': 'Попіл',
    'Squall': 'Шквал',
    'Tornado': 'Торнадо',
    'Light shower rain': 'Легкий зливовий дощ',
    'Zhytomyr' : 'Житомир'
};

export function translateWeather(description) {
    return translations[description] || description; 
}