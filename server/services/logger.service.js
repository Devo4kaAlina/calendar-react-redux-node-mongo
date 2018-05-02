const logger = require('winston');

class Logger {
    constructor(log) {
        this.logger = log;
    }

    info(msg) {
        this.logger.info(msg);
    }

    error(msg) {
        this.logger.error(msg);
    }
}

module.exports = new Logger(logger);
