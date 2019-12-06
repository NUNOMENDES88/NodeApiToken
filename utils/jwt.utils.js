var jwt = require('jsonwebtoken');
const configJson = require('../config.json');
const commonUtil = require('./common.util');

function isLoggedIn(req, res, next)
{
    // Get the token in header 
    let token = req.headers.authorization;
    //Check if token is null or empty
    if(commonUtil.isnullOrEmpty(token))
    {
        return res.status(401).send(commonUtil.responseMessage(401,null,"No token provided."));
    }
    
    //token is 'Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    let tokenF = token.split(" ");
    if(tokenF.length !=2)
    {
        return res.status(401).send(commonUtil.responseMessage(401,null,"Token with incorrect format. Valid Format 'Bearer token'"));
    }

    //Calculate expire time in seconds
    let seconds = (60 * configJson.tokenValidation.expiresInMinutes);
    //Check options to use in token validator
    let verifyOptions = 
    {
        issuer:  configJson.tokenValidation.validIssuer,
        subject:  configJson.tokenValidation.validSubject,
        audience:  configJson.tokenValidation.validSubject,
        expiresIn: seconds
    };

    jwt.verify(tokenF[1], configJson.tokenValidation.secretKey,verifyOptions, (err, decoded) => 
    {
        if (err) 
        {
            return res.status(401).send(commonUtil.responseMessage(401,null,"Invalid authorization token."));
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
