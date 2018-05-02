const codes = require('http-status-codes');
const logger = require('./logger.service');

module.exports = {
    notFound: (req, res, next) => {
        logger.error(`${req.url} : Not Found`);
        const error = {
            code: codes.NOT_FOUND,
            message: 'Route not found',
        };

        next(error);
    },
    internal: (err, req, res, next) => {
        logger.error(`${err} : Not Found`);
        const response = err.code ? err : {
            code: codes.INTERNAL_SERVER_ERROR,
            message: err.message,
        };
        res.status(response.code);
        res.json(response);
        next();
    },
};
