const eventsModel = require('../models/events.model');

async function getAll() {
    return await eventsModel.find();
}

async function getCount(){
    return await eventsModel.countDocuments();
}

async function getById(idVar) {
    try {
        return  await eventsModel.findOne({ _id: idVar });
    }
    catch (e) {
          return null;
    }
}

async function add(model) {
    let event = new eventsModel(model);
    return await event.save();
}

async function edit(id, model) {
    return await eventsModel.findOneAndUpdate({ _id: id }, {
        name : model.name,
        status : model.status
    });
}

async function remove(id) {
    return await eventsModel.findOneAndRemove({ _id: id });
}

module.exports.getAll = getAll;
module.exports.getById = getById;
module.exports.add = add;
module.exports.edit = edit;
module.exports.remove = remove;
module.exports.getCount = getCount;
