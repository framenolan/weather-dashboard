var searchFormEl = document.querySelector('#city-search-form');
var searchCityEl = document.querySelector('#city-search-value');
var savedSearchesEl = document.querySelector('#saved-searches')

var apiKey = "71a0527b60357e324a7126bf56e7c80b"
var today = moment();


// Form Submit Handler for triggering search function on search submit
var formSubmitHandler = function (event) {
    console.log("submit handler called")
    event.preventDefault();
    
    let searchCity = searchCityEl.value.trim();
    console.log(searchCity)    
    
    if (searchCity) {
        localStorage.setItem(searchCity, searchCity)
        recentSearches(searchCity);
        clearPrevious();
        weatherUrlCall(searchCity);
    } else {
        console.log("error, no search value")
    }
};

// Sumbit Handler for triggering based on a recent search
function recentSubmitHandler(reSearchCity) {
    let searchCity = reSearchCity;   
    
    if (searchCity) {
        localStorage.setItem(searchCity, searchCity);
        clearPrevious();
        weatherUrlCall(searchCity);
    } else {
        console.log("error, no search value")
    }
};

// Adds new search term to Recent Searches list
function recentSearches(searchCity) {
    var newSearchResult = localStorage.getItem(searchCity)

    var newResultEl = document.createElement('button')
    var saveSearchesEl = document.querySelector('#saved-searches')
    newResultEl.setAttribute("value", searchCity)
    newResultEl.setAttribute("class", "btn btn-primary w-100 mt-1")
    newResultEl.textContent = newSearchResult
    saveSearchesEl.append(newResultEl)
}

// Clears previous weather data before displaying new data
function clearPrevious() {
    $('.current-item').remove();
    $('img').remove();
    $('.card-title').empty();
    $('.forecast-item').remove();
}

// Calls the Open Weather Map API based on City name, outputs latitude and longitude for more in-depth data
function weatherUrlCall (city) {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
    .then(function (response) {
        if (!response.ok) {
            throw new Error('response not okay')
        }
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        if (data.legnth === 0) {
            console.log('no results')
        } else {
            let cityLat = data.coord.lat
            let cityLon = data.coord.lon
            lat = cityLat
            lon = cityLon
            city = data.name
            oneCallUrlCall(lat,lon,city);
        }
    })
};

