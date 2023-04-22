const loginSchema = {
  email: {
    isString: { errorMessage: "Email is required" },
    isEmail: { errorMessage: "Please send a valid email" },
  },
  password: {
    isString: { errorMessage: "Password is required" },
    notEmpty: { errorMessage: "Password is required" },
  },
};

module.exports = loginSchema;
