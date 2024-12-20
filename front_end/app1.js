const planetList = document.getElementById('planets');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('previous');
const link = 'https://swapi.tech/api/planets/';

let currentPage = 1;
let planets = [];
let nextUrl = '';
let prevUrl = '';

const planetsPerPage = 5;

async function fetchPlanets(url = link) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        planets = data.results;
        nextUrl = data.next;
        prevUrl = data.previous;

        const detailedPlanets = await Promise.all(planets.map(planet => fetchPlanetDetails(planet.url)));
        displayPlanets(detailedPlanets);
        updateButtons();
    } catch (error) {
        console.error('Error fetching planets:', error);
    }
}

async function fetchPlanetDetails(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.result.properties;
    } catch (error) {
        console.error('Error fetching planet details:', error);
    }
}

function displayPlanets(detailedPlanets) {
    planetList.innerHTML = '';

    const startIndex = (currentPage - 1) * planetsPerPage;
    const endIndex = startIndex + planetsPerPage;
    const planetsToDisplay = detailedPlanets.slice(startIndex, endIndex);

    planetsToDisplay.forEach(planet => {
        const li = document.createElement('li');
        const title = document.createElement('h3');
        title.textContent = planet.name;

        const details = document.createElement('div');
        details.innerHTML = `
            <p><strong>Rotation Period:</strong> ${planet.rotation_period}</p>
            <p><strong>Orbital Period:</strong> ${planet.orbital_period}</p>
            <p><strong>Diameter:</strong> ${planet.diameter}</p>
            <p><strong>Climate:</strong> ${planet.climate}</p>
            <p><strong>Gravity:</strong> ${planet.gravity}</p>
            <p><strong>Terrain:</strong> ${planet.terrain}</p>
            <p><strong>Surface Water:</strong> ${planet.surface_water}</p>
            <p><strong>Population:</strong> ${planet.population}</p>
        `;
        li.appendChild(title);
        li.appendChild(details);
        planetList.appendChild(li);
    });
}

function updateButtons() {
    prevButton.disabled = !prevUrl;
    nextButton.disabled = !nextUrl;
}

nextButton.addEventListener('click', () => {
    if (nextUrl) {
        currentPage++;
        fetchPlanets(nextUrl);
    }
});

prevButton.addEventListener('click', () => {
    if (prevUrl) {
        currentPage--;
        fetchPlanets(prevUrl);
    }
});

fetchPlanets();