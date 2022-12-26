const app = {
  init: function (){
    const mySubmitFormElement = document.querySelector('form');
    mySubmitFormElement.addEventListener('submit', app.handleOnSubmitForm);
  },
  handleOnSubmitForm: async function (event){
    event.preventDefault();
    console.log('test')
    const objLocation = await locationModule.getLocationCoord();
    const dataApi = await meteoModule.getData(objLocation.long,objLocation.lat);
    console.log(dataApi);

    const cityElement = document.querySelector('.city');
    cityElement.textContent = `Ville : ${objLocation.name}`
    const paysElement = document.querySelector('.pays');
    paysElement.textContent = `Pays : ${objLocation.country}`
    const regionElement = document.querySelector('.region');
    regionElement.textContent = `Region : ${objLocation.region}`
    const humidityElement = document.querySelector('.humidity');
    humidityElement.textContent = `Humidité : ${dataApi.dataseries[0].rh2m}%`
    const precipElement = document.querySelector('.precip');
    precipElement.textContent = `Precipitation : ${dataApi.dataseries[0].prec_type}`
    const temperatureElement = document.querySelector('.temperature');
    temperatureElement.textContent = `Temperature : ${dataApi.dataseries[0].temp2m}`
    // const feelslikeElement = document.querySelector('.feelslike');
    // feelslikeElement.textContent = `Ressenti : ${dataApi.dataseries[0].rh2m}`
    const wind_dirElement = document.querySelector('.wind_dir');
    wind_dirElement.textContent = `Direction du vent : ${dataApi.dataseries[0].wind10m.direction}`
    const wind_speedElement = document.querySelector('.wind_speed');
    wind_speedElement.textContent = `Vitesse du vent : ${dataApi.dataseries[0].wind10m.speed}`
  }
}

app.init()