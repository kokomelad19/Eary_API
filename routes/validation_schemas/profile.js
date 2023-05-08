exports.updateProfileSchema = {
  name: {
    isString: { errorMessage: "Name is required" },
    isLength: {
      options: { min: 3 },
      errorMessage: "Name must be at least 3 characters",
    },
    optional: true,
  },
  email: {
    isString: { errorMessage: "Email is required" },
    isEmail: { errorMessage: "Please send a valid email" },
    normalizeEmail: {
      options: { trim: true, toLowerCase: true },
    },
    optional: true,
  },
  phone: {
    isString: { errorMessage: "Phone is required" },
    isMobilePhone: { errorMessage: "Invalid Phone number" },
    optional: true,
  },
  password: {
    isString: { errorMessage: "Password is required" },
    isStrongPassword: { errorMessage: "Password is too poor" },
    optional: true,
  },
};
