const express = require('express');
const bodyparser = require('body-parser');
const sequelize = require('./config/database');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// Test route
app.get('/', (req, res, next) => {
  res.send('Task.io API');
});

// CRUD routes
app.use('/users', require('./routes/users'));

// Error handling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

// Sync database
sequelize
  .sync()
  .then(result => {
    console.log("Conectado ao banco de dados. 🎉");
    app.listen(3333);
  })
  .catch(err => console.log(err));