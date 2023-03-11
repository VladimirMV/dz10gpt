import './css/styles.css';
import _debounce from 'lodash.debounce';
 import openai from 'openai';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './js/fetchCountries.js';
import { countryСardTeemplate, countryListTemplate, countryGptTemplate  } from './js/markupTemplate';
import {showCountriesCoose} from './js/map.js';
import {callGptApi} from './js/gpt-service.js';
 
// import { CodeEngine, JavaScriptConfig }  from 'prompt-engine';
// console.log("CodeEngine", CodeEngine);
// console.log("JavaScriptConfig", JavaScriptConfig);


import { PromptEngine } from "prompt-engine";
const description = "I want to speak with a bot which replies in under 20 words each time";
const examples = [
  { input: "Hi", response: "I'm a chatbot. I can chat with you about anything you'd like." },
  { input: "Can you help me with the size of the universe?", response: "Sure. The universe is estimated to be around 93 billion light years in diameter." },
];
const flowResetText = "Forget the earlier conversation and start afresh";

const promptEngine = new PromptEngine(description, examples, flowResetText, {
  modelConfig: {
    maxTokens: 512,
  }
});

promptEngine.addInteractions([
  { 
    input: "What is the size of an SUV in general?",
    response: "An SUV typically ranges from 16 to 20 feet long."
  },
]);

promptEngine.removeLastInteraction()

promptEngine.addInteraction("What is the maximum speed an SUV from a performance brand can achieve?", 
"Some performance SUVs can reach speeds over 150mph.");

const outputPrompt = promptEngine.buildPrompt("Can some cars reach higher speeds than that?");

console.log("PROMPT Ответ\n\n" + outputPrompt);
console.log("PROMPT LENGTH: " + outputPrompt.length);










const OPENAI_API_KEY = 'sk-X1WiNyBel2SmM3q9pssZT3BlbkFJSwlJkhJPHu2BIAURLdf';
const DEBOUNCE_DELAY = 300;

const refs = {
  inputEl: document.querySelector('#search-box'),
  countryListEl: document.querySelector('.country-list'),
  countryInfoEl: document.querySelector('.country-info'),
  modal: document.querySelector("[data-modal]"),
};
let countryLoad = document.querySelector(".country-load"); 
let openModalBtn = document.getElementById("openModal");

        countryLoad.style.display = "none";

refs.inputEl.addEventListener(
  'input',
  _debounce(onSearchCountryInput, DEBOUNCE_DELAY)
);

openModalBtn.addEventListener("click", toggleBtnModal);
 function toggleBtnModal() {
  console.log("btn.onclick =  ");
  modal.classList.toggle("is-hidden");
};

 


startMap();

const clearMarkup = element => (element.innerHTML = '');
const changeBorderColor = color => (refs.inputEl.style.backgroundColor = color);
// console.log("iNIT MAP ВІЗОВ=====" );
//  initMap(37.7749, -122.4194);

function onSearchCountryInput(event) {
  clearMarkup(refs.countryListEl);
  clearMarkup(refs.countryInfoEl);
  const audio = document.getElementById('gimn-ua');
  audio.pause(); 
  audio.currentTime = 0;
  changeBorderColor('white');
  countryLoad.style.display = "none";
    modal = document.querySelector("[data-modal]")
    modal.classList.add("is-hidden");

  if (!event.target.value.trim()) {
    return;
  }

  fetchCountries(event.target.value.trim())
    .then(countries => { 

      if (countries.length > 5) {
        Notify.info(
          '⚠️Too many matches found. Please enter a more specific name.'
        );
        changeBorderColor('lightblue');
        return;
      }
      renderMarkup(countries);
      // renderMarkupLoad();
      showCountriesCoose(...countries);
      if (countries.length === 1) {
       let cant = { ...countries };
       countryLoad.style.display = "flex";

       promptGpt = `write basic background information about the country "${cant[0].name.common}" text size 2000 characters. in "encyclopedia style" style/ information in Russian. Highlight paragraphs. Format text`;
       answerGpt = callGptApi(OPENAI_API_KEY,promptGpt);
       }
    }).catch(() => {
      Notify.failure('❌Oops, there is no country with that name');
      changeBorderColor('lightcoral');
      
    });
    
}

function renderMarkup(countries) {
  changeBorderColor('khaki');

  let markupInfo = '';
  let markupList = '';

  if (countries.length >= 2) {
    markupList = countries.reduce(
      (previousValue, currentValue) =>
        (previousValue += countryListTemplate(currentValue)),
      ''
    );
  } else {
    if (countries[0].name.common === 'Ukraine') {
      const audio = document.getElementById('gimn-ua');
            audio.play(); 
            audio.volume = 0.2;
    }
     markupList = countryListTemplate(...countries);
     markupInfo = countryСardTeemplate(...countries);
     
    changeBorderColor('lightgreen');

    refs.countryInfoEl.insertAdjacentHTML('afterbegin', markupInfo);
  }

  refs.countryListEl.insertAdjacentHTML('afterbegin', markupList);
  
  
}

 function renderMarkupLoad() {
  // /   let markupAnswerGpt = '';
 
       markupLoadGpt = '<img class="country-list__img" src="./load.gif" alt="gpt-load" width="30" />';
        
       
      // changeBorderColor('lightgreen');
      refs.countryInfoEl.insertAdjacentHTML('afterbegin', markupLoadGpt);

}

// function renderMarkupGptAnswer(answerGpt) {
//   changeBorderColor('khaki');

//   let markupAnswerGpt = '';
  
//      markupAnswerGpt = countryGptTemplate(answerGpt);
     
     
//     changeBorderColor('lightgreen');
//     refs.countryInfoEl.insertAdjacentHTML('afterbegin', markupAnswerGpt);
//   }

  
  



function startMap() {

     
  let countries = [];

  let mapOptions = {
      zoom: 3,
      minZoom: 1,
      center: new google.maps.LatLng(50.7244893,3.2668189),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      backgroundColor: 'none'
  };

  let map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  

};