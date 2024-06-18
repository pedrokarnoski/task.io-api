const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.POSTGRES_CONNECTION, {
  dialect: 'postgres',
});

module.exports = sequelize;