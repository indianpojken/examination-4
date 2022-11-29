/*
Jag har valt att separera denna modul från resten,
för att isolera variablar (endpoint) och funktioner (getKey)
som inte har ett syfte att användas utanför denna modul.
En possitiv effekt är också att det ger självdokumenterande,
där man snabbt förstår att man använder funktionen som exponeras
till anropar ett api.
*/

const endpoint = 'https://fathomless-shelf-54969.herokuapp.com';

async function getKey() {
  const response = await fetch(`${endpoint}/keys`, { method: 'POST' });
  const data = await response.json();

  return data.key;
}

async function getPlanets() {
  const key = await getKey();

  const response = await fetch(`${endpoint}/bodies`, {
    headers: {
      'x-zocom': key
    }
  });

  const data = await response.json();
  return data.bodies;
}

export { getPlanets };
