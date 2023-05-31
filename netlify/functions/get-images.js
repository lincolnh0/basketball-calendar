const axios = require("axios");

exports.handler = async (event, context) => {
    const query = event.queryStringParameters.query;
    let imageRequestUrl = "https://serpapi.com/search.json?engine=google_images&google_domain=google.com&gl=us&hl=en"
    imageRequestUrl += `&api_key=${process.env.SERP_API_KEY}`
    imageRequestUrl += `&q=${query}`

    try {
        const response = await axios.get(imageRequestUrl);
        return {statusCode: 200, body: JSON.stringify({content: response.data})};
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({error: 'Failed fetching data'}),
        };
    }

};