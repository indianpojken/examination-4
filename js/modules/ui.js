/*
Jag har valt att separera denna kod till en modul,
för att isolera vissa funktioner och variabeln ’elements’ - för minska risken
att modifiera något utav dess egenskaper. Då funktionerna ’toggleView’ och ’displayInfo’
endast används inom funktionen ’renderPlanet’, skapar det en tydlighet med vilken
funktion som ska användas då endast den exporteras.
Modulens namn ger även en dokumenterande effekt, då det blir tydligt att
funktion ’renderPlanet’ påverkar gränssnittet.
*/

const elements = {
  pages: {
    frontpage: document.querySelector('#frontpage'),
    planet: document.querySelector('#planet'),
  },
  data: document.querySelectorAll('[data-property]'),
  star: document.querySelector('.star'),
  planets: document.querySelector('.planets')
};

function toggleView() {
  elements.pages.frontpage.classList.toggle('hidden');
  elements.pages.planet.classList.toggle('hidden');
}

function displayInfo(planet) {
  elements.star.classList = `star planet--${(planet.latinName.toLowerCase())}`;

  if (planet.type === 'planet') {
    elements.star.classList.add(`planet--active`);
  }

  elements.data.forEach((element) => {
    const content = element.getAttribute('data-property')
      .split('.').reduce((object, key) => object[key], planet);

    element.textContent = content;

    if (element.classList.contains('unit')) {
      element.textContent = new Number(content).toLocaleString();
    } else if (element.classList.contains('list')) {
      element.textContent = content.join(', ');
    }

    if (content.toString().length) {
      element.parentElement.classList.remove('hidden');
    } else {
      element.parentElement.classList.add('hidden');
    }
  });
}

function renderPlanet(planet) {
  const planetElement = document.createElement('aside');

  planetElement.className = `${planet.type} planet--${planet.latinName.toLowerCase()}`;

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
