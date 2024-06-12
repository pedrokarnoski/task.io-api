const { Router } = require("express");
const routes = Router();

const authenticateRouter = require("./authenticate.routes");
const usersRouter = require("./users.routes");
const tasksRouter = require("./tasks.routes");
const commentsRouter = require("./comments.routes");

routes.use("/", authenticateRouter);
routes.use("/users", usersRouter);
routes.use("/tasks", tasksRouter);
routes.use("/comments", commentsRouter);

module.exports = routes;