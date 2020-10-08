const baseURL = 'http://api.airvisual.com/v2/';
const key  = '8bac110c-fd5a-4b14-a6b0-f94021ccc437';
let url;

const searchForm = document.querySelector('form');
const countrySelect = document.getElementById('selector1');
const stateSelect = document.getElementById('selector2');
const citySelect = document.getElementById('selector3');

let chosenState;
let chosenCity;

fetch(baseURL + 'countries?key=' + key)
    .then(result => {
        return result.json(); 
    })
    .then(json => {
        countryDropDown(json); 
    });

function countryDropDown(json) {
    for (let i = 0; i < json.data.length; i++) {
        let countryName = json.data[i].country;
        let option = document.createElement('option');

        option.value = countryName;
        option.innerHTML = `<span>${countryName}</span>`;

        countrySelect.appendChild(option);
    }
}

function getCity(event) {
    fetch(baseURL + 'cities?state=' + event.target.value + '&country=' + countrySelect.value + '&key=' + key)
        .then(result => {
            return result.json(); 
        })
        .then(json => {
            toggleCity(json); 
        });
}
stateSelect.addEventListener('change', getCity);

function getState(event) {
    fetch(baseURL + 'states?country=' + event.target.value + '&key=' + key)
        .then(result => {
            return result.json(); 
        })
        .then(json => {
            toggleState(json); 
        });
}
countrySelect.addEventListener('change', getState);

function toggleState(json) {
    for(stateName of json.data) {
        let option = document.createElement('option');

        option.value = stateName.state;
        option.innerHTML = `<span>${stateName.state}</span>`;

        stateSelect.appendChild(option);
    }
}

function toggleCity(json) {
    for(cityName of json.data) {
        let option = document.createElement('option');

        option.value = cityName.city;
        option.innerHTML = `<span>${cityName.city}</span>`;

        citySelect.appendChild(option);
    }
}
citySelect.addEventListener('change', fetchResults);
//fix search history states and cities
function fetchResults(e) {
    e.preventDefault();
    url = baseURL + 'city?city=' + citySelect.value + '&state=' + stateSelect.value + '&country=' + countrySelect.value + '&key=' + key

    fetch(url).then(function(result) {
        return result.json();
    }).then(function(json) {
        displayResults(json);
        console.log(json);
    });
};

function displayResults(json) {
    let cityData = json.data.city; //current city
    let currentTime = json.data.current.pollution.ts; //timeStamp
    let polltuionIndex = json.data.current.pollution.aqicn; //AQI value based on China MEP standard
    let tempInCelcius = json.data.current.weather.tp; //temperature in celcius
    currentCity.innerHTML = cityData;
    timeStamp.innerHTML = currentTime;
    celciusTemp.innerHTML = tempInCelcius;
    pollution.innerHTML = polltuionIndex;
}