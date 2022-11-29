/*
Jag har valt att separera denna modul från resten,
för att endast exponera renderPlanet. Eftersom att
att resten av funktionerna och elementen används intert
inom modulen, minskar man risken för att modifiera variabler,
importerar och kallar funktioner som ej bör.
Det skapar även en smidig struktur när dom olika modulerna
byggs samman i index.js (renderPlanet tar ett object från api-responsen).
Namnet på modulen ger också en självdokumenterande effekt, då det är tydligt
att den har med själva gränssnittet att göra.
*/
const elements = {
  pages: {
    frontpage: document.querySelector('#frontpage'),
    planet: document.querySelector('#planet'),
  },
  planet: {
    name: document.querySelector('.planet__names header h1'),
    latinName: document.querySelector('.planet__names header h2'),
    description: document.querySelector('.planet__description'),
    data: {
      circumference: document.querySelector('#circumference'),
      distance: document.querySelector('#distance'),
      temp: {
        day: document.querySelector('#max-temp'),
        night: document.querySelector('#min-temp'),
      },
    },
    moons: {
      section: document.querySelector('.planet__moons'),
      list: document.querySelector('.planet__moons > p'),
    },
  },
  star: document.querySelector('.star'),
  planets: document.querySelector('.planets')
};

function toggleView() {
  elements.pages.frontpage.classList.toggle('hidden');
  elements.pages.planet.classList.toggle('hidden');
}

function displayInfo(planet) {
  elements.star.classList = `star planet__${(planet.latinName.toLowerCase())}`;

  if (planet.type === 'planet') {
    elements.star.classList.add(`planet--active`);
  }

  elements.planet.name.innerText = planet.name;
  elements.planet.latinName.innerText = planet.latinName;
  elements.planet.description.innerText = planet.desc;

  const formatKM = (number) => `${new Number(number).toLocaleString()} km`;
  elements.planet.data.circumference.innerText = formatKM(planet.circumference);
  elements.planet.data.distance.innerText = formatKM(planet.distance);

  elements.planet.data.temp.day.innerText = planet.temp.day + 'C';
  elements.planet.data.temp.night.innerText = planet.temp.night + 'C';

  if (planet.moons.length) {
    elements.planet.moons.section.classList.remove('hidden');
    elements.planet.moons.list.innerText =
      planet.moons.reduce((prev, cur) => `${prev}, ${cur}`);
  } else {
    elements.planet.moons.section.classList.add('hidden');
  }
}

function renderPlanet(planet) {
  const planetElement = document.createElement('aside');

  planetElement.className = `${planet.type} planet__${planet.latinName.toLowerCase()}`;

  planetElement.addEventListener('click', () => {
    toggleView();
    displayInfo(planet);
  });

  planetElement.append(document.createElement('aside'));

  if (planet.type === 'planet') {
    elements.planets.append(planetElement);
  } else {
    elements.star.replaceWith(planetElement);
    elements.star = planetElement;
  }
}

export { renderPlanet };
