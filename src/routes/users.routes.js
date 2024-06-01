const { checkAuthMiddleware } = require('../middlewares/checkAuthMiddleware');
const controller = require('../controllers/UsersController');
const router = require('express').Router();

router.post('/', controller.createUser); /** /users **/

// Middleware de autenticação
router.use(checkAuthMiddleware);

// CRUD Routes
router.get('/me', controller.getMe); /** /users/me **/
router.get('/', controller.getUsers); /** /users **/
router.get('/:userId', controller.getUser); /** /users/:userId **/
router.put('/:userId', controller.updateUser); /** /users/:userId **/
router.delete('/:userId', controller.deleteUser); /** /users/:userId **/

module.exports = router;