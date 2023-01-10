const app = {
  init: function (){
    app.loadListeners();
  },
  loadListeners: function (){
    // Ajout ecouteur sur la soumission du formulaire
    const mySubmitFormElement = document.querySelector('form');
    mySubmitFormElement.addEventListener('submit', app.handleOnSubmitForm);

    // Ajout ecouteur sur chaque lettres tappées pour proposer des lieux
    const inputFormElem = document.querySelector('form input[type="text"]');
    inputFormElem.addEventListener('keyup', app.handleHitKeyboardLetters)

    // Ajout ecouteur sur click dans la proposition des villes
    const propositionElem = document.querySelector('.input-proposition-container');
    propositionElem.addEventListener('click', app.handleClickOnCityProposition);
  },
  handleOnSubmitForm: async function (event){
    event.preventDefault();
    const formElem = event.currentTarget;
    const formData = new FormData(formElem);
    const citySearch = formData.get('city');
    const codeInsee = formData.get('code');
    console.log(codeInsee)
    const objLocation = await locationModule.getLocationCoord(codeInsee);
    const dataApi = await meteoModule.getData(objLocation.long,objLocation.lat);
    // console.log(dataApi);

    // on vide les datas de la meteo avant d'en demander de nouveau
    const meteoContentElem = document.querySelector('.meteo-content');
    if(meteoContentElem){
      meteoContentElem.textContent = '';
    }

    app.makeDataInDOM(objLocation, dataApi);

    formElem.reset()
  },
  /**
   * 
   * @param {{name:String, country: String, region: String}} dataLocation 
   * @param {{dataseries: Array}} dataValue 
   */
  makeDataInDOM(dataLocation, dataValue){
    const appContainer = document.querySelector('.container');
    const templateMeteo = document.getElementById('meteo');
    const cloneTemplate = document.importNode(templateMeteo.content, true);

    const cityElement = cloneTemplate.querySelector('.city');
    const paysElement = cloneTemplate.querySelector('.pays');
    const regionElement = cloneTemplate.querySelector('.region');
    const humidityElement = cloneTemplate.querySelector('.humidity');
    const precipElement = cloneTemplate.querySelector('.precip');
    const temperatureElement = cloneTemplate.querySelector('.temperature');
    const wind_dirElement = cloneTemplate.querySelector('.wind_dir');
    const wind_speedElement = cloneTemplate.querySelector('.wind_speed');

    cityElement.textContent = `Ville : ${dataLocation.name}`
    paysElement.textContent = `Pays : ${dataLocation.country}`
    regionElement.textContent = `Region : ${dataLocation.region}`
    humidityElement.textContent = `Humidité : ${dataValue.dataseries[0].rh2m}%`
    precipElement.textContent = `Precipitation : ${dataValue.dataseries[0].prec_type}`
    temperatureElement.textContent = `Temperature : ${dataValue.dataseries[0].temp2m}`
    wind_dirElement.textContent = `Direction du vent : ${dataValue.dataseries[0].wind10m.direction}`
    wind_speedElement.textContent = `Vitesse du vent : ${dataValue.dataseries[0].wind10m.speed}`

    appContainer.append(cloneTemplate);
  },

  handleHitKeyboardLetters(event){
    // console.log(event.currentTarget);
    // console.log(event.currentTarget.value);

    locationModule.getLocationCompletion(event.currentTarget.value)
  },
  handleClickOnCityProposition(event){
    const cityElem = event.target;
    const city = cityElem.dataset.city;
    const codeInsee = cityElem.dataset.codeinsee;

    const inputCity = cityElem.closest('#city-form').querySelector('input[name=city]');
    const inputCode = cityElem.closest('#city-form').querySelector('input[name=code]');
    inputCity.value = city;
    inputCode.value = codeInsee;
  }
}

app.init();