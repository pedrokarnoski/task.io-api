const Sequelize = require('sequelize');
let dotenv = require('dotenv').config();

const sequelize = new Sequelize(
  dotenv.parsed.POSTGRES_DB,
  dotenv.parsed.POSTGRES_USER,
  dotenv.parsed.POSTGRES_PASSWORD,
  {
    host: dotenv.parsed.POSTGRES_HOST,
    dialect: 'postgres',
  }
);

module.exports = sequelize;