const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

const searchCountries = async input => {
  const resp = await fetch("conuntries.json");
  const countries = await resp.json();

  let matches = countries.filter(country => {
    const regex = new RegExp(`${input}`, 'gi');
    return country.name.match(regex) || country.country_code.match(regex);
  });

  console.log(matches);

  if(input.length === 0) {
    matches = [];
    matchList.innerHTML = '';
  } else {
    outputHtml(matches);

  }

}
const outputHtml = matches => {
  if (matches.length) {
    const htmlElem = matches.map(match => `
    <div class="card card-body mb-1">
    <h4>${match.name} (${match.country_code})
    <span class="text-primary">${match.capital}</span>
    </h4>
    <small>lat: ${match.latlng[0]} / long: ${match.latlng[1]}</small>
    </div>
    `).join('');

    matchList.innerHTML = htmlElem;

  } else {
    matchList.innerHTML = `
    <div class="card card-body mb-1">
    <h4>no results</h4>
    </div>
    `;
  }
}
search.addEventListener("input", () =>  searchCountries(search.value))