const { userStatus } = require("../types/enums/users");
const { sendForbiddenError } = require("./middlewaresUtils");

const isActiveUserMiddleware = (req, res, next) => {
  try {
    if (req.user.status !== userStatus.ACTIVE) return sendForbiddenError(res);

    return next();
  } catch (err) {
    return sendForbiddenError(res);
  }
};

module.exports = isActiveUserMiddleware;
