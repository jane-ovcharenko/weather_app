let today = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let dayNow = document.querySelector("#current-day");
dayNow.innerHTML = days[today.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let dateNow = document.querySelector("#current-date");
dateNow.innerHTML = months[today.getMonth()] + " " + today.getDate();

let timeNow =
  today.getHours() +
  ":" +
  (today.getMinutes() < 10 ? "0" : "") +
  today.getMinutes();
let time = document.querySelector("#current-time");
time.innerHTML = timeNow;

///

function findCity(city) {
  let apiKey = "526506b876f3e352ea6d4d31547ae1fc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

////

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  findCity(city);
}
let currentCityInput = document.querySelector("#searchtab");
currentCityInput.addEventListener("submit", handleSubmit);

////
function showWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
}

function searchByLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "526506b876f3e352ea6d4d31547ae1fc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

function handleSubmitCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchByLocation);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", handleSubmitCurrentLocation);
