/*
In questo esercizio, utilizzerai Promise.all() per creare la funzione getDashboardData(query), 
che accetta una città come input e recupera simultaneamente:

Nome completo della città e paese da  /destinations?search=[query]
(result.name, result.country, nelle nuove proprietà city e country).

Il meteo attuale da /weathers?search={query}
(result.temperature e result.weather_description nella nuove proprietà temperature e weather).

Il nome dell’aeroporto principale da /airports?search={query}
(result.name nella nuova proprietà airport).

Utilizzerai Promise.all() per eseguire queste richieste in parallelo e poi restituirai un oggetto con i dati aggregati.

Note del docente
Scrivi la funzione getDashboardData(query), che deve:
Essere asincrona (async).
Utilizzare Promise.all() per eseguire più richieste in parallelo.
Restituire una Promise che risolve un oggetto contenente i dati aggregati.
Stampare i dati in console in un messaggio ben formattato.
Testa la funzione con la query "london"
*/

async function fetchJson(url) {
  const response = await fetch(url);
  const object = await response.json();
  return object;
}

async function getDashboardData(query) {
  try {
    const destinationsPromise = fetchJson(
      `https://boolean-spec-frontend.vercel.app/freetestapi/destinations?search=${query}`
    );
    const weathersPromise = fetchJson(
      `https://boolean-spec-frontend.vercel.app/freetestapi/weathers?search=${query}`
    );
    const airportsPromise = fetchJson(
      `https://boolean-spec-frontend.vercel.app/freetestapi/airports?search=${query}`
    );

    const promises = [destinationsPromise, weathersPromise, airportsPromise];
    const [destinations, weathers, airports] = await Promise.all(promises);

    return {
      city: destinations[0].name,
      country: destinations[0].country,
      temperature: weathers[0].temperature,
      weather: weathers[0].weather_description,
      airport: airports[0].name,
    };
  } catch (error) {
    throw new Error(`Errore recupero dati: ${error.message}`);
  }
}

(async () => {
  getDashboardData("london")
    .then((data) => {
      console.log("Dasboard data:", data);
      console.log(
        `${data.city} is in ${data.country}.\n` +
          `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n` +
          `The main airport is ${data.airport}.\n`
      );
    })
    .catch((error) => console.error(error));
})();
