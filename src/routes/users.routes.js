const { checkAuthMiddleware } = require('../middlewares/checkAuthMiddleware');
const controller = require('../controllers/UsersController');
const router = require('express').Router();

// Middleware de autenticação
router.use(checkAuthMiddleware);

// CRUD Routes
router.get('/', controller.getUsers); /** /users **/
router.get('/:userId', controller.getUser); /** /users/:userId **/
router.post('/', controller.createUser); /** /users **/
router.put('/:userId', controller.updateUser); /** /users/:userId **/
router.delete('/:userId', controller.deleteUser); /** /users/:userId **/

module.exports = router;