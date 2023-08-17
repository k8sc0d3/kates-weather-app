//Date and Time

let now = new Date();

let tDate = document.querySelector("#date");
let tTime = document.querySelector("#time");
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes().toString().padStart(2, "0");
let year = now.getFullYear();

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

let months = [
  "January",
  "Febuary",
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

tDate.innerHTML = `${day}, ${date} ${month} ${year}`;
tTime.innerHTML = `${hours}:${minutes}`;

//Replace Farenheit
function displayFTemp(event) {
  event.preventDefault();
  //remove and add class list
  cLink.classList.remove("active");
  fLink.classList.add("active");

  let fValue = (cValue * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#curr-temp");
  //alert(fValue);
  temperatureElement.innerHTML = Math.round(fValue);
}

function displayCTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#curr-temp");
  cLink.classList.add("active");
  fLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(cValue);
}
let cValue = null;

let fLink = document.querySelector("#f-temp");
fLink.addEventListener("click", displayFTemp);

let cLink = document.querySelector("#c-temp");
cLink.addEventListener("click", displayCTemp);

searchCity("Melbourne");

// Search Bar

function displayWeatherCondition(response) {
  let cityElement = document.querySelector("#city");
  let countryElement = document.querySelector("#country");
  let temperatureElement = document.querySelector("#curr-temp");
  let descriptionElement = document.querySelector("#temp-desc");
  let humidityElement = document.querySelector("#rain");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  cValue = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(cValue);
  cityElement.innerHTML = response.data.city;
  countryElement.innerHTML = response.data.country;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.condition.description;
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.description);
}

function searchCity(city) {
  let apiKey = "7b92118f0463o637a71bc5b26ac0t299";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  //`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#location-form").value;
  searchCity(city);
}

let search = document.querySelector("#search");
search.addEventListener("submit", submit);

function searchLocation(position) {
  console.log(position);
  let apiKey = "7b92118f0463o637a71bc5b26ac0t299";
  //"202e78c6847f13b8daaa5f378f2256eb";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${long}&lat=${lat}&key=${apiKey}&units=metric`;
  //`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getCurrentLocation);
//Geolocation API

//function showTemperature(response) {
//let temperature = Math.round(response.data.main.temp);
//console.log(temperature);
//let heading = document.querySelector("h1");
//heading.innerHTML = `It is ${temperature}°C where you are!`;
//}

//function showPosition(position) {
//let latitude = Math.round(position.coords.latitude);
//let longitude = Math.round(position.coords.longitude);
//console.log(latitude);
//console.log(longitude);
// let apiKey = "202e78c6847f13b8daaa5f378f2256eb";
//let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
//axios.get(`${apiUrl}`).then(showTemperature);
//}
//navigator.geolocation.getCurrentPosition(showPosition);
