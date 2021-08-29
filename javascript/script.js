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
}

document
  .querySelector("#city-search-form")
  .addEventListener("submit", updateCity);

// function changetoFahrenheit(event) {
// event.preventDefault();
// let currentTemp = document.querySelector("#current-degree");
// currentTemp.innerHTML = "97";}

// function changetoCelsius(event) {
// event.preventDefault();
// let currentTemp = document.querySelector("#current-degree");
// currentTemp.innerHTML = "36";}

// let tempCelsius = document.querySelector("#celsius-link");
// tempCelsius.addEventListener("click", changetoCelsius);

// let tempFahrenheit = document.querySelector("#fahrenheit-link");
// tempFahrenheit.addEventListener("click", changetoFahrenheit);

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
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
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
searchCity("Zürich");
