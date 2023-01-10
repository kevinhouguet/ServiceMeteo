const locationModule = {
  getLocationCoord: async function(code){
    // const api_key = 'e00bad965e81a8163f29b8aee621489f'
    // const request = `http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`
    const request = `https://geo.api.gouv.fr/communes?code=${code}&format=geojson`

    try {
      const httpResponse = await fetch(request);
      const data = await httpResponse.json()

      console.log(data);
      console.log(Object.keys(data));
      console.log(data['features']);

      // const returnObj = {
      //   "long" : data.location.lon,
      //   "lat" : data.location.lat,
      //   "name" : data.location.name,
      //   "country" : 'France',
      //   "region" : data.location.region,
      // }

      // const returnObj = {
      //   "long" : data.features.geometry.coordinates[0],
      //   "lat" : data.features.geometry.coordinates[1],
      //   "name" : data.features.properties.nom,
      //   "country" : 'France',
      //   "region" :data.features.properties.codeRegion,
      // }
      // return returnObj;
    } catch (error) {
      console.log(error);
    }
  },

  getLocationCompletion: async function(searchKey){
    const request = `https://geo.api.gouv.fr/communes?nom=${searchKey}&limit=5`;

    try {
      const httpResponse = await fetch(request);
      const data = await httpResponse.json();

      // console.log(data)
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}