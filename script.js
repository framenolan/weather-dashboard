var searchFormEl = document.querySelector('#city-search-form');
var searchCityEl = document.querySelector("#city-search-value");

console.log(searchFormEl)
console.log(searchCityEl)

var apiKey = "71a0527b60357e324a7126bf56e7c80b"
var today = moment();
console.log(today.format("MM/DD/YYYY"))
var city = "Seattle"
// var lat = 44
// var lon = -122.33

// var oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${apiKey}&units=imperial`
var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`



// Form Submit Handler for triggering search function on search submit
var formSubmitHandler = function (event) {
    console.log("submit handler called")
    event.preventDefault();
    
    var searchCity = searchCityEl.value.trim();
    console.log(searchCity)    
    
    if (searchCity) {
        weatherUrlCall(searchCity)
    } else {
        console.log("error, no search value")
    }
};


function weatherUrlCall (city) {
    var city = city
    console.log("weatherURLCalled")
    console.log(city)

    fetch(weatherUrl)
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
            var cityLat = data.coord.lat
            console.log(cityLat)
            var cityLon = data.coord.lon
            console.log(cityLon)
            lat = cityLat
            lon = cityLon
            oneCallUrlCall(lat,lon);
        }
    })
};


function oneCallUrlCall (lat,lon) {
    console.log("oneCallUrl Called")
    console.log(lat)
    console.log(lon)

    var lat = lat
    var lon = lon    
    var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${apiKey}&units=imperial`

    console.log(lat)
    console.log(lon)
    console.log(apiUrl)

    fetch(apiUrl)
    .then(function (response) {
        console.log("fetch.then")

        if (!response.ok) {
            throw new Error('response not okay')
        }
        return response.json();
    })
    .then(function (data) {
        console.log("fetch.then.then")
        console.log(data);
        if (data.legnth === 0) {
            console.log('no results')
        } else {
            for (var i = 0; i < 6; i++) {
                var date = data.daily[i].dt
                var conditionIcon = data.daily[i].weather[0].icon
                var temp = data.daily[i].temp.day
                var wind = data.daily[i].wind_speed
                var humidity = data.daily[i].humidity
                var uvi = data.daily[i].uvi
                
                var reformatDate = date * 1000
                reformatDate = moment(reformatDate).format("MM/DD/YYYY")
                
                
                if (i === 0) {
                    // Current condition data pulled here

                    // reformat

                    console.log(reformatDate)
                    console.log(conditionIcon)
                    console.log(temp)
                    console.log(wind)
                    console.log(humidity)
                    console.log(uvi)

                    // function to printCurrent(i)



                } else {
                    // Pull 5 day forecast data points here
                    console.log(reformatDate)
                    console.log(conditionIcon)
                    console.log(temp)
                    console.log(wind)
                    console.log(humidity)
                    // function to printForecast(i)

                }
            }
        }
    })
}


// function printCurrent(i) {

// }

// function printForecast(i) {

// }


searchFormEl.addEventListener("submit", formSubmitHandler);








// var currentResponse = document.getElementById("currentResponse")
// var currentCity = document.getElementById("currentCity")


// // from rewatching class video on fetch requests
// // Current Weather
// function currentWeather(city)
// fetch(requestUrl).then(function(response) {
    //         return response.json()
    //     }).then(function(readableData) {
        //             console.log(readableData)
//             console.log(moment().format("MM/DD/YYYY"))
//             console.log("temp ",readableData.current.temp)
//             console.log("wind speed ",readableData.current.wind_gust)
//             console.log("humidity ",readableData.current.humidity,"%")
//             console.log("UVI ",readableData.current.uvi)
//         })

// code structure inspired by Chuan
// function currentWeather(city) {
    
//     // function to pull lat/lon from city and fetch onecall
//     // oneCall(city);
    
