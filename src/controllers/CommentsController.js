const Comments = require("../models/comments");
const AppError = require("../utils/AppError");

// Get all comments
exports.getComments = async (req, res, next) => {
  try {
    const comments = await Comments.findAll();

    if (!comments || comments.length === 0) {
      next(new AppError("Nenhum comentário encontrado.", 404));
    }

    res.status(200).json({ comments });
  } catch (error) {
    next(new AppError("Erro ao buscar comentários.", 500));
  }
};

// Get comments by task id
exports.getCommentByTaskId = async (req, res, next) => {
  try {
    const { taskId } = req.params;

    const comments = await Comments.findAll({ where: { taskId } });

    if (!comments || comments.length === 0) {
      next(new AppError("Nenhum comentário encontrado.", 404));
    }

    res.status(200).json({ comments });
  } catch (error) {
    next(new AppError("Erro ao buscar comentários.", 500));
  }
};

// Create comment on a task
exports.createComment = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      next(new AppError("Usuário não autenticado.", 401));
    }

    const userId = req.user.id;
    const { taskId, content } = req.body;

    if (!taskId || !content) {
      next(new AppError("Informe a tarefa e a descrição do comentário."));
    }

    const comment = await Comments.create({ taskId, userId, content });

    res.status(201).json({ comment });
  } catch (error) {
    next(new AppError("Erro ao criar comentário.", 500));
  }
};

// Update comment by id
exports.updateComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    const comment = await Comments.findByPk(commentId);

    if (!comment) {
      next(new AppError("Comentário não encontrado.", 404));
    }

    comment.content = content;
    await comment.save();

    res.status(200).json({ comment });
  } catch (error) {
    next(new AppError("Erro ao atualizar comentário.", 500));
  }
};

// Delete comment by id
exports.deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    const comment = await Comments.findByPk(commentId);

    if (!comment) {
      next(new AppError("Comentário não encontrado.", 404));
    }

    await comment.destroy();

    res.status(204).send();
  } catch (error) {
    next(new AppError("Erro ao deletar comentário.", 500));
  }
};