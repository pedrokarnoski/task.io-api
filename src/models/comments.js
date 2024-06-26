const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Comments = db.define("comments", {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  taskId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Comments;
