const usersService = require('../services/users.service');
const commonUtil = require('../utils/common.util');
const jwtUtil = require('../utils/jwt.utils');

async function validLogin(req, res)
{
  let body = req.body;
  try {
    let result = await usersService.getValidLogin(body);
    if(result == null || result == false)
    {
        res.status(400);
        res.send(commonUtil.responseMessage(400,"","Invalid login"));
        return res;
    }
    
    let tokenInfo = jwtUtil.generateToken(body);
    res.status(200);
    res.send(tokenInfo)
    return res;
  }
  catch (error)
  {
    next(error);
    res.status(500);
    res.send(commonUtil.responseMessage(500,error.toString(),""));
    return res;
  }
}

module.exports.validLogin = validLogin;


