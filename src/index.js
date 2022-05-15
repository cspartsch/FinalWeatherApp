function showCurrentTime() {
  let now = new Date();
  let date = now.getDate();
  let hours = now.getHours();
  let amOrPm = "";
  if (hours >= 12) {
    amOrPm = "PM";
  } else {
    amOrPm = "AM";
  }

  if (hours > 0 && hours <= 12) {
    hours = hours;
  } else if (hours > 12) {
    hours = hours - 12;
  } else if (hours == 0) {
    hours = "12";
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let formattedTime = document.querySelector("#current-Hour");
  formattedTime.innerHTML = `${hours}:${minutes} ${amOrPm}`;
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecastInfo");
  let uvIndexElement = Math.round(response.data.current.uvi);
  document.querySelector("#uvIndex").innerHTML = `${uvIndexElement}`;
  let forecastHTML = `<div class="row">`;
  console.log(response);
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col card-column">
        <div class="card forecastDisplay">
              <div class="card-title">${formatDay(forecastDay.dt)}</div>
              <div class="card border-0 h-100">
                <div class="text-center card-content">
                  <span class="card-temp-max">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span class="card-temp-min">${Math.round(
                    forecastDay.temp.min
                  )}°<span>
                  <div>
                    <img
          src="https://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
                  </div>
                </div>
              </div>
            </div>
            </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

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

function getForecast(coordinates) {
  let units = "imperial";
  let apiKey = "91f41f9a3182f09b51571aedfc243a1c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
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
  fahrenheitTemperature = Math.round(response.data.main.temp);

  document.querySelector("#currentTemp").innerHTML = `${fahrenheitTemperature}`;
  document.querySelector("#windSpeed").innerHTML = `${wind} mph`;
  document.querySelector("#current-City").innerHTML = response.data.name;
  document.querySelector("#temp-Hi").innerHTML = `High: ${tempMax}°F`;
  document.querySelector("#temp-Low").innerHTML = `Low: ${tempMin}°F`;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${iconImage}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
  console.log(response);
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
  let temperature = document.querySelector("#currentTemp");
  fahrenheit.classList.remove("active-link");
  celsius.classList.add("active-link");
  temperature.innerHTML = celsiusTemperature;
}

function showFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#currentTemp");
  fahrenheit.classList.add("active-link");
  celsius.classList.remove("active-link");
  currentTemp.innerHTML = fahrenheitTemperature;
}
let fahrenheitTemperature = null;

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", searchCity);

let celsius = document.querySelector(".celsiusLink");
celsius.addEventListener("click", showCelsius);

let fahrenheit = document.querySelector(".activeFahrenheitLink");
fahrenheit.addEventListener("click", showFahrenheit);

search("Seattle");
