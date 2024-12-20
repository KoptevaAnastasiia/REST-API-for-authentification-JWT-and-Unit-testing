const axios = require('axios');

async function fetchGiphy(query) {
    const apiKey = process.env.GIPHY_API_KEY;
    try {
        const response = await axios.get(`https://api.giphy.com/v1/gifs/search`, {
            params: {
                api_key: apiKey,
                q: query,
                limit: 1
            }
        });
        return response.data.data[0].url;
    } catch (error) {
        console.error('Error fetching giphy:', error);
        return null;
    }
}

module.exports = { fetchGiphy };
