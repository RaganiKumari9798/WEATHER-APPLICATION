const apiKey = '19d503c3e3a4d0c8397bd5f19b026d9b'; // ← Replace with your key

const cityInput = document.getElementById('city-input');
const fetchBtn = document.getElementById('fetch-btn');
const weatherCard = document.getElementById('weather-card');
const errorMsg = document.getElementById('error-message');

const cityNameEl = document.getElementById('city-name');
const weatherIconEl = document.getElementById('weather-icon');
const descEl = document.getElementById('description');
const tempEl = document.getElementById('temp');
const windEl = document.getElementById('wind');
const humidityEl = document.getElementById('humidity');

fetchBtn.addEventListener('click', getWeather);
cityInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') getWeather();
});

async function getWeather() {
  const city = cityInput.value.trim();
  if (!city) return;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (res.ok) {
      errorMsg.classList.add('hidden');
      updateUI(data);
    } else {
      showError(data.message);
    }
  } catch (err) {
    showError('Network error');
    console.error(err);
  }
}

function updateUI(data) {
  const { name, weather, main, wind } = data;
  cityNameEl.textContent = name;
  descEl.textContent = weather[0].description;
  tempEl.textContent = Math.round(main.temp);
  windEl.textContent = wind.speed;
  humidityEl.textContent = main.humidity;
  weatherIconEl.src =  `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  weatherIconEl.alt = weather[0].description;

  weatherCard.classList.remove('hidden');
}

function showError(msg) {
  weatherCard.classList.add('hidden');
  errorMsg.textContent = msg;
  errorMsg.classList.remove('hidden');
}

