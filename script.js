const cityEl = document.getElementById("city-field");
const btnEl = document.getElementById("confirm-btn");
const cityHead = document.getElementById("city-heading");
const tempHead = document.getElementById("temp-heading");
const humidityHead = document.getElementById("humidity-heading");
const windHead = document.getElementById("wind-heading");
const tempCel = document.getElementById("temp-cel");
const tempFar = document.getElementById("temp-far");
const humidityValue = document.getElementById("humidity-value");
const windSpeed = document.getElementById("wind-speed");
const windDir = document.getElementById("wind-dir");
const windDegree = document.getElementById("wind-degree");
const conditionImg = document.getElementById("condition-img");
const conditionTxt = document.getElementById("condition-txt");

navigator.geolocation.getCurrentPosition(getLocationAuto);

function getLocationAuto(pos) {
  let cordinates = pos.coords
  fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${cordinates.latitude}&lon=${cordinates.longitude}&apiKey=ceffd8147cbf4ee1bed878e8729ed1a3`
    )
    .then((response) => response.json())
    .then((result) => {
      let city = result.features[0].properties.city
      fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
          "x-rapidapi-key": "d06597e9e2msh79753a6bd01ce6ap105686jsnf67fb43af5df",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          cityHead.innerHTML = data.location.name + ", " + data.location.country;
          tempHead.innerHTML = "Temprature";
          humidityHead.innerHTML = "Humidity";
          windHead.innerHTML = "Wind Info";
          tempCel.innerHTML = data.current.temp_c + " °C";
          tempFar.innerHTML = data.current.temp_f + " °F";
          humidityValue.innerHTML = data.current.humidity + "%";
          windSpeed.innerHTML = "Speed - " + data.current.wind_kph;
          windDir.innerHTML = "Direction - " + data.current.wind_dir;
          windDegree.innerHTML = "Degrees - " + data.current.wind_degree;
          conditionImg.src = data.current.condition.icon;
          conditionTxt.innerHTML = "(" + data.current.condition.text + ")";
  
          data.location.lat = 23;
          console.log(data.location.lat);
          console.log(data.location);
        });
    });
  }
  
  
if (cityEl !== "") {
  btnEl.addEventListener("click", () => {
    let cityName = cityEl.value;

    fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${cityName}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
        "x-rapidapi-key": "d06597e9e2msh79753a6bd01ce6ap105686jsnf67fb43af5df",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        cityHead.innerHTML = data.location.name + ", " + data.location.country;
        tempHead.innerHTML = "Temprature";
        humidityHead.innerHTML = "Humidity";
        windHead.innerHTML = "Wind Info";
        tempCel.innerHTML = data.current.temp_c + " °C";
        tempFar.innerHTML = data.current.temp_f + " °F";
        humidityValue.innerHTML = data.current.humidity + "%";
        windSpeed.innerHTML = "Speed - " + data.current.wind_kph;
        windDir.innerHTML = "Direction - " + data.current.wind_dir;
        windDegree.innerHTML = "Degrees - " + data.current.wind_degree;
        conditionImg.src = data.current.condition.icon;
        conditionTxt.innerHTML = "(" + data.current.condition.text + ")";

        data.location.lat = 23;
        console.log(data.location.lat);
        console.log(data.location);
      });
  });
}
