export const meteoModule = {
  getData: async function (longitude,lattitude){
    console.log(longitude, lattitude)
    const query = `https://www.7timer.info/bin/astro.php?lon=${longitude}&lat=${lattitude}&ac=0&unit=metric&output=json&tzshift=1`
    // https://api.open-meteo.com/v1/meteofrance?latitude=44.93&longitude=4.91&hourly=temperature_2m
    // https://api.open-meteo.com/v1/meteofrance?latitude=44.93&longitude=4.91&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,snowfall,weathercode,windspeed_10m,winddirection_10m&current_weather=true&timezone=Europe%2FBerlin
    
    try {
      const httpResponse = await fetch(query);
      const data = await httpResponse.json();
      console.log(data);
      return data;
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