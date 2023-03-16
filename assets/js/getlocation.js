export const locationModule = {
  getLocationCoord: async function(code){
    // const api_key = 'e00bad965e81a8163f29b8aee621489f'
    // const request = `http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`
    const request = `https://geo.api.gouv.fr/communes?code=${code}&format=geojson`

    try {
      const httpResponse = await fetch(request);
      const data = await httpResponse.json()

      // console.log(data);
      // console.log(Object.keys(data));
      // console.log(data['features']);
      
      const returnObj = {
        "long" : data.features[0].geometry.coordinates[0],
        "lat" : data.features[0].geometry.coordinates[1],
        "name" : data.features[0].properties.nom,
        "country" : 'France',
        "region" : await locationModule.getRegion(data.features[0].properties.codeRegion),
      }
      return returnObj;
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
  },
  getRegion: async function(regionCode){
    try {
      const httpResponse = await fetch(`https://geo.api.gouv.fr/regions/${regionCode}`);
      
      if(httpResponse.ok){
        const data = await httpResponse.json();

        return data.nom;
      }
    } catch (e) {
      console.log(e);
    }    
  }
}