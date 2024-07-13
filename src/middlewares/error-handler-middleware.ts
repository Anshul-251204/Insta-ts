import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/api-error";
const errorHandler = async (
    err: ApiError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
  
    err.message = err.message || "Something went wrong 🥲";
    err.statusCode = err.statusCode || 500;

    res.status(err.statusCode).json({
        message: err.message,
        success: err.success,
        statusCode: err.statusCode,
    });
};

export default errorHandler;
