function showCurrentTime() {
  let now = new Date();
  let date = now.getDate();

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let formattedTime = document.querySelector("#current-Hour");
  formattedTime.innerHTML = `${hours}:${minutes}`;
  return formattedTime;
}
showCurrentTime();

function showCurrentDate() {
  let now = new Date();
  let date = now.getDate();
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
  let year = now.getFullYear();
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
  let month = months[now.getMonth()];
  let formattedDate = document.querySelector("#current-Date");
  formattedDate.innerHTML = `${day}, ${month} ${date}, ${year}`;
  return formattedDate;
}
showCurrentDate();

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", searchCity);

function search(city) {
  let units = "imperial";
  let apiKey = "91f41f9a3182f09b51571aedfc243a1c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-Input");
  let currentCity = document.querySelector("#current-City");
  let city = searchInput.value;
  currentCity.innerHTML = city;
  search(city);
}

function displayForecast(response) {
  console.log(response);
}

function getForecast(coordinates) {
  let units = "imperial";
  let apiKey = "91f41f9a3182f09b51571aedfc243a1c";
  let apiUrl = `api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
}

function showTemperature(response) {
  let todayDescription = (document.querySelector(
    "#currentDescription"
  ).innerHTML = response.data.weather[0].description);
  let tempMax = Math.round(response.data.main.temp_max);
  let tempMin = Math.round(response.data.main.temp_min);
  let humidity = response.data.main.humidity;
  let humidityString = (document.querySelector(
    "#humidityPercent"
  ).innerHTML = `${humidity}%`);
  let wind = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  let iconImage = response.data.weather[0].icon;
  let temperature = document.querySelector("#currentTemp");

  console.log(response);
  fahrenheitTemperature = Math.round(response.data.main.temp);

  document.querySelector("#currentTemp").innerHTML = `${fahrenheitTemperature}`;
  document.querySelector("#windSpeed").innerHTML = `${wind} mph`;
  document.querySelector("#current-City").innerHTML = response.data.name;
  document.querySelector("#temp-Hi").innerHTML = `High: ${tempMax}°F`;
  document.querySelector("#temp-Low").innerHTML = `Low: ${tempMin}°F`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconImage}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "imperial";
  let apiKey = "91f41f9a3182f09b51571aedfc243a1c";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiString = `${apiEndpoint}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiString).then(showTemperature);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let btncurrent = document.querySelector("#btnCurrent");
btncurrent.addEventListener("click", getLocation);

function showCelsius(event) {
  event.preventDefault();
  let celsiusTemperature = Math.round(((fahrenheitTemperature - 32) * 5) / 9);
  let temperature = document.querySelector(".currentTemp");
  temperature.innerHTML = celsiusTemperature;
  fahrenheit.classList.remove("activeLink");
  celsius.classList.add("activeLink");
}

function showFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector(".currentTemp");
  currentTemp.innerHTML = fahrenheitTemperature;
  //temperature.innerHTML = Math.round(fahrenheitTemperature);
  fahrenheit.classList.add("activeLink");
  celsius.classList.remove("celsiusLink");
}
let fahrenheitTemperature = null;

let celsius = document.querySelector(".celsiusLink");
celsius.addEventListener("click", showCelsius);

let fahrenheit = document.querySelector(".activeFahrenheitLink");
fahrenheit.addEventListener("click", showFahrenheit);

search("Seattle");
