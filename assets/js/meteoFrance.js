export const meteoFranceModule = {
  getData: async function (longitude,lattitude){
    const query = `https://api.open-meteo.com/v1/meteofrance?latitude=44.93&longitude=4.91&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,snowfall,weathercode,windspeed_10m,winddirection_10m&current_weather=true&timezone=Europe%2FBerlin`
    try {
      const httpResponse = await fetch(query);
      const data = await httpResponse.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  getLocalTimeCurrentData: async function (longitude,lattitude){
    const query = `https://api.open-meteo.com/v1/meteofrance?latitude=${lattitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,snowfall,weathercode,windspeed_10m,winddirection_10m&current_weather=true&timezone=Europe%2FBerlin`
    try {
      const httpResponse = await fetch(query);
      const data = await httpResponse.json();
      const currentWeather = data.current_weather;
      const indexOfCurrentTime = data.hourly.time.findIndex(hourlyTime => hourlyTime === currentWeather.time);

      const imgMeteo = {
        sunny: './assets/img/ph_sun.svg',
        cloudy: './assets/img/carbon_cloudy.svg',
        rainny: './assets/img/carbon_rain-heavy.svg',
        snowy: './assets/img/ph_cloud-snow-light.svg',
        cloudSunny: './assets/img/ph_cloud-sun-thin.svg',
      }

      const wmoTableTrad = {
        sunny:[...Array(3).keys()],
        cloudy:[...Array(9).keys()].map(e => e + 4),
        rainny:[...Array(20).keys()].map(e => e + 50),
        snowy:[...Array(10).keys()].map(e => e + 70),
        cloudSunny:[3],
      }

      Object.keys(wmoTableTrad).forEach((property, i, array) => {
        if (wmoTableTrad[property].some(e => e === currentWeather.weathercode)) {
          currentWeather.imgMeteo = imgMeteo[property];
        }
      })
      if(!currentWeather.imgMeteo) currentWeather.imgMeteo = './assets/img/ph_sun.svg';

      Object.keys(data.hourly).forEach(property => currentWeather[property] = data.hourly[property][indexOfCurrentTime]);

      return currentWeather;
    } catch (error) {
      console.log(error);
    }
  },
  getPrecipitation: function (prec_type){
    const meaning = {
      "snow": "Snow",
      "rain": "Rain",
      "frzr": "Freezing rain",
      "icep": "Ice pellets",
      "none": "None",
    }

    const trad = {
      "Snow": "Neige",
      "Rain": "Pluie",
      "Freezing rain": "Pluie verglassante",
      "Ice pellets": "Grêle",
      "None": "Aucune",
    }

    return trad[meaning[prec_type]];
  },
  getWindDirection: function (direction){
    const meaning = {
      "N":"North",
      "NE":"North-East",
      "E":"East",
      "SE":"South-East",
      "S":"South",
      "SW":"South-West",
      "W":"West",
      "NW":"North-West",
    }

    const trad = {
      "North": "Nord",
      "North-East": "Nord-Est",
      "East": "Est",
      "South-East": "Sud-Est",
      "South": "Sud",
      "South-West": "Sud-Ouest",
      "West": "Ouest",
      "North-West": "Nord-Ouest",
    }

    return trad[meaning[direction]];
  }
}