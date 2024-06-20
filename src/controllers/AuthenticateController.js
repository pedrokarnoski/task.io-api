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

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res
      .cookie('access_token', token, {
        httpOnly: true,
        maxAge: 3600000,
        secure: true, // Somente enviar o cookie em conexões HTTPS
        sameSite: 'None', // Permitir enviar o cookie cross-site
      })
      .status(200)
      .json({
        username: user.username,
      });
  } catch (error) {
    next(new AppError('Erro ao tentar fazer login.', 500));
  }
};

// SignOut
exports.signOut = (req, res) => {
  res.clearCookie('access_token', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

  return res.status(200).json({ message: 'Logout realizado com sucesso.' });
};
