import CustomApiError from "../errors/CustomApiError.js";
import { StatusCodes } from "http-status-codes";

const ErrorHandler = (err, req, res, next) => {
  if (err instanceof CustomApiError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  if (err.name === "CastError") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: `${err.value} is not valid id` });
  }

  if (err.code === 11000) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: `Duplicate Value Entered For ${Object.keys(err.keyValues)}`,
    });
  }

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: "Something Went Wrong" });
};

export default ErrorHandler;
