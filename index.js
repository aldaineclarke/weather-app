"use strict";

const weather_root = document.querySelector(".weather-root");
const weather_data = document.querySelectorAll(".data-val");
const location_data = document.querySelectorAll(".loca")
const search_form = document.forms.searchLocation;
const weather_section = document.querySelector(".weather-data");
const welcome_section = document.querySelector(".welcome");
const video_bg = document.querySelector("#vid-bg");
video_bg.playbackRate = 0.5;
const API_KEY = ""//Define the API KEY 

search_form.addEventListener("submit",(event)=>{
    event.preventDefault();
    searchWeather(API_KEY, search_form.location.value);
    welcome_section.classList.add("remove");

    if(!weather_section.classList.contains("active")){
        weather_section.classList.add("active");
    }
})

function searchWeather(API_KEY,location){
    fetch(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${location}`).then((response)=> response.json()).then((json) => {
        weather_data.forEach((property)=>{
            if (property.id in json.current){
                property.innerText = json.current[property.id];
            }

        });
        location_data.forEach((property)=>{
            if (property.id in json.location){
                property.innerText = json.location[property.id];
            }
        })
        document.querySelector(".temp>span:nth-of-type(1)").innerText = json.current.temperature;
        document.querySelector(".feel >span:nth-of-type(1)").innerText = json.current.feelslike;
        document.querySelector("#weather_description").innerText = json.current.weather_descriptions[0];
        document.querySelector("#weather-icon").setAttribute("src", json.current.weather_icons[0]);

    }
    ).catch((error)=>console.log(error))
}
