const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://swapi.tech/api/planets/');
        const planets = response.data.results.map(planet => ({
            name: planet.name,
            climate: planet.climate,
            terrain: planet.terrain
        }));
        res.json(planets);
    } catch (error) {
        console.error('Error fetching planets:', error);
        res.status(500).send('Error fetching planets');
    }
});

module.exports = router;
