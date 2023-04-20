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
    query: { trim: true },
  },
  password: {
    isString: { errorMessage: "Password is required" },
    isLength: {
      options: { min: 8 },
      errorMessage: "Password must be at least 8 characters",
    },
  },
  phone: {
    isString: { errorMessage: "Phone is required" },
    isMobilePhone: { errorMessage: "Invalid Phone number" },
  },
};