// Calls the API again using latitude and longitude, returns more data than available just on city name
function oneCallUrlCall (lat,lon,city) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${apiKey}&units=imperial`

    fetch(apiUrl)
    .then(function (response) {
        if (!response.ok) {
            throw new Error('response not okay')
        }
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        if (data.legnth === 0) {
            console.log('no results')
        } else {
            for (let i = 0; i < 6; i++) {
                var date = data.daily[i].dt
                var conditionIcon = data.daily[i].weather[0].icon
                var temp = data.daily[i].temp.day
                var wind = data.daily[i].wind_speed
                var humidity = data.daily[i].humidity
                var uvi = data.daily[i].uvi
                
                var reformatDate = date * 1000
                reformatDate = moment(reformatDate).format("MM/DD/YYYY")

                if (i === 0) {
                    printCurrent(reformatDate,conditionIcon,temp,wind,humidity,uvi,city)                    
                } else {                  
                    printForecast(i,reformatDate,conditionIcon,temp,wind,humidity,city)
                }
            }
        }
    })
}

// Prints current weather conditions to the primary page element (Current Weather)
function printCurrent(reformatDate,conditionIcon,temp,wind,humidity,uvi,city) {
    let currentSituationEl = document.querySelector('#currentResponse')
    let currentCityDateEl = document.querySelector('#current-citydate')

    let currentConditionEl = document.createElement('img')
    let currentTempEl = document.createElement('p')
    let currentWindEl = document.createElement('p')
    let currentHumidityEl = document.createElement('p')
    let currentUviEl = document.createElement('p')

    currentConditionEl.setAttribute('id', 'current-condition')
    currentConditionEl.setAttribute('src', `http://openweathermap.org/img/wn/${conditionIcon}@2x.png`)
    currentTempEl.setAttribute('id', 'current-temp')
    currentWindEl.setAttribute('id', 'current-wind')
    currentHumidityEl.setAttribute('id', 'current-humidity')
    currentUviEl.setAttribute('id', 'current-uvi')
    
    currentConditionEl.setAttribute('class', `current-item`)
    currentTempEl.setAttribute('class', `current-item`)
    currentWindEl.setAttribute('class', `current-item`)
    currentHumidityEl.setAttribute('class', `current-item`)
    currentUviEl.setAttribute('class', 'current-item uvi')

    if (uvi <= 2) {
        currentUviEl.setAttribute('style', 'background-color: green; display: inline-block')
    } else if (uvi <= 5) {
        currentUviEl.setAttribute('style', 'background-color: yellow; display: inline-block')
    } else {
        currentUviEl.setAttribute('style', 'background-color: red; display: inline-block')
    }
    
    let currentCityDate = `${city} ${reformatDate}`
    let currentTemp = `Temp:  ${temp}° F`
    let currentWind = `Wind Speed: ${wind} mph`
    let currentHumidity = `Humidity: ${humidity}%`
    let currentUvi = `UVI: ${uvi}`
    
    currentCityDateEl.textContent = currentCityDate
    currentTempEl.textContent = currentTemp
    currentWindEl.textContent = currentWind
    currentHumidityEl.textContent = currentHumidity
    currentUviEl.textContent = currentUvi
    
    currentSituationEl.append(currentConditionEl)
    currentSituationEl.append(currentTempEl)
    currentSituationEl.append(currentWindEl)
    currentSituationEl.append(currentHumidityEl)
    currentSituationEl.append(currentUviEl)
}

// Prints future weather data to each day of the 5-Day Forecast
function printForecast(i,reformatDate,conditionIcon,temp,wind,humidity,city) {

    let forecastSituationEl = document.querySelector(`#forecastCard${i}`)
    let forecastCityDateEl = document.querySelector(`#forecastDate${i}`)

    let forecastConditionEl = document.createElement('img')
    let forecastTempEl = document.createElement('p')
    let forecastWindEl = document.createElement('p')
    let forecastHumidityEl = document.createElement('p')

    forecastConditionEl.setAttribute('id', `forecast-condition${i}`)
    forecastConditionEl.setAttribute('src', `http://openweathermap.org/img/wn/${conditionIcon}@2x.png`)
    forecastTempEl.setAttribute('id', `forecast-temp${i}`)
    forecastWindEl.setAttribute('id', `forecast-wind${i}`)
    forecastHumidityEl.setAttribute('id', `forecast-humidity${i}`)

    forecastConditionEl.setAttribute('class', `forecast-item`)
    forecastConditionEl.setAttribute('class', `forecast-item`)
    forecastTempEl.setAttribute('class', `forecast-item`)
    forecastWindEl.setAttribute('class', `forecast-item`)
    forecastHumidityEl.setAttribute('class', `forecast-item`)
    
    let forecastCityDate = `${city} ${reformatDate}`
    let forecastTemp = `Temp:  ${temp}° F`
    let forecastWind = `Wind Speed: ${wind} mph`
    let forecastHumidity = `Humidity: ${humidity}%`
    
    forecastCityDateEl.textContent = forecastCityDate
    forecastTempEl.textContent = forecastTemp
    forecastWindEl.textContent = forecastWind
    forecastHumidityEl.textContent = forecastHumidity
    
    forecastSituationEl.append(forecastConditionEl)
    forecastSituationEl.append(forecastTempEl)
    forecastSituationEl.append(forecastWindEl)
    forecastSituationEl.append(forecastHumidityEl)
}

// Event Listener for new searches
searchFormEl.addEventListener("submit", formSubmitHandler);

// Event Listener for re-searching previous searches
$('#saved-searches').on('click', '.btn', function () {
    recentSubmitHandler($(this).text())
})