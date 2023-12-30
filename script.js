const getLocName = () => {
  const displayDiv = document.querySelector("#current-display");
  const selector = document.querySelector("#selector");
  console.log(selector.value);
  //const locName = selector.value;
  // const displayDiv = document.querySelector("#current-display");

  //document.querySelector("#current-display").display = "block";

  selector.addEventListener("change", () => {
    console.log(displayDiv);
    // if ((selector.value = "defaultSelText")) {
    //  displayDiv.style.display = "none";
    // console.log(displayDiv);
    // }
    displayDiv.style.display = "block";
    const locName = selector.value;
    console.log(locName);
    getLatLon(locName);
  });
};

//if selector ==="Select your Mt. Hood destination" then hide "Current Conditions" and wipe other data

const getLatLon = (locName) => {
  const geoLocations = {
    hdSummit: {
      lat: 45.37360894794911,
      lon: -121.69590509616522,
    },
    tline: {
      lat: 45.33091330299956,
      lon: -121.71103339559102,
    },
    topPalmer: {
      lat: 45.35860136334849,
      lon: -121.70535335205159,
    },
    govy: {
      lat: 45.304428209815114,
      lon: -121.75376973280258,
    },
  };
  const coordinates = geoLocations[locName];
  const latit = coordinates.lat;
  const longi = coordinates.lon;

  console.log(latit, longi);
  fetchOWMWeather(latit, longi);
};

const fetchOWMWeather = (latit, longi) => {
  const owmApiKey = "";
  fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${latit}&lon=${longi}&units=imperial&exclude=hourly,daily,minutely&appid=${owmApiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      displayWeather(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const displayWeather = (data) => {
  const { temp, humidity, dew_point, clouds, wind_speed, wind_deg, wind_gust } =
    data.current;

  //const { description } = data.weather;
  document.querySelector("#current-temp").innerText = Math.round(temp) + " F";
  document.querySelector("#current-wind").innerText =
    "Current wind: " + Math.round(wind_speed) + " mph";
  document.querySelector("#current-gusts").innerText =
    "Gusting to " + Math.round(wind_gust) + " mph";
  document.querySelector("#current-clouds").innerText =
    "Cloud cover: " + clouds + "%";
};
