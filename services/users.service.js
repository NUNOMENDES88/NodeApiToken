const usersModel = require('../models/users.model');


async function getAll() {
    return await usersModel.find();
}

async function getValidLogin(model)
{
    try {
        let user = await usersModel.findOne({ username: model.username });
        if(!user) {
            return false;
        }
        return await user.comparePassword(model.password);
    } catch (error)
    {
        return false;
    }
}

async function getCount(){
    return await usersModel.countDocuments();
}

async function getById(idVar) {
    try {
        return  await usersModel.findOne({ _id: idVar });
    }
    catch (e) {
          return null;
    }
}

async function add(model) {
    let user = new usersModel(model);
    return await user.save();
}

async function edit(id, model) {
    return await usersModel.findOneAndUpdate({ _id: id }, {
        name : model.name,
        status : model.status
    });
}

async function remove(id) {
    return await usersModel.findOneAndRemove({ _id: id });
}

module.exports.getAll = getAll;
module.exports.getById = getById;
module.exports.add = add;
module.exports.edit = edit;
module.exports.remove = remove;
module.exports.getCount = getCount;
module.exports.getValidLogin = getValidLogin;
