const axios = require("axios");

const API_ENDPOINT = "https://www.basketball-reference.com/friv/numbers.fcgi"
exports.handler = async (event, context) => {
    const number = event.queryStringParameters.number;
    let year = event.queryStringParameters.year;
    try {
        let urlRequest = API_ENDPOINT + "?number=" + number;
        if (year !== undefined) {
            urlRequest += "&year=" + year;
        }
        const response = await axios.get(urlRequest);
        return {statusCode: 200, body: JSON.stringify({content: response.data})};
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({error: 'Failed fetching data'}),
        };
    }
};