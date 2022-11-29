const elements = {
  pages: {
    frontpage: document.querySelector('#frontpage'),
    planet: document.querySelector('#planet'),
  },
  planetInformation: {
    header: {
      swedish: document.querySelector('.planet-information header h1'),
      latin: document.querySelector('.planet-information header h2'),
    },
    description: document.querySelector('.planet-information__description'),
    data: {
      circumference: document.querySelector('#circumference'),
      distance: document.querySelector('#distance'),
      maxTemp: document.querySelector('#max-temp'),
      minTemp: document.querySelector('#min-temp'),
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

  elements.planetInformation.header.swedish.innerHTML = planet.name;
  elements.planetInformation.header.latin.innerHTML = planet.latinName;
  elements.planetInformation.description.innerHTML = planet.desc;

  elements.planetInformation.data.circumference.innerHTML =
    new Number(planet.circumference).toLocaleString() + ' km';

  elements.planetInformation.data.distance.innerHTML =
    new Number(planet.distance).toLocaleString() + ' km';

  elements.planetInformation.data.maxTemp.innerHTML = planet.temp.day + 'C';
  elements.planetInformation.data.minTemp.innerHTML = planet.temp.night + 'C';

  if (planet.moons.length) {
    elements.planetInformation.moons.section.classList.remove('hidden');
    elements.planetInformation.moons.list.innerHTML =
      planet.moons.reduce((prev, cur) => `${prev}, ${cur}`);
  } else {
    elements.planetInformation.moons.section.classList.add('hidden');
  }
}

function renderPlanet(planet) {
  const planetElement = document.createElement('aside');
  const ringElement = document.createElement('aside');

  planetElement.className = `${planet.type} planet__${planet.latinName.toLowerCase()}`;
  planetElement.addEventListener('click', () => {
    toggleView();
    displayInfo(planet);
  });

  planetElement.append(ringElement);

  if (planet.type === 'planet') {
    elements.planets.append(planetElement);
  } else {
    elements.star.replaceWith(planetElement);
    elements.star = planetElement;
  }
}

export { renderPlanet };
