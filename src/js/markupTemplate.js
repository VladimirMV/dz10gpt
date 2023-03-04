export function countryСardTeemplate({ flags, name, capital, population, languages }) {
    return `
        <p class="country-info"><span class="weight">Capital:</span> ${capital}</p>
        <p class="country-info"><span class="weight">Population:</span> ${population}</p>
        <p class="country-info"><span class="weight">Languages:</span> ${Object.values(
          languages,
        )}</p>`;
  }
  
  export function countryListTemplate({ flags, name }) {
    return `
    <li class="country-list__item">
      <img class="country-list__img" src="${flags.svg}" alt="${name.official}" width="25" />
      <h2 class="country-list__name">${name.official}</h2>
    </li>
    `;
  }
  export function countryGptTemplate(answerGpt) {
    return `
    <p class="gpt-info"><span class="weight"> </span> ${answerGpt}</p>
    `;
  }