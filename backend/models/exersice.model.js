const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exersiceSchema = new Schema(
    {
        username: { type: String, require: true },
        description: { type: String, require: true },
        duration: { type: Number, require: true },
        date: { type: Date, require: true }
    },
    {
        timestamps: true
    }
)
const exersice = mongoose.model('Exercise', exersiceSchema);
module.exports = exersice;
