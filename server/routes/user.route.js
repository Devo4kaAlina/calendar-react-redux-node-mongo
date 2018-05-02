const router = require('express').Router();
const routes = require('../constants/routes');
const userController = require('../controllers/user.controller');

router.get('/me', userController.getUserByAccessToken);
router.get(routes.defaultRouter, userController.findAll);
router.post('/singup', userController.createUser);
router.post('/singin', userController.userSingIn);
router.delete(routes.getBy, userController.removeUser);

module.exports = router;
