const express = require('express');
const bodyparser = require('body-parser');
const sequelize = require('./config/database');

const routes = require("./routes");

const corsMiddleware = require('./middlewares/corsMiddleware');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(corsMiddleware);

// Test route
app.get('/', (req, res, next) => {
  res.send('Task.io API');
});

// Routes
app.use(routes);

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