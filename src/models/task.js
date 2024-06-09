const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Task = db.define('task', {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
});

module.exports = Task;
