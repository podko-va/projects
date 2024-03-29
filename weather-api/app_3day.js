const apiUrlwithLatitudeAndLongitude = "https://api.open-meteo.com/v1/forecast?";
const apiUrlwithLatitudeAndLongitudeAdd = "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,snowfall_sum,precipitation_probability_max&forecast_days=3";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const prevpage = document.querySelector(".prevpage button");

var latitude = sessionStorage.getItem("latitude");
var longitude = sessionStorage.getItem("longitude");
var city =  sessionStorage.getItem("cityname");

document.addEventListener("DOMContentLoaded", () => {
    if (sessionStorage.getItem("cityname") != undefined){

        document.querySelector(".search input").value = city;
        checkWeather(latitude,longitude);
    }
  });

async function checkWeather(latitude,longitude){
    const response = await fetch(apiUrlwithLatitudeAndLongitude+`latitude=${sessionStorage.getItem('latitude')}`+`&longitude=${sessionStorage.getItem('longitude')}`+apiUrlwithLatitudeAndLongitudeAdd);
    var data3day = await response.json();
    console.log(data3day);

    for (let i = 0; i < 3; i++) {    
        document.querySelector(".daytime"+i).innerHTML = data3day.daily.time[i];
        document.querySelector(".daytemp"+i).innerHTML = data3day.daily.temperature_2m_max[i] + " °C";
        document.querySelector(".nighttemp"+i).innerHTML = data3day.daily.temperature_2m_min[i] + " °C";
        
        weathercode = data3day.daily.weather_code[i];

        const weatherPict = document.querySelector(".weathercode"+i);
        if([2, 3].includes(weathercode)){
            weatherPict.src = "images/clouds.png";
        }   
        else if([61,63,65,66,67,80,81,82,95,96,99].includes(weathercode)){
            weatherPict.src = "images/rain.png";
        } 
        else if([45,48].includes(weathercode)){
            weatherIcon.src = "images/mist.png";
        }
        else if([0,1].includes(weathercode)){
            weatherPict.src = "images/clear.png";
        } 
        else if([51,53,55,56,57].includes(weathercode)){
            weatherPict.src = "images/drizzle.png";
        }
        else if([71, 73, 75, 77,85,86].includes(weathercode)){
            weatherPict.src = "images/snow.png";
        } 
        //document.querySelector(".weather").style.display = "block";
    }
}



prevpage.addEventListener("click", ()=>{
    window.location.href = 'index.html'+`?latitude=${sessionStorage.getItem('latitude')}`+`&longitude=${sessionStorage.getItem('longitude')}`+`&cityname=${sessionStorage.getItem('cityname')}`;
});



