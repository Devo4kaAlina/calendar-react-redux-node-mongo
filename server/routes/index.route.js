const router = require('express').Router();
const routes = require('../constants/routes');
const codes = require('http-status-codes');

router.get(routes.defaultRouter, (req, res) => {
    res.json({
        code: codes.OK,
        message: 'Working default route GET',
    });
});

router.post(routes.defaultRouter, (req, res) => {
    res.json({
        code: codes.OK,
        body: req.body,
        message: 'Working default route POST',
    });
});

module.exports = router;
