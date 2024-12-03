import { StatusCodes } from "http-status-codes";

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const errorMessage = err.message || "Something went wrong";
  console.log({statusCode, errorMessage});
  
  res.status(statusCode).json({ msg: errorMessage });
};

export default errorHandler;
