# Weather Dashboard

[Deployed Site](https://framenolan.github.io/weather-dashboard/)

## Table of Contents
* [Description](#description)
* [User Story](#user-story)
* [Acceptance Criteria](#acceptance-criteria)
* [My Notes](#my-notes)
* [Technologies](#technologies)
* [Images](#images)

## Description

This weather dashboard app allows users to search for a city and see the current day forecast for that city, as well as a 5-day forecast. Recent searches are also stored in local storage for quick reference. The app is connected to the Open Weather One Call API. The Bootstrap framework to build the structure of the page and expedite the styling. A for loop was used to pull 6 days worth of data and print them to the appropiate page location.

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

## Technologies
- HTML
- CSS
- JavaScript
- [OpenWeather One Call API](https://openweathermap.org/api/one-call-api)

## Image

![image](https://user-images.githubusercontent.com/101062909/163074096-bbe84009-397f-4d92-b002-dbf02a4b69c5.png)
