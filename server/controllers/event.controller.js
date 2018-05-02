const codes = require('http-status-codes');
const models = require('../models');
const Event = models.Event;
const responseService = require('../services/response.service');
const userController = require('./user.controller');

class EventController {

    findAll(req, res) {
        return new Promise((resolve, reject) => {
            const { accessToken, date } = req.query;
            if (!accessToken || !date) {
                responseService.throwErrorWithStatusCode(
                    'Date and accessToken params are required',
                    codes.BAD_REQUEST,
                    res
                );
                return reject();
            }

            userController.checkUserByAccessToken(accessToken, (err, user) => {
                if (err) return responseService.throwError(err, res);
                if (!user) {
                    responseService.throwUnauthorizedAccess(res);
                    return reject();
                }
                const event = new Event();
                event.getAllUserEvents(user._id, date)
                    .then(result => resolve(result));
            });
        })
    }

    findUserEvents(req, res) {
        eventController
            .findAll(req, res)
            .then(result => responseService.returnObjectAsJSON(result, res))
    }

    exportEvents(req, res) {
        eventController
            .findAll(req, res)
            .then(result => {
                let events = result.map(e => ({
                    title: e.title,
                    start: e.start,
                    duration: e.end - e.start
                })).sort((prev, next) => prev.start > next.start ? 1 : -1);
                responseService.returnObjectAsJSON(events, res)
            });
        
    }

    createEvent(req, res) {
        const { accessToken } = req.query;
        const { eventDate, start, end, title } = req.body;
        if (!eventDate || !('start' in req.body) || !end || !title) {
            return responseService.throwErrorWithStatusCode(
                'All fields are required',
                codes.BAD_REQUEST,
                res
            );
        }

        userController.checkUserByAccessToken(accessToken, (err, user) => {
            if (err) return responseService.throwError(err, res);
            if (!user) return responseService.throwUnauthorizedAccess(res);
            Event
                .create({
                    userId: user._id,
                    eventDate,
                    start,
                    end,
                    title
                })
                .then((event) => {
                    event.getAllUserEvents(user._id, eventDate)
                        .then(result => responseService.returnObjectAsJSON(result, res));
                });
        });
    }

    removeEvent(req, res) {
        const { id } = req.params;
        const { accessToken } = req.query;
        
        if (!id) {
            return responseService.throwError('Bad params', res);
        }
        userController.checkUserByAccessToken(accessToken, (err, user) => {
            if (err) return responseService.throwError(err, res);
            if (!user) return responseService.throwUnauthorizedAccess(res);
            Event
                .findById(id)
                .then((event) => {
                    const eventDate = event.eventDate;
                    event.remove().then(() => {
                        event.getAllUserEvents(user._id, eventDate)
                            .then(result => responseService.returnObjectAsJSON(result, res));
                    });
                });
        });
    }
}

const eventController = new EventController();

module.exports = eventController;