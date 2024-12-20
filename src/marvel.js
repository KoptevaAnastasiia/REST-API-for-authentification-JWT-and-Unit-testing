const axios = require('axios');

async function fetchMarvelCharacters() {
    const apiKey = process.env.MARVEL_API_KEY;
    try {
        const response = await axios.get(`https://gateway.marvel.com/v1/public/characters`, {
            params: {
                apikey: apiKey
            }
        });
        return response.data.data.results;
    } catch (error) {
        console.error('Error fetching Marvel characters:', error);
        return [];
    }
}

module.exports = { fetchMarvelCharacters };
