import {  countryGptTemplate  } from './markupTemplate';
export async function callGptApi(OPENAI_API_KEY,promptText) {
     
    const url = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
    const countryInfoEl = document.querySelector('.gpt-info');
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        'prompt': promptText,
        'max_tokens': 3000,
          'n': 1,
          temperature: 0.7,
        // 'stop': '\n'
      })
    };
  
    const response = await fetch(url, options);
    const result = await response.json();

    
  console.log('data=======> ', result.choices[0].text);
  let countryLoad = document.querySelector(".country-load"); 
//   console.log(' befor NONE=======> ', countryLoad.style.display);
     countryLoad.style.display = "none";
// console.log('NONE=======> ', countryLoad.style.display);
    // console.log('data result=======> ',result);
    // console.log('data result=======> ',result.choices );
    toggleModal();
    renderMarkupGptAnswer(result.choices[0].text,countryInfoEl) ;

    return result.choices[0].text;
  }
  

  function toggleModal() {
    // document.body.classList.toggle("modal-open")
    modal = document.querySelector("[data-modal]")
    modal.classList.toggle("is-hidden");
  }

function renderMarkupGptAnswer(answerGpt,countryInfoEl) {
  // changeBorderColor('khaki');

  let markupAnswerGpt = '';
  
     markupAnswerGpt = countryGptTemplate(answerGpt);
     
     console.log('countryInfoEl=======> ',countryInfoEl,markupAnswerGpt);
    // changeBorderColor('lightgreen');
    countryInfoEl.insertAdjacentHTML('afterbegin', markupAnswerGpt);
  }