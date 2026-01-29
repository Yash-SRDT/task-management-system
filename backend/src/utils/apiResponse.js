// export const successResponse = (res, { statusCode = 200, message = "Success", data = null } = {}) => {
//   return res.status(statusCode).json({
//     status: "success",
//     message,
//     data,
//   });
// };

// export const errorResponse = (res, { statusCode = 500, message = "Something went wrong" } = {}) => {
//   return res.status(statusCode).json({
//     status: "error",
//     message,
//   });
// };

export const successResponse = (res, { statusCode = 200, message = "Success", data = [] }) => {
  return res.status(statusCode).json({
    status: "success",
    message,
    data: Array.isArray(data) ? data : [data],
  });
};

export const errorResponse = (res, { statusCode = 500, message = "Something went wrong", errors = null }) => {
  return res.status(statusCode).json({
    status: "error",
    message,
    errors,
  });
};