//     console.log('currentWeather running')
//     fetch(oneCallUrl)
//     .then(function (response) {
//         if (!response.ok) {
//             throw new Error('response not okay')
//         }
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//         var cityLat = data.coord.lat
//         console.log(cityLat)
//         var cityLon = data.coord.lon
//         console.log(cityLon)
//         lat = cityLat
//         lon = cityLon
//         if (data.legnth === 0) {
//             console.log('no results')
//         } else {
//             printCurrentWeather(data);
//             printUvi(oneCallUrl)
//             printConditions(data);
//         }
//     })
// }  

// function oneCall(city) {
    
    
    //     fetch(oneCallUrl)
    //     .then(function (response) {
        //         if (!response.ok) {
            //             throw new Error('response not okay')
            //         }
            //         return response.json
            //     })
            //     .then(function (data) {
                //         console.log(data);
                
                //     })
                
                // }
                
                
// UVI needs to come from a oneCall, which needs lat/lon
// function printCurrentWeather(oneCallUrl) {
//     today = today.format("MM/DD/YYYY");
//     console.log(currentWeather)
//     console.log(today)
    
//     var currentSituationEl = document.querySelector('#currentResponse')
    
//     var currentCity = document.querySelector('#currentCity')
//     var currentTempEl = document.createElement('p')
//     var currentWindEl = document.createElement('p')
//     var currentHumidityEl = document.createElement('p')
//     // var currentUviEl = document.createElement('p')
    
//     var currentTemp = `Temp:  ${currentWeather.main.temp}° F`
//     console.log(currentTemp)
//     var currentWind = `Wind Speed: ${currentWeather.wind.speed} mph`
//     console.log(currentWind)
//     var currentHumidity = `Humidity: ${currentWeather.main.humidity}%`
//     console.log(currentHumidity)
//     // var currentUvi = `UVI: ${currentWeather.current.uvi}`
//     // console.log(currentUvi)
                    
//     currentTempEl.setAttribute('id', 'p-temp')
//     currentWindEl.setAttribute('id', 'p-wind')
//     currentHumidityEl.setAttribute('id', 'p-humidity')
//     // currentUviEl.setAttribute('id', 'p-uvi')
    
//     currentCity.textContent = currentSituation
    
//     currentTempEl.textContent = currentTemp
//     currentWindEl.textContent = currentWind
//     currentHumidityEl.textContent = currentHumidity
//     // currentUviEl.textContent = currentUvi
    
//     currentSituationEl.append(currentCity)
//     currentSituationEl.append(currentTempEl)
//     currentSituationEl.append(currentWindEl)
//     currentSituationEl.append(currentHumidityEl)
//     // currentSituationEl.append(currentUviEl)
    
//     console.log("done")
// }

// function printConditions(currentWeather) {
//     var icon = currentWeather.weather[0].icon
//     console.log(icon)
    
//     var currentSituation = `${city} ${today} ${icon}`
//     console.log(currentSituation)
    
//     // URL for icon - 10d is the condition id code
//     // http://openweathermap.org/img/wn/${icon}@2x.png
// }

// function printUvi(oneCallUrl) {
//     fetch(oneCallUrl)
//     .then(function (response) {
//         if (!response.ok) {
//             throw new Error('response not okay')
//         }
//         return response.json();
//     })
//     .then(function (data) {
        
//     })
// }





// // Save Current Search to Recent Searches
// var recentCitiesEl = document.createElement("div")


