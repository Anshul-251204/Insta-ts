class ApiError extends Error {
    statusCode: number;
    message: string;
    success: boolean;
    constructor(statusCode: number, message: string, success: boolean = false) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.stack = process.env.NODE_ENV === "development" ? this.stack : "";
        this.success = success;
    }
}

export default ApiError;
