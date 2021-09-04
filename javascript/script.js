function getTime(timestamp) {
  let now = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursady",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let min = now.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  return `${day} ${hour}:${min}`;
}

function getForecast(coordinates) {
  let apiKey = "c95b7792f2deeca8f4736c654342258c";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
      <div class="weather-forecast-date">
      ${formatDay(forecastDay.dt)}
      </div>
      <img src="http://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }.png" alt="" 
      width ="40" />
      <div class="weather-forecast-temp"> 
        <span class="weather-forecast-temp-max">  
          ${Math.round(forecastDay.temp.max)}°
        </span>
        <span class="weather-forecast-temp-min">
          ${Math.round(forecastDay.temp.min)}°
        </span>
       </div>
  </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  document.querySelector("#forecast").innerHTML = forecastHTML;
}
function updateCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search-field").value;
  document.querySelector("#current-city").innerHTML = city;

  let apiKey = "c95b7792f2deeca8f4736c654342258c";
  let units = "metric";
  let weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(weatherApi).then(getCurrentData);
}

function getCurrentData(response) {
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;

  document.querySelector("#current-degree").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-time").innerHTML = getTime(
    response.data.dt * 1000
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );

  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

document
  .querySelector("#city-search-form")
  .addEventListener("submit", updateCity);

function retrieveCurrentLocationData(event) {
  function displayGeoTemp(response) {
    document.querySelector("#weather-description").innerHTML =
      response.data.weather[0].main;
    document.querySelector("#current-city").innerHTML = response.data.name;

    document.querySelector("#current-degree").innerHTML = Math.round(
      response.data.main.temp
    );

    document.querySelector("#humidity").innerHTML = Math.round(
      response.data.main.humidity
    );

    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed
    );
    document.querySelector("#current-time").innerHTML = getTime(
      response.data.dt * 1000
    );
    document
      .querySelector("#icon")
      .setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
      );
  }
  navigator.geolocation.getCurrentPosition(handlePosition);
  function handlePosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let apiKey = "c95b7792f2deeca8f4736c654342258c";
    let units = "metric";
    let geolocationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;

    axios.get(geolocationUrl).then(displayGeoTemp);
  }
}

document
  .querySelector("#current-city-button")
  .addEventListener("click", retrieveCurrentLocationData);

function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getCurrentData);
}

function changetoFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  tempCelsius.classList.remove("active");
  tempFahrenheit.classList.add("active");
  document.querySelector("#current-degree").innerHTML =
    Math.round(fahrenheitTemp);
}

let tempFahrenheit = document.querySelector("#fahrenheit-link");
tempFahrenheit.addEventListener("click", changetoFahrenheit);

function changetoCelsius(event) {
  event.preventDefault();
  document.querySelector("#current-degree").innerHTML =
    Math.round(celsiusTemperature);
  tempCelsius.classList.add("active");
  tempFahrenheit.classList.remove("active");
}

let tempCelsius = document.querySelector("#celsius-link");
tempCelsius.addEventListener("click", changetoCelsius);

let celsiusTemperature = null;

searchCity("Zürich");
