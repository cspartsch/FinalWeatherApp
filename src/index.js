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

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-Input");
  let currentCity = document.querySelector("#current-City");
  currentCity.innerHTML = `${searchInput.value}`;
  let units = "imperial";
  let apiKey = "91f41f9a3182f09b51571aedfc243a1c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
}
let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", searchCity);

function showTemperature(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
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
  document.querySelector("#currentTemp").innerHTML = `${temperature}°F`;
  document.querySelector("#windSpeed").innerHTML = `${wind} mph`;
  document.querySelector("#current-City").innerHTML = response.data.name;
  document.querySelector("#temp-Hi").innerHTML = `High: ${tempMax}°F`;
  document.querySelector("#temp-Low").innerHTML = `Low: ${tempMin}°F`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconImage}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
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
