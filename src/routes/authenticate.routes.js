const controller = require('../controllers/AuthenticateController');
const router = require('express').Router();

// Authenticate Route
router.post('/', controller.authenticate); /** /signIn **/

module.exports = router;