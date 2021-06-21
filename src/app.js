//Forecast

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", ,];

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
              <div class="col-2">
                <div class="weather-forecast-date">${day}</div>

                <img
                  src="https://images.vexels.com/media/users/3/205087/isolated/preview/a41d84a485d960a7d929fd95ece1acf1-weather-stroke-icon-by-vexels.png"
                  alt=""
                  width="50"
                />
                <div class="weather-forecast-temperature">
                  <span class="weather-forecast-temp-max">20</span>
                  <span class="weather-forecast-temp-min">12</span>
                </div>
              </div>
              `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function formatDate(timestemp) {
  //Calculate the date

  let date = new Date(timestemp);
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  //Convert numbers to days
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");

  //Other data

  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let pressureElement = document.querySelector("#pressure");

  //Date

  let currentTime = document.querySelector("#date");
  currentTime.innerHTML = formatDate(response.data.dt * 1000);

  //Icon
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("alt", response.data.weather[0].description);

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  // Celsius Temperature
  celsiusTemperature = response.data.main.temp;

  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  pressureElement.innerHTML = Math.round(response.data.main.pressure);

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
}
//Search Bar

function search(city) {
  let apiKey = "3b640c0f817d39516bf582b1b906ce4f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
function searchCity(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

//Convert ºC to ºF

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  //Remove the active class from the celsius link
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;

  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  //Remove the active class from the fahrenheit link
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

displayForecast();
search("Barcelona");
