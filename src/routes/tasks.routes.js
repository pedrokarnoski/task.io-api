const { checkAuthMiddleware } = require('../middlewares/checkAuthMiddleware');
const controller = require('../controllers/TasksController');
const router = require('express').Router();

// Middleware de autenticação
router.use(checkAuthMiddleware);

// CRUD Routes
router.get('/my', controller.getMy); /** /tasks/me **/
router.get('/', controller.getTasks); /** /tasks **/
router.get('/:taskId', controller.getTask); /** /tasks/:taskId **/
router.post('/', controller.createTask); /** /tasks **/
router.put('/:taskId', controller.updateTask); /** /tasks/:taskId **/
router.delete('/:taskId', controller.deleteTask); /** /tasks/:taskId **/

module.exports = router;