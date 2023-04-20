exports.controllerCatchAsync = (fn) => {
  return (req, res, next) => {
    return fn(req, res, next).catch(next);
  };
};

exports.catchAsync = (fn) => {
  return (...arguments) => {
    return fn(...arguments).catch((err) => {
      throw err;
    });
  };
};
