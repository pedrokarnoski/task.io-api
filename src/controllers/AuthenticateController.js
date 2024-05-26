const User = require('../models/user');
const AppError = require("../utils/AppError");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// SignIn
exports.authenticate = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return next(new AppError('Usuário não encontrado.', 401));
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return next(new AppError('Senha inválida.', 401));
    }

    const token = jwt.sign({ id: user.id, username: user.username }, 'seu_segredo_jwt', { expiresIn: '1h' });

    console.log('Token:', token)

    res.status(200).json({ token });
  } catch (error) {
    next(new AppError('Erro ao tentar fazer login.', 500));
  }
};
