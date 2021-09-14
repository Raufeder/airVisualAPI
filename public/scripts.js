const baseURL = "https://api.airvisual.com/v2/";
const key = "8bac110c-fd5a-4b14-a6b0-f94021ccc437";
let url;
//TODO Make it just USA
//TODO Clear population selection before clicking new option
const searchForm = document.querySelector("form");
const countrySelect = document.getElementById("selector1");
const stateSelect = document.getElementById("selector2");
const citySelect = document.getElementById("selector3");

let chosenState;
let chosenCity;

// Initial Fetch to populate Countries
fetch(baseURL + "countries?key=" + key)
  .then((result) => {
    return result.json();
  })
  .then((json) => {
    countryDropDown(json);
  });
//COUNTRY DROPDOWN FUNCTION
function countryDropDown(json) {
  for (let i = 0; i < json.data.length; i++) {
    let countryName = json.data[i].country;
    let option = document.createElement("option");

    option.value = countryName;
    option.innerHTML = `<span>${countryName}</span>`;

    countrySelect.appendChild(option);
  }
}

//STATE DROPDOWN FUNCTION
function toggleState(json) {
  for (stateName of json.data) {
    let option = document.createElement("option");

    option.value = stateName.state;
    option.innerHTML = `<span>${stateName.state}</span>`;

    stateSelect.appendChild(option);
  }
}

//CITY DROPDOWN FUNCTION
function toggleCity(json) {
  for (cityName of json.data) {
    let option = document.createElement("option");

    option.value = cityName.city;
    option.innerHTML = `<span>${cityName.city}</span>`;

    citySelect.appendChild(option);
  }
}

//CHOSEN COUNTRY TO POPULATE STATES
function getState(event) {
  fetch(baseURL + "states?country=" + event.target.value + "&key=" + key)
    .then((result) => {
      return result.json();
    })
    .then((json) => {
      toggleState(json);
      console.log(json.data);
    });
}
countrySelect.addEventListener("change", getState);

//CHOSEN STATE TO POPULATE CITIES
function getCity(event) {
  fetch(
    baseURL +
      "cities?state=" +
      event.target.value +
      "&country=" +
      countrySelect.value +
      "&key=" +
      key
  )
    .then((result) => {
      return result.json();
    })
    .then((json) => {
      toggleCity(json);
      console.log(json.data);
    });
}
stateSelect.addEventListener("change", getCity);

// countrySelect.addEventListener("change", fetchResults);
citySelect.addEventListener("change", fetchResults);
// stateSelect.addEventListener("change", fetchResults);

function fetchResults(e) {
  e.preventDefault();
  url =
    baseURL +
    "city?city=" +
    citySelect.value +
    "&state=" +
    stateSelect.value +
    "&country=" +
    countrySelect.value +
    "&key=" +
    key;

  fetch(url)
    .then(function (result) {
      return result.json();
    })
    .then(function (json) {
      displayResults(json);
      console.log(json.data)
    });
}

function displayResults(json) {
  let cityData = json.data.city; //current city
  let currentTime = json.data.current.pollution.ts; //timeStamp
  let polltuionIndex = json.data.current.pollution.aqicn; //AQI value based on China MEP standard
  let tempInFahrenheit = (json.data.current.weather.tp) * 1.8 + 32; //temperature in fahrenheit
  currentCity.innerHTML = cityData;
  timeStamp.innerHTML = currentTime;
  fahrenheitTemp.innerHTML = tempInFahrenheit + "°F";
  pollution.innerHTML = polltuionIndex;
}
