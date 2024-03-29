

const apiUrl = "https://geocoding-api.open-meteo.com/v1/search?name=";
const apiUrlAdd = "&count=1&language=en&format=json"

const apiUrlwithLatitudeAndLongitude = "https://api.open-meteo.com/v1/forecast?";
const apiUrlwithLatitudeAndLongitudeAdd = "&current=temperature_2m,relative_humidity_2m,is_day,rain,showers,snowfall,cloud_cover,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m";//"https://api.open-meteo.com/v1/forecast";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const nextpage = document.querySelector(".nextpage button");

window.addEventListener('load', () => {
    let params = (new URL(document.location)).searchParams; 
        console.log(params.get("cityname"));
        if (params.get("cityname") != null){
            document.querySelector(".search input").value = params.get("cityname");
            checkWeather(params.get("cityname"));
        }

//         if (sessionStorage.getItem("data") != undefined){
//         var city = sessionStorage.getItem("cityname");
//         var data = sessionStorage.getItem("data")
//         console.log(data);
//         document.querySelector(".search input").value = city;

//         document.querySelector(".city").innerHTML = city;
//         document.querySelector(".temp").innerHTML = Math.round(data.current.temperature_2m) + " C";
//         document.querySelector(".humidity").innerHTML = data.current.relative_humidity_2m + " %";
//         document.querySelector(".wind").innerHTML = data.current.wind_speed_10m + " km/h";
    
//         if(data.current.cloud_cover > 20){
//             weatherIcon.src = "images/clouds.png";
//         } 
//         else if(data.current.rain == 1){
//             weatherIcon.src = "images/rain.png";
//         } 
//         else if(data.current.cloud_cover < 20){
//             weatherIcon.src = "images/clear.png";
//         } 
//         else if(data.current.snowfall == 1){
//             weatherIcon.src = "images/snow.png";
//         }
//     }else{ 
//         document.querySelector(".weather").style.display = "block";
//     }
});



async function checkWeather(city){
    const responseAdd = await fetch(apiUrl + city + apiUrlAdd);
    var dataAdd = await responseAdd.json();
    if(dataAdd.results == undefined){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }else{        
        let params = (new URL(document.location)).searchParams; 
        console.log(params.get("cityname"));
        //if (params.get("cityname") == null){
            sessionStorage.setItem("cityname", city);
            sessionStorage.setItem("latitude", Math.round(dataAdd.results[0].latitude * 100) / 100);
            sessionStorage.setItem("longitude", Math.round(dataAdd.results[0].longitude * 100) / 100);
            const response = await fetch(apiUrlwithLatitudeAndLongitude+`latitude=${sessionStorage.getItem('latitude')}`+`&longitude=${sessionStorage.getItem('longitude')}`+apiUrlwithLatitudeAndLongitudeAdd);
        
            var data = await response.json();  
            //sessionStorage.setItem("data", data);
            var city = dataAdd.results[0].name;
            sessionStorage.setItem("temperature", Math.round(data.current.temperature_2m));
            sessionStorage.setItem("humidity", data.current.relative_humidity_2m);
            sessionStorage.setItem("wind", data.current.wind_speed_10m); 
            sessionStorage.setItem("cityname", dataAdd.results[0].name);
            sessionStorage.setItem("temperature", Math.round(data.current.temperature_2m));
            sessionStorage.setItem("humidity", data.current.relative_humidity_2m);
            sessionStorage.setItem("wind", data.current.wind_speed_10m);   
        //}else{
        //    var data = sessionStorage.getItem(data);
        //};
        console.log(data);

        document.querySelector(".city").innerHTML = dataAdd.results[0].name;
        document.querySelector(".temp").innerHTML = Math.round(data.current.temperature_2m) + " C";
        document.querySelector(".humidity").innerHTML = data.current.relative_humidity_2m + " %";
        document.querySelector(".wind").innerHTML = data.current.wind_speed_10m + " km/h";
    
        if(data.current.cloud_cover > 40){
            weatherIcon.src = "images/clouds.png";
        } 
        else if(data.current.rain == 1){
            weatherIcon.src = "images/rain.png";
        } 
        else if(data.current.cloud_cover < 40){
            weatherIcon.src = "images/clear.png";
        } 
        else if(data.current.snowfall == 1){
            weatherIcon.src = "images/snow.png";
        } 
        document.querySelector(".weather").style.display = "block";
    }

    
}
searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
});

nextpage.addEventListener("click", ()=>{
    window.location.href = 'index_3day.html'+`?latitude=${sessionStorage.getItem('latitude')}`+`&longitude=${sessionStorage.getItem('longitude')}`+`cityname=${sessionStorage.getItem('cityname')}`;
});

searchBox.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { 
        checkWeather(searchBox.value);
    }
});

