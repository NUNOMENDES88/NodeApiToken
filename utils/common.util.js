const isNullOrEmptyModule = require('is-null-or-empty');
const caseInsensitiveModule = require('case-insensitive')

function isValidNumber(value) 
{
    let validValue = false;
    if (!isnullOrEmpty(value) && !isNaN(value) && value > 0) {
        validValue = true;
    }
    return validValue;
}

function isnullOrEmpty(value) {
    return isNullOrEmptyModule(value);
}

function responseMessage(
    httpStatus, 
    errorDetail,
    errorMessage) 
{
    const responseMessage =
    {
        Status: httpStatus,
        Title:"",
        ErrorCode : "",
        ErrorMessage: "",
        ErrorDetail: ""
    }


    switch (httpStatus) {
        case 400: 
            responseMessage.Status = 400;
            responseMessage.Title = "Bad Request";
            responseMessage.ErrorCode = "Api.Request.ValidationException";
            responseMessage.ErrorMessage = errorMessage;
            responseMessage.ErrorDetail = errorDetail;
            break;

        case 401: 
            responseMessage.Status = 401;
            responseMessage.Title = "Unauthorized";
            responseMessage.ErrorCode = "Api.Request.Unauthorized";
            responseMessage.ErrorMessage = "The Bearer token is required.";
            responseMessage.ErrorDetail = null;
            break;

        case 404: 
            responseMessage.Status = 404;
            responseMessage.Title = "Not Found";
            responseMessage.ErrorCode = "Api.Entity.NotFound";
            responseMessage.ErrorMessage = "The entity with this id does not exist in the database.";
            responseMessage.ErrorDetail = null;
            break;

        case 500: 
            responseMessage.Status = 500;
            responseMessage.Title = "Bad Request";
            responseMessage.ErrorCode = null;
            responseMessage.ErrorMessage = errorMessage;
            responseMessage.ErrorDetail = errorDetail;
            break;
    }
    return responseMessage;
}

module.exports.isValidNumber = isValidNumber;
module.exports.responseMessage = responseMessage;
module.exports.isnullOrEmpty = isnullOrEmpty;


