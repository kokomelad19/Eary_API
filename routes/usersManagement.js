const { Router } = require("express");
const isAdminMiddleware = require("../middlewares/isAdmin");
const authorizationMiddleware = require("../middlewares/authorization");
const validateRequest = require("../middlewares/validateRequest");
const {
  getAllUsersQuerySchema,
  createUserSchema,
  updateUserSchema,
} = require("./validation_schemas/usersManagement");
const { paginationSchema } = require("./validation_schemas/global");
const {
  getAllUsersController,
  createUserController,
  updateUserController,
  deleteUserController,
  getUserByIdController,
} = require("../controllers/usersManagementController");

const usersManagementRouter = Router();

// All Routes will go through these middlewares [ADMIN only]
usersManagementRouter.use(authorizationMiddleware, isAdminMiddleware);

// GET USER BY ID
usersManagementRouter.get("/:userId", getUserByIdController);

// GET All USERS
usersManagementRouter.get(
  "/",
  validateRequest({ ...paginationSchema, ...getAllUsersQuerySchema }, "query"),
  getAllUsersController
);

// CREATE USER
usersManagementRouter.post(
  "/",
  validateRequest(createUserSchema),
  createUserController
);

// UPDATE USER
usersManagementRouter.put(
  "/:userId",
  validateRequest(updateUserSchema),
  updateUserController
);

// DELETE USER
usersManagementRouter.delete("/:userId", deleteUserController);

module.exports = usersManagementRouter;
