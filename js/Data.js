const API_KEY = "0d065093a4dac5ad1bd4abe78acd90ec";

async function getData(city) {
  document.querySelector("#loader").style.display = "flex";
  document.querySelector("#container").style.opacity = 0.18;
  const currently = await getCurrently(city);
  if (!currently) return;
  let { lat, lon } = currently;
  const forecast = await getForecast(lat, lon);
  renderWeather(currently, forecast);
}
function getCurrently(city) {
  const currentData = fetch(
    `${
      typeof city === "object"
        ? `https://api.openweathermap.org/data/2.5/weather?lat=${city.latitude}&lon=${city.longitude}&units=metric&appid=${API_KEY}`
        : `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    }`
  )
    .then((response) => {
      if (response.status !== 200) throw Error("This city does not exist!");
      return response.json();
    })
    .then((data) => {
      const {
        coord: { lon, lat },
        dt,
        main: { temp, humidity },
        name,
        sys: { country, sunrise, sunset },
        wind: { speed },
      } = data;
      const { description, icon } = data.weather[0];
      return {
        lon,
        lat,
        dt,
        temp,
        humidity,
        name,
        country,
        sunrise,
        sunset,
        speed,
        description,
        icon,
      };
    })
    .catch((err) => console.log(err))
    .finally(function () {
      document.querySelector("#loader").style.display = "none";
      document.querySelector("#container").style.opacity = 1;
    });
  if (!currentData) return;
  return currentData;
}

function getForecast(lat, lon) {
  const forecastData = fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  )
    .then((response) => {
      if (response.status !== 200) throw Error("This city does not exist!");
      return response.json();
    })
    .then((data) => {
      const { daily, hourly, timezone } = data;
      return { daily, hourly, timezone };
    })
    .catch((err) => console.log(err));
  if (!forecastData) return;
  return forecastData;
}
