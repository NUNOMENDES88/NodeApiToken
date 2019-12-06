var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

let usersSchema = new Schema({
    username: {type: String, required: 'Username is required'},
    password: {type: String, required: 'Password is required'},
    createDate: {type: Date, default: Date.now}
});

usersSchema.pre("save", function(next) {
    if(!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

usersSchema.methods.comparePassword = function(plaintext)
{
    return bcrypt.compareSync(plaintext, this.password)
};


let usersModel = mongoose.model('users', usersSchema);
module.exports = usersModel;