const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorService = require('./services/error.service');
const routes = require('./constants/routes');
const index = require('./routes/index.route');
const userRoute = require('./routes/user.route');
const eventRoute = require('./routes/event.route');

const app = express();

// Set CORS headers

const corsOptions = {
    origin: ['http://localhost:3000'],
    optionsSuccessStatus: 200,
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(morgan('dev'));
app.use(bodyParser());

app.use(routes.defaultRouter, cors(corsOptions), index);
app.use(routes.userRouter, userRoute);
app.use(routes.eventRouter, eventRoute);
app.use(errorService.notFound);
app.use(errorService.internal);

module.exports = app;
