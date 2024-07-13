import authMiddleware from "./auth-middleware";
import errorHandler from "./error-handler-middleware";
import upload from "./mutler-middleware";

export default {
    authMiddleware,
    errorHandler,
    upload,
};
