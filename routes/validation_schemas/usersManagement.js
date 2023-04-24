const { userStatus } = require("../../types/enums/users");

exports.getAllUsersQuerySchema = {
  name: {
    isString: { errorMessage: "invalid search" },
    optional: true,
  },
  email: {
    isString: { errorMessage: "invalid search" },
    optional: true,
  },
  phone: {
    isString: { errorMessage: "invalid search" },
    optional: true,
  },
  status: {
    isString: { errorMessage: "invalid search" },
    isIn: { options: Object.values(userStatus) },
    optional: true,
  },
};

exports.createUserSchema = {
  name: {
    isString: { errorMessage: "Name is required" },
    isLength: {
      options: { min: 3 },
      errorMessage: "Name must be at least 3 characters",
    },
  },
  email: {
    isString: { errorMessage: "Email is required" },
    isEmail: { errorMessage: "Please send a valid email" },
    normalizeEmail: {
      options: { trim: true, toLowerCase: true },
    },
  },
  password: {
    isString: { errorMessage: "Password is required" },
    isStrongPassword: { errorMessage: "Password is too poor" },
  },
  phone: {
    isString: { errorMessage: "Phone is required" },
    isMobilePhone: { errorMessage: "Invalid Phone number" },
  },
};

exports.updateUserSchema = {
  name: {
    isString: { errorMessage: "Name is required" },
    isLength: {
      options: { min: 3 },
      errorMessage: "Name must be at least 3 characters",
    },
  },
  email: {
    isString: { errorMessage: "Email is required" },
    isEmail: { errorMessage: "Please send a valid email" },
    normalizeEmail: {
      options: { trim: true, toLowerCase: true },
    },
  },
  phone: {
    isString: { errorMessage: "Phone is required" },
    isMobilePhone: { errorMessage: "Invalid Phone number" },
  },
  status: {
    isString: { errorMessage: "invalid search" },
    isIn: { options: Object.values(userStatus) },
  },
};
