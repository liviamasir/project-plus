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

let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("submit", showCity);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  let currentTemp = document.querySelector("#temperature");
  let description = response.data.weather[0].main;
  currentTemp.innerHTML = `${description}   ${temperature}°`;
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
navigator.geolocation.getCurrentPosition(handlePosition, (error) =>
  console.log(error)
);
