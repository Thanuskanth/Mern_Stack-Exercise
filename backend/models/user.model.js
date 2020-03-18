const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: { type: String, require: true, minlength: 3, trim: true, unique: true }
    },
    {
        timestamps: true
    });
const user = mongoose.model('User', userSchema);
module.exports = user;