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

function convertToF(event) {
  event.preventDefault();
  let ftemp = document.querySelector("#curr-temp");
  //let ftemp = Math.round(temp * 1.8 + 32);
  ftemp.innerHTML = 59;
}

let faren = document.querySelector("#f-temp");
faren.addEventListener("click", convertToF);

//Replace Celcius
function convertToC(event) {
  event.preventDefault();
  let ctemp = document.querySelector("#curr-temp");
  ctemp.innerHTML = 15;
}

let celc = document.querySelector("#c-temp");
celc.addEventListener("click", convertToC);

// Search Bar

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#curr-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  console.log(response.main);

  document.querySelector("#rain").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#temp-desc").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "202e78c6847f13b8daaa5f378f2256eb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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
  let apiKey = "202e78c6847f13b8daaa5f378f2256eb";
  let latitude = Math.round(position.coords.latitude);
  let longitude = Math.round(position.coords.longitude);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

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
