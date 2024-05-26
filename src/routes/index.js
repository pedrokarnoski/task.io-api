const { Router } = require("express");
const routes = Router();

const usersRouter = require("./users.routes");
const authenticateRouter = require("./authenticate.routes");

routes.use("/users", usersRouter);
routes.use("/authenticate", authenticateRouter);

module.exports = routes;