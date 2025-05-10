import CustomApiError from "./CustomApiError.js";
import { StatusCodes } from "http-status-codes";

class UnauthorizedError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statuCode = StatusCodes.FORBIDDEN;
  }
}

export default UnauthorizedError;
