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
    updateImage(locName);

    // getLatLon(locName);
  });
};

const updateImage = (locName) => {
  const mainPhotos = {
    hdSummit: "IMG_6678.jpeg",
    tline: "IMG_2113_TLPk.jpeg",
    govy: "IMG_7193.jpeg",
    topPalmer: "IMG_6650.jpeg",
    triMor: "IMG_5934.jpeg",
    devilsK: "IMG_6834.jpeg",
    hogsback: "IMG_0075.jpeg",
    oldChute: "IMG_3029.jpeg",
    westRim: "IMG_2589.jpeg",
  };
  const selPhoto = mainPhotos[locName];
  console.log(selPhoto);
  document.querySelector(
    ".topcontainer"
  ).style.backgroundImage = `url(./images/${selPhoto})`;
  getLatLon(locName);
};

//if selector ==="Select your Mt. Hood destination" then hide "Current Conditions" and wipe other data

const getLatLon = (locName) => {
  const geoLocations = {
    hdSummit: {
      lat: 45.37360894794911,
      lon: -121.69590509616522,
      elev: 11249,
    },
    tline: {
      lat: 45.33091330299956,
      lon: -121.71103339559102,
      elev: 6000,
    },

    topPalmer: {
      lat: 45.35860136334849,
      lon: -121.70535335205159,
      elev: 8500,
    },

    triMor: {
      lat: 45.36382,
      lon: -121.69901,
      elev: 9310,
    },

    devilsK: {
      lat: 45.36953130314702,
      lon: -121.69846712562166,
      elev: 10260,
    },
    hogsback: {
      lat: 45.37067698513559,
      lon: -121.69911083249116,
      elev: 10465,
    },

    govy: {
      lat: 45.304428209815114,
      lon: -121.75376973280258,
      elev: 3980,
    },
  };
  const coordinates = geoLocations[locName];
  const latit = coordinates.lat;
  const longi = coordinates.lon;
  const elevation = coordinates.elev;

  console.log(latit, longi);
  fetchOWMWeather(latit, longi);
};

const fetchOWMWeather = (latit, longi) => {
  const owmApiKey = "697540058e16c0ac58f0a5c25c66f76a";
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

  console.log(elevation);

  //const { description } = data.weather;
  document.querySelector("#elevation").innerText = "Elevation: " + elevation;
  document.querySelector("#current-temp").innerText = Math.round(temp) + " F";
  document.querySelector("#current-wind").innerText =
    "Current wind: " + Math.round(wind_speed) + " mph";
  document.querySelector("#current-gusts").innerText =
    "Gusting to " + Math.round(wind_gust) + " mph";
  document.querySelector("#current-clouds").innerText =
    "Cloud cover: " + clouds + "%";
};
