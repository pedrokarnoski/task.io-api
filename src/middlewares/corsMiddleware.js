const cors = require('cors');

const allowedOrigins = {
  development: [process.env.DEV_ORIGIN],
  production: [process.env.PROD_ORIGIN, 'https://task-io.koyeb.app']
};

const corsOptions = {
  origin: function (origin, callback) {
    const env = process.env.NODE_ENV || 'development';
    const allowedOrigin = allowedOrigins[env];

    if (!origin || allowedOrigin.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  credentials: true,
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
