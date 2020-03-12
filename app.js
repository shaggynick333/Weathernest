window.addEventListener("load", () => {
  let longi, lati;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let degreeSection = document.querySelector(".degree-section");
  let degreeSpan = document.querySelector(".degree-section span");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      longi = position.coords.longitude;
      lati = position.coords.latitude;
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/003a925fb689d17f5ec7fa95889bdf3a/${lati},${longi}`;
      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const { temperature, summary, icon } = data.currently;
          //populate frontend elements from the api
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          let celsius = (temperature - 32) * (5 / 9);
          //fetch icon
          setIcons(icon, document.querySelector(".icon"));
          //toggle celsius and farenheit
          degreeSection.addEventListener("click", () => {
            if (degreeSpan.textContent === "F") {
              degreeSpan.textContent = "C";
              temperatureDegree.textContent = celsius.toFixed(1);
            } else if (degreeSpan.textContent === "C") {
              degreeSpan.textContent = "F";
              temperatureDegree.textContent = temperature.toFixed(1);
            }
          });
        });
    });
  }
  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
