const handleHttpError = (response, message = 'Something happened', code = 403) => {
    response.status(code);
    response.send({error: message});
}

module.exports = {handleHttpError};