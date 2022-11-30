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
