/*
Jag har valt att separera denna kod till en modul,
för att isolera variabeln ’endpoint’ och funktionen ’getKey’
- som inte behöver, eller bör exekveras utanför funktionen ’getPlanets’.
Modulens namn ger även en dokumenterande effekt, då det blir tydligt att
funktion ’getPlanets’ hämtar data från ett API.
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
