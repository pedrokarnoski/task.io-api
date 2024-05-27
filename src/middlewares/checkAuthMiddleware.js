const jwt = require('jsonwebtoken');
const AppError = require("../utils/AppError");

exports.checkAuthMiddleware = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(new AppError('Você precisa estar logado para acessar essa página.', 401));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(new AppError('Token inválido.', 403));
    }

    req.user = {
      id: user
    }
    next();
  })
}