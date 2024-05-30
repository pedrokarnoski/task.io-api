const User = require('../models/user');
const AppError = require("../utils/AppError");
const bcrypt = require('bcryptjs');

// Get all users
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    if (!users || users.length === 0) {
      next(new AppError('Nenhum usuário encontrado.', 404));
    }
    res.status(200).json({ users });
  } catch (error) {
    next(new AppError('Erro ao buscar usuários.', 500));
  }
};

// Get user by id
exports.getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findByPk(userId);
    if (!user) {
      next(new AppError('Usuário não encontrado.', 404));
    }
    res.status(200).json(user);
  } catch (error) {
    next(new AppError('Erro ao buscar usuário.', 500));
  }
};

// Create user
exports.createUser = async (req, res, next) => {
  try {
    const { name, username, password } = req.body;

    if (!name || !username || !password) {
      next(new AppError("Informe todos os campos (nome, usuário e senha)."));
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({ name, username, password: hashedPassword });

    res.status(201).json({ user });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      // Username already exists
      return next(new AppError('Escolha outro nome de usuário.'));
    }

    next(new AppError('Erro ao criar usuário.', 500));
  }
};

// Update user
exports.updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { name, oldPassword, newPassword } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      next(new AppError("Usuário não encontrado", 404));
    }

    if (newPassword && !oldPassword) {
      next(AppError(
        "Você precisa informar a senha antiga para definir a nova senha.",
      ));
    }

    if (!newPassword && oldPassword) {
      next(AppError("Informe a nova senha."));
    }

    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordCorrect) {

      next(new AppError('Senha antiga incorreta.'));
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    user.name = name;
    user.password = hashedNewPassword;

    await user.save();

    return res.status(200).json({ user });
  } catch (error) {
    console.error(error)
    next(new AppError('Erro ao atualizar usuário.', 500));
  }
};

// Delete user
exports.deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId);

    if (!user) {
      next(new AppError('Usuário não encontrado.', 404));
    }

    await user.destroy();

    res.status(204).send();
  } catch (error) {
    next(new AppError('Erro ao deletar usuário.', 500));
  }
};
