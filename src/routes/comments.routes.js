const { checkAuthMiddleware } = require('../middlewares/checkAuthMiddleware');
const controller = require('../controllers/CommentsController');
const router = require('express').Router();

// Middleware de autenticação
router.use(checkAuthMiddleware);

// CRUD Routes
router.get('/:taskId', controller.getCommentByTaskId); /** /comments/:taskId **/
router.post('/', controller.createComment); /** /comments **/
router.delete('/:commentId', controller.deleteComment); /** /comments/:commentId/ **/

module.exports = router;