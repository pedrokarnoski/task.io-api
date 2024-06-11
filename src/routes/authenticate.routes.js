const controller = require('../controllers/AuthenticateController');
const router = require('express').Router();

// Authenticate Route
router.post('/authenticate', controller.authenticate); /** /signIn **/
router.post('/sign-out', controller.signOut); /** /signOut **/


module.exports = router;