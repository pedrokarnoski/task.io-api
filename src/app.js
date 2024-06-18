require('dotenv').config()
const express = require('express');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const sequelize = require('./config/database');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger.json');

const routes = require("./routes");

const corsMiddleware = require('./middlewares/corsMiddleware');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

app.use(corsMiddleware);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

// Test route
app.get('/', (req, res, next) => {
  res.send('Task.io API');
});

// Routes
app.use("/v1", routes);

// Error handling
app.use(errorMiddleware);

// Sync database
sequelize
  .sync()
  .then(result => {
    console.log("Conectado ao banco de dados. 🎉");
    app.listen(3333);
  })
  .catch(err => console.log(err));