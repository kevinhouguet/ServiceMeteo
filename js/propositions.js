const propositionModule = {
  createPropositionsInDOM(data){
    const formElem = document.querySelector('#city-form');

    const currentPropositionContainer = formElem.querySelector('.input-proposition-container');
    if(currentPropositionContainer){
      currentPropositionContainer.remove()
    }

    const propositionContainer = document.createElement('div');
    propositionContainer.classList.add('input-proposition-container');
    
    console.log(data);

    data.forEach(proposition => {
      const propositionElem = document.createElement('p');
      propositionElem.classList.add('input-proposition');
      propositionElem.dataset.codeinsee = proposition.code;
      propositionElem.dataset.city = proposition.nom;
      propositionElem.textContent = `${proposition.nom}, ${proposition.codesPostaux[0]}`;

      propositionContainer.appendChild(propositionElem);
    });

    propositionContainer.addEventListener('click', propositionModule.handleClickOnCityProposition);

    formElem.appendChild(propositionContainer);
    
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