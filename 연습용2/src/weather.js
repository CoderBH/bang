const API_KEY = "6a65c6b1f085f9eff5a014f7c6d746a8";
const COOREDS = 'coords';
const weather = document.querySelector(".js-weather");

function getWeather(lat, lng){
    fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();            
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COOREDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude =position.coords.latitude;
    const longitude =position.coords.longitude;
    const coordsObj ={
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}
function handleGeoError(){
    console.log("cant access geo location");
}


function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError);
}

function loadCoords(){ 
    const loadedCoords = localStorage.getItem(COOREDS);
    if(loadedCoords === null){
        askForCoords();
    }
    else{
        const parsedCoords = JSON.parse(loadedCoords);
        console.log(loadedCoords);
        getWeather(parsedCoords.latitude,parsedCoords.longitude);
        
    }
}

function init(){
    loadCoords();
}
init();