var jwt = require('jsonwebtoken');
const configJson = require('../config.json');
const commonUtil = require('./common.util');

function isLoggedIn(req, res, next)
{
    let token = req.headers.authorization;

    if(commonUtil.isnullOrEmpty(token))
    {
        return res.status(401).send(commonUtil.responseMessage(401));
    }
    
    //token is 'Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    let tokenF = token.split(" ");
    let seconds = (60 * configJson.tokenValidation.expiresInMinutes);

    let verifyOptions = 
    {
        issuer:  configJson.tokenValidation.validIssuer,
        subject:  configJson.tokenValidation.validSubject,
        audience:  configJson.tokenValidation.validSubject,
        expiresIn: seconds
    };

    jwt.verify(tokenF[1], configJson.tokenValidation.secretKey,verifyOptions, function (err, decoded)
    {
        if (err) 
        {
            return res.status(401).send(commonUtil.responseMessage(401));
        }
        next();
    });
}

function generateToken(user)
{
    let payload = {
        "userName": user.username,
        "name": "Ipca top"
    };

    let seconds = (60 * configJson.tokenValidation.expiresInMinutes);

    let signOptions = {
        issuer:  configJson.tokenValidation.validIssuer,
        subject:  configJson.tokenValidation.validSubject,
        audience:  configJson.tokenValidation.validSubject,
        expiresIn: seconds
    };

    let token = jwt.sign(payload, configJson.tokenValidation.secretKey, signOptions);
    return {
        "token":token,
        "username":user.username,
        expiresIn: seconds
    };
}

module.exports.generateToken = generateToken;
module.exports.isLoggedIn = isLoggedIn;
