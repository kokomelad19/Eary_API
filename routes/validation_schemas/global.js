exports.paginationSchema = {
  page: {
    isInt: { errorMessage: "Please send a valid page number", min: 1 },
    optional: true,
  },
  size: {
    isInt: { errorMessage: "Please send a valid page size number", min: 1 },
    optional: true,
  },
};
