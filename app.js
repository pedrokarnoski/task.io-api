const express = require('express');
const routes = require('./routes/routes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));

app.use( '/api', routes);

app.listen(3333, function () {
  console.log("🔥 Servidor no http://localhost:3333");
});
