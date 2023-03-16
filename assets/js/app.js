import {propositionModule} from './propositions.js';
import {locationModule} from './getlocation.js';
import {meteoModule} from './meteo.js';
import { meteoFranceModule } from './meteoFrance.js';

const app = {
  init: function (){
    app.loadListeners();
    (async () => {
      console.log(await meteoFranceModule.getLocalTimeCurrentData(4.91, 44.93));

    })()
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
    const dataMeteo = await meteoFranceModule.getLocalTimeCurrentData(objLocation.long,objLocation.lat);
    // console.log(dataMeteo);

    // on vide les datas de la meteo avant d'en demander de nouveau
    const meteoContentElem = document.querySelector('.meteo-content');
    if(meteoContentElem){
      meteoContentElem.remove();
    }

    app.makeDataInDOM(objLocation, dataMeteo);

    formElem.reset()
  },
  /**
   * 
   * @param {{name:String, country: String, region: String}} dataLocation 
   * @param {{dataseries: Array}} dataMeteoValue 
   */
  makeDataInDOM(dataLocation, dataMeteoValue){
    const appContainerAside = document.querySelector('.container .aside');
    const templateMeteo = document.getElementById('meteo');
    const cloneTemplate = document.importNode(templateMeteo.content, true);

    const cityElement = cloneTemplate.querySelector('.city');
    const imgMeteo = cloneTemplate.querySelector('.meteo_image');
    const humidityElement = cloneTemplate.querySelector('.humidity');
    const precipElement = cloneTemplate.querySelector('.precip');
    const temperatureElement = cloneTemplate.querySelector('.temperature');
    const wind_dirElement = cloneTemplate.querySelector('.wind_dir');
    const wind_speedElement = cloneTemplate.querySelector('.wind_speed');

    cityElement.textContent = `${dataLocation.name}`
    imgMeteo.src = `${dataMeteoValue.imgMeteo}`;
    humidityElement.textContent = `Humidité ${dataMeteoValue.relativehumidity_2m}%`
    // precipElement.textContent = `Precipitation : ${meteoModule.getPrecipitation(dataMeteoValue.dataseries[0].prec_type)}`
    temperatureElement.textContent = `${dataMeteoValue.temperature}°C`
    wind_dirElement.textContent = `${dataMeteoValue.winddirection}`
    wind_speedElement.textContent = `${dataMeteoValue.windspeed} km/h`

    appContainerAside.append(cloneTemplate);
  },

  async handleHitKeyboardLetters(event){

    const data = await locationModule.getLocationCompletion(event.currentTarget.value);
    propositionModule.createPropositionsInDOM(data);
  },  
}

app.init();