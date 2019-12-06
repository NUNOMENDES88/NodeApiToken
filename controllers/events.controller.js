const eventsService = require('../services/events.service');
const commonUtil = require('../utils/common.util');

async function getAll(req, res)
{
  let result = await eventsService.getAll();
  res.status(200);
  res.send(result);
  return res;
}

async function getCount(req, res)
{
  let result = await eventsService.getCount();
  res.send({ "totalRows": result });
  return res;
}

async function getById(req, res)
{
    let result = await eventsService.getById(req.params.id);
    if (result == null || result.length == 0)
    {
      res.status(404);
      res.send(commonUtil.responseMessage(404,"Invalid input data"));
      return res;
    }
    else
    {
      res.status(200);
      res.send(result);
      return res;
    }
}

async function add(req, res)
{
  let body = req.body;
  try {
    var result = await eventsService.add(body);
    res.status(201);
    res.send(body);
    return res;
  }
  catch (error)
  {
    console.log("error "+error);
    res.status(500);
    res.send(commonUtil.responseMessage(500,error.toString(),""));
    return res;
  }
}

async function update(req, res)
{
  let body = req.body;
  try 
  {
    var result = await eventsService.edit(req.params.id, body);
    res.status(200);
    res.send(body);
    return res;
  }
  catch (error)
  {
    res.status(500);
    res.send(commonUtil.responseMessage(500,error.toString()));
    return res;
  }
}

async function remove(req, res)
{
  try {
    let result = await eventsService.remove(req.params.id);
    res.status(204);
    res.send();
    return res;
  }
  catch (error)
  {
    res.status(500);
    res.send(commonUtil.responseMessage(500,error.toString()));
    return res;
  }
}

module.exports.getAll = getAll;
module.exports.getCount = getCount;
module.exports.getById = getById;
module.exports.add = add;
module.exports.update = update;
module.exports.remove = remove;