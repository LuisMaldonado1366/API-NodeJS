
const customHeader = (request, response, next) => {
    try {
        const apiKey = request.headers.api_key;

        if (apiKey === 'my_api_key') {
            next();
        } else {
            response.status(403);
            response.send({error: "Invalid api key"});
        }

    } catch (err) {
        response.status(403);
        response.send({error: "Something went wrong with the header"});
    }
}

module.exports = customHeader;