const { Router } = require("express");
const isAdminMiddleware = require("../middlewares/isAdmin");
const authorizationMiddleware = require("../middlewares/authorization");
const validateRequest = require("../middlewares/validateRequest");
const {
  getAllUsersQuerySchema,
} = require("./validation_schemas/usersManagement");
const { paginationSchema } = require("./validation_schemas/global");
const {
  getAllUsersController,
} = require("../controllers/usersManagementController");

const usersManagementRouter = Router();

// All Routes will go through these middlewares [ADMIN only]
usersManagementRouter.use(authorizationMiddleware, isAdminMiddleware);

// GET All USERS
usersManagementRouter.get(
  "/",
  validateRequest({ ...paginationSchema, ...getAllUsersQuerySchema }, "query"),
  getAllUsersController
);

module.exports = usersManagementRouter;
