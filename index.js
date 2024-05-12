const apiKey = "8ea0c7bb4cf6668720584b76d8040381";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchbox = document.querySelector("#search-container input");
const searchButton = document.querySelector("#search-container button");
const weatherIcon = document.querySelector(".weather-icon");
const backgroundVideoTag = document.querySelector("#background-video")
const backgroundVideoSource = document.querySelector("#background-video-weather");

async function checkWeather(city){
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector("#city").innerHTML = "";
        document.querySelector("#temperature").innerHTML = "0°C";
        document.querySelector("#humidity-title").innerHTML = "0 %";
        document.querySelector("#wind-title").innerHTML = "0 km/h";
    } else {
        var data = await response.json();
        console.log(data);

        document.querySelector("#city").innerHTML = data.name;
        document.querySelector("#temperature").innerHTML = Math.round(data.main.temp)+ "°C";
        document.querySelector("#humidity-title").innerHTML = data.main.humidity + " %";
        document.querySelector("#wind-title").innerHTML = data.wind.speed + " km/h";

        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "./images/clouds.png"; 
            weatherIcon.alt = "Cloudy weather icon";
            backgroundVideoSource.src = "./videos/clouds.mp4"; 
            backgroundVideoTag.load();
        } else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "./images/clear.png" 
            weatherIcon.alt = "Clear weather icon"; 
            backgroundVideoSource.src = "./videos/clear.mp4"; 
            backgroundVideoTag.load();
        } else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "./images/rain.png" 
            weatherIcon.alt = "Rainy weather icon"; 
            backgroundVideoSource.src = "./videos/rain.mp4"; 
            backgroundVideoTag.load();
        } else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "./images/drizzle.png" 
            weatherIcon.alt = "Drizzle weather icon"; 
            backgroundVideoSource.src = "./videos/drizzel.mp4"; 
            backgroundVideoTag.load();
        } else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "./images/mist.png" 
            weatherIcon.alt = "Misty weather icon"; 
            backgroundVideoSource.src = "./videos/mist.mp4"; 
            backgroundVideoTag.load();
        }
        document.querySelector(".error").style.display = "none";
    }

}

checkWeather(searchbox.value);
searchButton.addEventListener("click", () => {
    checkWeather(searchbox.value);
})

searchbox.addEventListener("keypress", (event)=> {
    if(event.key === "Enter"){
        checkWeather(searchbox.value);
    }
})
searchbox.addEventListener("click", ()=> {
    searchbox.value = "";
})