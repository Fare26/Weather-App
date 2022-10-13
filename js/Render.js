function renderWeather(currently, forecast) {
  forecastHourlyContainer.innerHTML = "";
  forecastDailyContainer.innerHTML = "";
  currentCity.innerHTML = currently.name;
  currentCountry.innerHTML = currently.country;
  let mainTime = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: forecast.timezone,
  }).format(new Date(currently.dt * 1000));
  currentTime.innerHTML = mainTime;
  currentTemp.innerHTML = `${currently.temp.toFixed()}°`;
  currentTemperatureInfo.innerHTML = currently.description.toUpperCase();
  currentImg.src = `./imgs/${getIcon(currently.icon)}`;
  sunrise.innerHTML = getCurrTime(currently.sunrise, forecast.timezone);
  sunset.innerHTML = getCurrTime(currently.sunset, forecast.timezone);
  currentMaxTemp.innerHTML = `${forecast.daily[0].temp.max.toFixed()}°`;
  currentMinTemp.innerHTML = `${forecast.daily[0].temp.min.toFixed()}°`;
  currentWind.innerHTML = currently.speed.toFixed();
  currentHumidity.innerHTML = currently.humidity.toFixed();
  let curTime = getCurrTime(currently.dt, forecast.timezone);
  let curSunrise = getCurrTime(currently.sunrise, forecast.timezone);
  let curSunset = getCurrTime(currently.sunset, forecast.timezone);
  if (
    (curTime <= curSunrise &&
      curTime.slice(-2) === "AM" &&
      curTime >= "00:00 AM" &&
      curTime.slice(-2) === "AM") ||
    (curTime >= curSunset &&
      curTime.slice(-2) === "PM" &&
      curTime <= "12:00 PM" &&
      curTime.slice(-2) === "PM")
  ) {
    document.querySelector("body").style = `background: rgb(33,37,41);
    background: linear-gradient(180deg, rgba(33,37,41,1) 0%, rgba(44,44,44,1) 50%, rgb(22 22 22) 100%);`;
  } else if (
    Number(currently.temp.toFixed()) >= 25 &&
    (currently.icon === "01d" || currently.icon === "02d")
  ) {
    document.querySelector("body").style = `background: rgb(255,193,7);
    background: linear-gradient(#f8d361, rgb(255 199 34) 50%, rgb(204, 154, 6) 100%);`;
  } else {
    document.querySelector("body").style =
      "background: rgb(133, 166, 225); background: linear-gradient(rgb(123 154 210) 0%, rgb(121, 178, 245) 50%, rgb(79 130 182) 100%);";
  }
  for (let i = 1; i < forecast.hourly.length; i++) {
    forecastHourlyContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="swiper-slide hourly1">
      <div class="forecast-box">
        <p>${getCurrDate(forecast.hourly[i].dt, forecast.timezone)}</p>
        <p>${getCurrTime(forecast.hourly[i].dt, forecast.timezone)}</p>
        <img src="./imgs/${getIcon(forecast.hourly[i].weather[0].icon)}" />
        <div>
          <span>${forecast.hourly[i].temp.toFixed()}°</span>
        </div>
      </div>
      </div>`
    );
    if (i === 24) break;
  }
  for (let i = 1; i < forecast.daily.length; i++) {
    forecastDailyContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="swiper-slide daily1">
      <div class="daily-box">
          <p>${getCurrWeekday(forecast.daily[i].dt, forecast.timezone).slice(
            0,
            3
          )}</p>
          <img src="./imgs/${getIcon(forecast.daily[i].weather[0].icon)}" />
          <div>
            <span>${forecast.daily[i].temp.max.toFixed()}°</span>
            <span>${forecast.daily[i].temp.min.toFixed()}°</span>
          </div>
        </div>
        </div>`
    );
  }
}

function getCurrTime(time, tzone) {
  return new Intl.DateTimeFormat(lang, {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: tzone,
  }).format(new Date(time * 1000));
}

function getCurrDate(time, tzone) {
  return new Intl.DateTimeFormat(lang, {
    day: "numeric",
    month: "numeric",
    timeZone: tzone,
  }).format(new Date(time * 1000));
}

function getCurrWeekday(time, tzone) {
  return new Intl.DateTimeFormat(lang, {
    weekday: "long",
    timeZone: tzone,
  }).format(new Date(time * 1000));
}

function getIcon(url) {
  switch (url) {
    case "01d":
      return "01d@2x.png";
    case "01n":
      return "01n@2x.png";
    case "02d":
      return "02d@2x.png";
    case "02n":
      return "02n@2x.png";
    case "03d":
    case "03n":
      return "03d@2x.png";
    case "04d":
    case "04n":
      return "04d@2x.png";
    case "09d":
    case "09n":
      return "09d@2x.png";
    case "10d":
      return "10d@2x.png";
    case "10n":
      return "10n@2x.png";
    case "11d":
    case "11n":
      return "11n@2x.png";
    case "13d":
    case "13n":
      return "13n@2x.png";
    case "50d":
    case "50n":
      return "50n@2x.png";
    default:
      break;
  }
}
