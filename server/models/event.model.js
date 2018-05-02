const mongoose = require('mongoose');
const SchemaBase = require('./base.model.js');
const autoIncrement = require('mongoose-auto-increment');
const db = mongoose.connection;
autoIncrement.initialize(db);
require('mongoose-schema-extend');

const eventSchema = SchemaBase.extend({
    eventDate: {
        type: String,
        required: true,
    },
    userId: {
        type: Number,
        required: true,
    },
    start: {
        type: Number,
        required: true,
    },
    end: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    }
});

eventSchema.methods.getAllUserEvents = function (userId, eventDate) {
    return Event
        .find({ userId, eventDate }, null, {
            // sort: {
            //     start: 1
            // }
        })
};

eventSchema.plugin(autoIncrement.plugin, 'id');
const Event = mongoose.model('Event', eventSchema, 'event');
module.exports = Event;
