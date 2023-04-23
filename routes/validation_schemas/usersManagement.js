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
    in: Object.values(userStatus),
    optional: true,
  },
};
