import {propositionModule} from './propositions.js';
import {locationModule} from './getlocation.js';
import {meteoModule} from './meteo.js';

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
    inputFormElem.addEventListener('keyup', app.handleHitKeyboardLetters);

    // Ajout ecouteur sur click dans la proposition des villes
    // propositionElem.addEventListener('click', app.handleClickOnCityProposition);
  },
  handleOnSubmitForm: async function (event){
    event.preventDefault();
    const formElem = event.currentTarget;
    const formData = new FormData(formElem);
    // const citySearch = formData.get('city');
    const codeInsee = formData.get('code');
    console.log(codeInsee)
    const objLocation = await locationModule.getLocationCoord(codeInsee);
    const dataApi = await meteoModule.getData(objLocation.long,objLocation.lat);
    // console.log(dataApi);

    // on vide les datas de la meteo avant d'en demander de nouveau
    const meteoContentElem = document.querySelector('.meteo-content');
    if(meteoContentElem){
      meteoContentElem.remove();
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
    const appContainerAside = document.querySelector('.container .aside');
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

    cityElement.textContent = `${dataLocation.name}`
    // paysElement.textContent = `Pays : ${dataLocation.country}`
    // regionElement.textContent = `Region : ${dataLocation.region}`
    humidityElement.textContent = `Taux d'Humidité : ${dataValue.dataseries[0].rh2m}%`
    // precipElement.textContent = `Precipitation : ${meteoModule.getPrecipitation(dataValue.dataseries[0].prec_type)}`
    temperatureElement.textContent = `Temperature : ${dataValue.dataseries[0].temp2m} C°`
    wind_dirElement.textContent = `Direction du vent : ${meteoModule.getWindDirection(dataValue.dataseries[0].wind10m.direction)}`
    wind_speedElement.textContent = `Vitesse du vent : ${dataValue.dataseries[0].wind10m.speed}`

    appContainerAside.append(cloneTemplate);
  },

  async handleHitKeyboardLetters(event){
    // console.log(event.currentTarget);
    // console.log(event.currentTarget.value);

    const data = await locationModule.getLocationCompletion(event.currentTarget.value);
    propositionModule.createPropositionsInDOM(data);
  },  
}

app.init();