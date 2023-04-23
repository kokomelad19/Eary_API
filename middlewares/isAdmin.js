const { userTypes } = require("../types/enums/users");
const { sendForbiddenError } = require("./middlewaresUtils");

const isAdminMiddleware = (req, res, next) => {
  try {
    if (req.user.type === userTypes.ADMIN) return next();

    return sendForbiddenError(res);
  } catch (err) {
    return sendForbiddenError(res);
  }
};

module.exports = isAdminMiddleware;
