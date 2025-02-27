class ResponseHandler {
  statusCode: number;
  data?: any;
  message: string;
  success: boolean;
  constructor(statusCode: number, message = "success", data?: any) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export default ResponseHandler;
