function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");

  //Other data

  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let precipitationsElement = document.querySelector("#precipitations");

  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  precipitationsElement.innerHTML = response.data;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
}
let city = "Barcelona";
let apiKey = "3b640c0f817d39516bf582b1b906ce4f";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
