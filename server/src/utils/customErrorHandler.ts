export class ApiError extends Error {
  statusCode: number;
  errors: any[];
  data: any | null;
  message: string;

  constructor(
    statusCode: number,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.data = null;
    this.message = message;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(404, message);
  }
}
export class ValidationError extends ApiError {
  constructor(message: string) {
    super(400, message);
  }
}
