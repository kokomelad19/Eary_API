exports.loginSchema = {
  email: {
    isString: { errorMessage: "Email is required" },
    isEmail: { errorMessage: "Please send a valid email" },
  },
  password: {
    isString: { errorMessage: "Password is required" },
    notEmpty: { errorMessage: "Password is required" },
  },
};

exports.registerSchema = {
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
