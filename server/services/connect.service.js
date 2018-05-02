const mongoose = require('mongoose');
const configDb = require('../config/db.config');


class DataProvider {
    constructor(config) {
        this.config = config;
        if (this.config) {
            this.mongoose = mongoose.connect(`mongodb://${this.config.host}:${this.config.port}/${this.config.dbName}`);
        } else {
            throw new Error('Fix this');
        }
    }

    closeConnection() {
        if (this.mongoose.connection) {
            this.mongoose.connection.close();
        }
    }
}

module.exports = new DataProvider(configDb);
