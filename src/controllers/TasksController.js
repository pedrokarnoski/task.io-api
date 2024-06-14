const Task = require('../models/task');
const Comments = require("../models/Comments");
const AppError = require("../utils/AppError");

// Get all tasks
exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.findAll();

    if (!tasks || tasks.length === 0) {
      next(new AppError('Nenhum tarefa encontrado.', 404));
    }

    res.status(200).json({ tasks });
  } catch (error) {
    next(new AppError('Erro ao buscar tarefas.', 500));
  }
};

// Get task by id
exports.getTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findByPk(taskId);

    if (!task) {
      next(new AppError('Tarefa não encontrada.', 404));
    }

    res.status(200).json(task);
  } catch (error) {
    next(new AppError('Erro ao buscar tarefa.', 500));
  }
};

// Create task
exports.createTask = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      next(new AppError('Usuário não autenticado.', 401));
    }

    const userId = req.user.id;

    const { description } = req.body;

    if (!description) {
      next(new AppError("Informe a descrição da tarefa."));
    }

    const task = await Task.create({ description, userId });

    res.status(201).json({ task });
  } catch (error) {
    next(new AppError('Erro ao criar tarefa.', 500));
  }
};

// Update task
exports.updateTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { description, completed } = req.body;

    const task = await Task.findByPk(taskId);

    if (!task) {
      next(new AppError("Tarefa não encontrada", 404));
    }

    if (description !== undefined) {
      task.description = description;
    }

    if (completed !== undefined) {
      task.completed = completed;
    }

    await task.save();

    return res.status(200).json(task);
  } catch (error) {
    console.error(error)
    next(new AppError('Erro ao atualizar tarefa.', 500));
  }
};

// Delete task
exports.deleteTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findByPk(taskId);

    if (!task) {
      next(new AppError('Tarefa não encontrada.', 404));
    }

    // Task related comments
    const comments = await Comments.findAll({ where: { taskId } });

    for (let comment of comments) {
      await comment.destroy();
    }

    await task.destroy();

    res.status(204).send();
  } catch (error) {
    next(new AppError('Erro ao deletar tarefa.', 500));
  }
};

// Current user tasks
exports.getMy = async (req, res, next) => {
  try {
    const { userId } = req.user.id;

    const tasks = await Task.findAll({ where: userId });

    if (!tasks) {
      next(new AppError('Sem tarefas cadastradas.', 404));
    }

    res.status(200).json({ tasks });
  } catch (error) {
    next(new AppError('Erro ao buscar usuário.', 500));
  }
};
