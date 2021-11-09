let now = new Date();

let h2 = document.querySelector("h2");

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

h2.innerHTML = `${day} ${hours}:${minutes}`;

function searchCity() {
  event.preventDefault();
  let searchInput = document.querySelector("#searchCity");
  let cityDisplay = document.querySelector("h1");
  let city = searchInput.value;
  city.toLowerCase();
  cityDisplay.innerHTML = `${city}`;
  let apiKey = "35ccbef0c279f2a123735a93a339afb4";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(url).then(showWeather);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

/* function celsius() {
  event.preventDefault();
  let changeCelsius = document.querySelector("#celsius");
  let span = document.querySelector("span");
  span.innerHTML = "37";
}
let element = document.querySelector("#celsius");
element.addEventListener("click", celsius); */

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#currentTemperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document
    .querySelector("#weatherImage")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}

function showPosition(postion) {
  let apiKey = "35ccbef0c279f2a123735a93a339afb4";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(url).then(showWeather);
}
function getCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("#currentLocation");
button.addEventListener("click", getCurrentLocation);
