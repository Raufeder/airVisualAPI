const baseURL = "https://api.airvisual.com/v2/";
const key = "8bac110c-fd5a-4b14-a6b0-f94021ccc437";
let url;
//TODO Clear population selection before clicking new option
const searchForm = document.querySelector("form");
const stateSelect = document.getElementById("selector1");
const citySelect = document.getElementById("selector2");

let chosenCountry = "USA"
let chosenState;
let chosenCity;

//CHOSEN COUNTRY TO POPULATE STATES
fetch(baseURL + "states?country=" + chosenCountry + "&key=" + key)
  .then((result) => {
    return result.json();
  })
  .then((json) => {
    toggleState(json);
  });
        
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

//CHOSEN STATE TO POPULATE CITIES
function getCity(event) {
  fetch(
    baseURL +
      "cities?state=" +
      event.target.value +
      "&country=" +
      chosenCountry +
      "&key=" +
      key
  )
    .then((result) => {
      return result.json();
    })
    .then((json) => {
      toggleCity(json);
    });
}
stateSelect.addEventListener("change", getCity);

citySelect.addEventListener("change", fetchResults);

function fetchResults(e) {
  e.preventDefault();
  url =
    baseURL +
    "city?city=" +
    citySelect.value +
    "&state=" +
    stateSelect.value +
    "&country=" +
    chosenCountry +
    "&key=" +
    key;

  fetch(url)
    .then(function (result) {
      return result.json();
    })
    .then(function (json) {
      displayResults(json);
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
