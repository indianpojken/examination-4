import { getPlanets } from './modules/api.js';
import { renderPlanet } from './modules/ui.js';

const planets = await getPlanets();

planets.forEach((planet) => {
  renderPlanet(planet);
});
