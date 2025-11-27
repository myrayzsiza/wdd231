const apiKey = "ae64a9f32f7b56d81c98422363517884";
const city = "Jinja,UG";
const units = "metric";

async function getWeather() {
  const currentEl = document.getElementById('current-temp');
  const descEl = document.getElementById('current-desc');
  const forecastEl = document.getElementById('forecast');

  if (!apiKey) {
    currentEl.textContent = 'Weather API key not configured.';
    descEl.textContent = 'Please add your OpenWeatherMap API key in scripts/weather.js';
    forecastEl.innerHTML = '';
    return;
  }

  try {
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=${units}`;
    const r1 = await fetch(currentUrl);
    if (!r1.ok) throw new Error(`Current weather error: ${r1.status}`);
    const current = await r1.json();

    currentEl.textContent = `Temp: ${current.main.temp} °${units === 'metric' ? 'C' : 'F'}`;
    descEl.textContent = current.weather && current.weather[0] ? current.weather[0].description : '';

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=${units}`;
    const r2 = await fetch(forecastUrl);
    if (!r2.ok) throw new Error(`Forecast error: ${r2.status}`);
    const forecastData = await r2.json();

    const list = forecastData.list || [];
    const days = {};

    list.forEach(item => {
      const [dateStr] = item.dt_txt.split(' ');
      if (!days[dateStr]) days[dateStr] = [];
      days[dateStr].push(item);
    });

    const today = new Date().toISOString().slice(0, 10);
    const dayKeys = Object.keys(days).filter(d => d > today).slice(0, 3);

    if (dayKeys.length === 0) {
      forecastEl.innerHTML = '<p>Forecast not available.</p>';
    } else {
      forecastEl.innerHTML = '<h3>3-day forecast</h3>';
      const ul = document.createElement('ul');

      dayKeys.forEach(k => {
        const entries = days[k];
        let chosen = entries.find(e => e.dt_txt.includes('12:00:00')) || entries[Math.floor(entries.length / 2)];
        if (!chosen) return;

        const date = new Date(chosen.dt_txt);
        const dateLabel = date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });

        const li = document.createElement('li');
        li.textContent = `${dateLabel}: ${chosen.main.temp} °${units === 'metric' ? 'C' : 'F'} — ${chosen.weather[0].description}`;
        ul.appendChild(li);
      });

      forecastEl.appendChild(ul);
    }
  } catch (err) {
    console.error('Weather error:', err);
    currentEl.textContent = 'Unable to load weather.';
    descEl.textContent = '';
    forecastEl.innerHTML = '<p>Forecast unavailable.</p>';
  }
}

getWeather();
