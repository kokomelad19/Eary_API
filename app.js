const express = require("express");
const {
  notFoundRouterController,
} = require("./controllers/notFoundRouteController");
const authRouter = require("./routes/auth");
const { errorController } = require("./controllers/errorController");
const profileRouter = require("./routes/profile");
const usersManagementRouter = require("./routes/usersManagement");

const app = express();

//#region Global Middlewares
app.use(express.json());
//#endregion

//#region App Routes
const mainRouter = express.Router();
app.use("/api", mainRouter);
app.use("*", notFoundRouterController);

mainRouter.use("/auth", authRouter);
mainRouter.use("/profile", profileRouter);
mainRouter.use("/users-management", usersManagementRouter);
//#endregion

//#region Global Error Handler
app.use(errorController);
//#endregion

module.exports = app;
