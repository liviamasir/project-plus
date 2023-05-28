let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "wednesday",
  "Thursday",
  "Friday",
  "Sunday",
];

let currentDate = `${
  days[now.getDay()]
}, ${now.getHours()}:${now.getMinutes()}`;
let monday = document.querySelector("#currentDate");
monday.innerHTML = currentDate;

const SEARCH_API_ENDPOINT = "https://api.openweathermap.org/data/2.5/weather";
const KEY = "49b631c45785fe73d2a88477803dea22";
const UNITS = "metric";

let searchInput = "";

function showCity(event) {
  event.preventDefault();
  searchInput = document.querySelector("#search-input").value;
  let currentCity = document.querySelector("#current-city");

  currentCity.innerHTML = searchInput;

  let apiUrl = `${SEARCH_API_ENDPOINT}?q=${searchInput}&appid=${KEY}&units=${UNITS}`;

  axios
    .get(apiUrl)
    .then(showTemperature)
    .catch((error) => console.log(error));
}

function getForecast(coordinates) {
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${KEY}&units=${UNITS}`;
  axios.get(apiURL).then(displayForecast);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temperature");
  let currentDescription = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  currentTemp.innerHTML = temperature;
  currentDescription.innerHTML = response.data.weather[0].main;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiUrl = `${SEARCH_API_ENDPOINT}?lat=${lat}&lon=${lon}&appid=${KEY}&units=${UNITS}`;

  axios
    .get(apiUrl)
    .then(showTemperature)
    .catch((error) => console.log(error));
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  let forecastHTML = `<div class="row">`;

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col">
         ${day}
        <br />
        <img
          src="http://openweathermap.org/img/wn/02d@2x.png"
          alt="Clear"
      class="weather-forecast-image"
    />
    <br />
    <span class="maximum">15°</span>
    <span class="minimum">5°</span>
    </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let celsiusTemperature = null;

let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("submit", showCity);

navigator.geolocation.getCurrentPosition(handlePosition, (error) =>
  console.log(error)
);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
