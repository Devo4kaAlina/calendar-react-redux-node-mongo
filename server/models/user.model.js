const mongoose = require('mongoose');
const SchemaBase = require('./base.model.js');
const bcrypt = require('bcrypt');
const constants = require('../constants/const');
const autoIncrement = require('mongoose-auto-increment');
const db = mongoose.connection;
autoIncrement.initialize(db);

require('mongoose-schema-extend');

const userSchema = SchemaBase.extend({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    accessToken: {
        type: String,
        required: true,
    }
});
userSchema.pre('save', function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(constants.SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

userSchema.plugin(autoIncrement.plugin, 'id');
module.exports = mongoose.model('User', userSchema, 'user');
