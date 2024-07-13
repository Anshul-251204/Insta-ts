class ApiResponse {
    data: any;
    message: string;
    success:boolean;
    constructor(data: any, message: string, success:boolean = true) {
        this.data = data;
        this.message = message;
        this.success = success;
    }
}

export default ApiResponse;
