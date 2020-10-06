const baseURL = 'http://api.airvisual.com/v2/countries?key=';
const key  = '8bac110c-fd5a-4b14-a6b0-f94021ccc437';
let url;

const country = document.querySelector('.country');
const select = document.querySelector('select');
const searchForm = document.querySelector('form');

let dropDown = document.addEventListener('change', fetchResults);


fetch(baseURL + key)
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

        option.value = country;
        option.innerHTML = `<span>${countryName}</span>`;

        select.appendChild(option);
    }
}

function toggleState() {
    let stateBox = document.getElementById('selector2');
    if(stateBox.style.display == 'block') {
        stateBox.style.display = 'none';
    }
    else {
        stateBox.style.display == 'block';
    }
}

function toggleCity() {
    let cityBox = document.getElementById('selector2');
    if(cityBox.style.display == 'block') {
        cityBox.style.display = 'none';
    }
    else {
        cityBox.style.display == 'block';
    }
}

function fetchResults(e) {
    
    
}