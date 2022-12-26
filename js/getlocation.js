const locationModule = {
  getLocationCoord: async function(){
    const citySearch = document.querySelector('input[type=text]').value;
    const api_key = 'e00bad965e81a8163f29b8aee621489f'
    const request = `http://api.weatherstack.com/current?access_key=${api_key}&query=${citySearch}`

    try {
      const httpResponse = await fetch(request);
      const data = await httpResponse.json()

      const returnObj = {
        "long" : data.location.lon,
        "lat" : data.location.lat,
        "name" : data.location.name,
        "country" : data.location.country,
        "region" : data.location.region,
      }
      return returnObj;
    } catch (error) {
      console.log(error);
    }
  }
}