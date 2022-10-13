let totaltime = 0;
let sunelement;
let sunLeftPosition;
let sunBottomPosition;

// _ = helper functions
function _parseMillisecondsIntoReadableTime(timestamp) {
  //Get hours from milliseconds
  const date = new Date(timestamp * 1000);
  // Hours part from the timestamp
  const hours = '0' + date.getHours();
  // Minutes part from the timestamp
  const minutes = '0' + date.getMinutes();
  // Seconds part from the timestamp (gebruiken we nu niet)
  // const seconds = '0' + date.getSeconds();

  // Will display time in 10:30(:23) format
  return hours.substr(-2) + ':' + minutes.substr(-2); //  + ':' + s
}

// 5 TODO: maak updateSun functie

// 4 Zet de zon op de juiste plaats en zorg ervoor dat dit iedere minuut gebeurt.
let placeSunAndStartMoving = (totalMinutes, sunrise) => {
  // In de functie moeten we eerst wat zaken ophalen en berekenen.
  // Haal het DOM element van onze zon op en van onze aantal minuten resterend deze dag.
  const gedaanMinuten = Date.now() / 1000 - sunrise;
  console.log(gedaanMinuten / 60);
  const resterendeMinuten = totalMinutes - gedaanMinuten / 60;
  console.log(resterendeMinuten);
  const resterendeUren = Math.round(resterendeMinuten / 60);
  console.log(resterendeUren);
  const restingMinutes = Math.round(resterendeMinuten % 60);
  console.log(restingMinutes);
  document.querySelector(
    '.js-time-left'
  ).innerText = `${resterendeUren} uur en ${restingMinutes} minuten`;
  // Bepaal het aantal minuten dat de zon al op is.
  // Nu zetten we de zon op de initiële goede positie ( met de functie updateSun ). Bereken hiervoor hoeveel procent er van de totale zon-tijd al voorbij is.
  // We voegen ook de 'is-loaded' class toe aan de body-tag.
  // Vergeet niet om het resterende aantal minuten in te vullen.
  //   const resterendeMinuten = document.querySelector('.js-time-left');
  // Nu maken we een functie die de zon elke minuut zal updaten
  // Bekijk of de zon niet nog onder of reeds onder is
  // Anders kunnen we huidige waarden evalueren en de zon updaten via de updateSun functie.
  // PS.: vergeet weer niet om het resterend aantal minuten te updaten en verhoog het aantal verstreken minuten.
};

// 3 Met de data van de API kunnen we de app opvullen
let showResult = (queryResponse) => {
  // We gaan eerst een paar onderdelen opvullen
  // Zorg dat de juiste locatie weergegeven wordt, volgens wat je uit de API terug krijgt.
  document.querySelector('.js-location').innerText = queryResponse.name;
  // Toon ook de juiste tijd voor de opkomst van de zon en de zonsondergang.
  document.querySelector('.js-sunrise').innerText =
    _parseMillisecondsIntoReadableTime(queryResponse.sunrise);
  document.querySelector('.js-sunset').innerText =
    _parseMillisecondsIntoReadableTime(queryResponse.sunset);
  // Hier gaan we een functie oproepen die de zon een bepaalde positie kan geven en dit kan updaten.
  const totalMinutes = (queryResponse.sunset - queryResponse.sunrise) / 60;
  placeSunAndStartMoving(totalMinutes, queryResponse.sunrise);
  // Geef deze functie de periode tussen sunrise en sunset mee en het tijdstip van sunrise.
};

const getData = (endpoint) => {
  return fetch(endpoint)
    .then((r) => r.json())
    .catch((e) => console.error(e));
};

// 2 Aan de hand van een longitude en latitude gaan we de yahoo wheater API ophalen.
let getAPI = async (lat, lon) => {
  const api = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=00104c45b6cbc11fdd1676a5be722f49&units=metric&lang=nl&cnt=1`;
  // Eerst bouwen we onze url op
  // Met de fetch API proberen we de data op te halen.
  const { city } = await getData(api);
  console.log(city);
  // Als dat gelukt is, gaan we naar onze showResult functie.
  showResult(city);
};

document.addEventListener('DOMContentLoaded', async function () {
  // 1 We will query the API with longitude and latitude.
  getAPI(51.1044094, 3.9864547);

  totaltime = city.sunset - city.sunrise;
  placeSun(city.sunrise);
});