// // 5 Day Forecast
// // fetch(requestUrl).then(function(response) {
    // //     // var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${apiKey}&units=imperial`
    // //     return response.json()
    // // }).then(function(readableData) {
        // //     console.log(readableData)
        // //     console.log("temp ",readableData.current.temp)
        // //     console.log("wind speed ",readableData.current.wind_gust)
        // //     console.log("humidity ",readableData.current.humidity,"%")
        // //     console.log("UVI ",readableData.current.uvi)
        // //     for (var i = 0; i < readableData.daily.length; i++) {
            // //         var forecastBox = document.getElementsByClassName("five-day-box")
            
            // //         var forecastEl = document.createElement(`div`)
            
            // //         var forecastTag = `#forecast${i}`
            // //         var dateEl = document.getElementById(forecastTag)
            // //         console.log(forecastTag)
            // //         console.log(dateEl)
            // //         var conditionEl = document.createElement("p")
            // //         var tempEl = document.createElement("p")
            // //         var windEl = document.createElement("p")
            // //         var humidityEl = document.createElement("p")
            
            // //         // var dateEl = document.createElement("h5")
            // //         // var conditionEl = document.createElement("p")
            // //         // var tempEl = document.createElement("p")
            // //         // var windEl = document.createElement("p")
            // //         // var humidityEl = document.createElement("p")
            
            // //         // forecastEl.setAttribute("id", `card${i}`);
            // //         // // forecastEl.setAttribute("class", "five-day-card")
            // //         // dateEl.setAttribute("id", `date${i}`);
            // //         // conditionEl.setAttribute("id", `condition${i}`);
            // //         // tempEl.setAttribute("id", `temp${i}`);
            // //         // windEl.setAttribute("id", `wind${i}`);
            // //         // humidityEl.setAttribute("id", `humidity${i}`);
            
            // //         // dateEl.textContent = `${i}`;
            // //         // conditionEl.textContent = `Condition: ${i}`;
            // //         // tempEl.textContent = `Temperature: ${i}`;
            // //         // windEl.textContent = `Wind Speed: ${i}`;
            // //         // humidityEl.textContent = `Humidity: ${i}%`;
            // //         console.log(conditionEl)
            // //         console.log(forecastEl)
            
            // //         // forecastBox.appendChild(forecastEl)
            
            // //         forecastEl.appendChild(conditionEl)
            // //         forecastEl.appendChild(tempEl)
            // //         forecastEl.appendChild(windEl)
            // //         forecastEl.appendChild(humidityEl)
            
            // //         console.log("i ",i)
            // //         console.log(i,"date",readableData.daily[i].dt)
            // //         console.log(i,"temp",readableData.daily[i].temp.day)
            
            // //         console.log(i,"wind",readableData.daily[i].wind_gust)
            // //         console.log(i,"humidity",readableData.daily[i].humidity)
            // //         console.log(i,"condition",readableData.daily[i].weather.description)
            // //         console.log(i,"condition id",readableData.daily[i].weather.id)
            // //     };
            // // })
            
            
            // // // Search Results
            // // // Current Weather
            // // //     City Name
            // // //     Date of Weather
            // // //     Icon representation of the conditions
            // // //     Temperature
            // // //     Humidity
            // // //     Wind Speed
            // // //     UV Index
            // // //         Presented with color that indicateds (favorable/moderate/severe)
            
            // // var fnGetWeather = function getWeater(city) {
                // //     var requestCityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
                // //     console.log(requestCityUrl)
                // // }
                
                // // console.log()
                // // //     // no idea what I'm doing with this portion
                // // //     fetch(requestCityUrl)
                // // //         .then(function (response) {
                    // // //             if (response.ok) {
                        // // //                 console.log(response.json())
                        // // //                 };
                        // // //             }
                        // // //         .then(function (data) {
                            // // //             console.log(data)
                // // //         }
                // // // }
                
                
                
                // // // 5 Day Forecast
                // // //     Date
                // // //     Icon of conditions
                // // //     Temperature
                // // //     Wind Speed
                // // //     Humidity
                
                // // // When Click on a city in the search history
                // // //     shows current and 5day Results
                
                
                // // console.log(searchFormEl)
                // // console.log(searchFormEl)
                
                // // Weather Dashboard Structure
                
                // // Form Inputs
                // //     City
                // //     Search Button
                // //     Save to Local Storage
                
                
                // // // Notes from Brian to clear cache if outdated
                // // // if (moment(storedForecast.date)).isSame(new Date(), ‘day’)) {
                    // // //     renderForecast(storedForecast)