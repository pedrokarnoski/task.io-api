const { checkAuthMiddleware } = require('../middlewares/checkAuthMiddleware');
const controller = require('../controllers/CommentsController');
const router = require('express').Router();

// Middleware de autenticação
router.use(checkAuthMiddleware);

// CRUD Routes
router.get('/my', controller.getMy); /** /comments/me **/
router.get('/', controller.getComments); /** /comments **/
router.get('/:taskId', controller.getCommentByTaskId); /** /comments/:taskId **/
router.post('/', controller.createComment); /** /comments **/
router.put('/:taskId/:commentId', controller.updateComment); /** /comments/:taskId/:commentId **/
router.delete('/:taskId/:commentId', controller.deleteComment); /** /comments/:taskId/:commentId **/
