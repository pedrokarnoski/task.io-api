const cors = require('cors');

const allowedOrigins = {
  development: process.env.DEV_ORIGIN,
  production: process.env.PROD_ORIGIN
};

const corsOptions = {
  origin: function (origin, callback) {
    const env = process.env.NODE_ENV || 'development';
    const allowedOrigin = allowedOrigins[env];

    if (origin === allowedOrigin || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
