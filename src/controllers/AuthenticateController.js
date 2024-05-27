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

    // console.log('Token:' + token)

    return res
      .cookie('access_token', token, { httpOnly: true, maxAge: 3600000 })
      .status(200)
      .json({
        username: user.username,
      });
  } catch (error) {
    next(new AppError('Erro ao tentar fazer login.', 500));
  }
};
