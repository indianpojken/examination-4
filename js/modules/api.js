/*
I choose to seperate this module from the rest,
to isolate the 'endpoint-variable'
and 'getKey-function' - whom doesn't have any use
outside of the 'getPlanets-function' --
thus I only only expose and it also provides self-documentation.
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
