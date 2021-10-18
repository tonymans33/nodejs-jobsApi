const { StatusCodes } = require('http-status-codes')
const APIError = require('./APIError')

class UnauthenticatedError extends APIError {
    constructor(message){
        super(message) 
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnauthenticatedError


