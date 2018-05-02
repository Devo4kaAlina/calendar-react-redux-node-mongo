const mongoose = require('mongoose');


const Schema = mongoose.Schema;
mongoose.Promise = Promise;

const BaseSchema = new Schema({
    id: {
        type: Number,
    },
    createdAt: {
        type: String,
        required: false,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
},
    { versionKey: false });

module.exports = BaseSchema;