const codes = require('http-status-codes');
const uuid = require('node-uuid');
const models = require('../models');
const User = models.User;
const responseService = require('../services/response.service');
const mongoose = require('mongoose');
const db = mongoose.connection;

class UserController {
    findAll (req, res) {
        User.find().then(result => {
            res.json({
                code: codes.OK,
                message: 'Working user default route GET',
                body: result
            });
        })
    }

    createUser (req, res) {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return responseService.throwErrorWithStatusCode(
                'All fields are required',
                codes.BAD_REQUEST,
                res
            );
        }

        User
            .findOne({
                email
            })
            .then(user => {
                if (user) {
                    return responseService.throwErrorWithStatusCode(
                        'User with this email alredy exist',
                        codes.BAD_REQUEST,
                        res
                    );
                }
                const newUser = new User({
                    firstName,
                    lastName,
                    email,
                    password,
                    accessToken: uuid.v4(),
                });

                // save user to database
                newUser.save(function (err) {
                    if (err) throw err;
                    responseService.returnObjectAsJSON(newUser, res);
                });
            })
    }

    userSingIn (req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return responseService.throwErrorWithStatusCode(
                'All fields are required',
                codes.BAD_REQUEST,
                res
            );
        }
        User.findOne({ email }, function (err, user) {
            if (err) return responseService.throwError(err, res);
            if (!user) return responseService.throwUnauthorizedAccess(res);
            user.comparePassword(password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) return responseService.returnObjectAsJSON(user, res);
                responseService.throwError('Incorrect password', res);
            });
        });
    }

    getUserByAccessToken (req, res) {
        const { accessToken } = req.query;
        if (!accessToken) {
            return responseService.throwErrorWithStatusCode(
                'AccessToken is required',
                codes.UNAUTHORIZED,
                res
            );
        }
        User.findOne({ accessToken }, function (err, user) {
            if (err) return responseService.throwError(err, res);
            if (!user) return responseService.throwUnauthorizedAccess(res);
            responseService.returnObjectAsJSON(user, res);
        });
    }

    checkUserByAccessToken (accessToken, cb) {
        User.findOne({ accessToken }, cb);
    }

    removeUser (req, res) {
        const { id } = req.params;
        if (!id) {
            return responseService.throwError('Bad params', res);
        }
        User
            .remove({ _id: id })
            .then(() => {
                responseService.returnOkWithoutBody(res);
            })
    }
}

module.exports = new UserController();