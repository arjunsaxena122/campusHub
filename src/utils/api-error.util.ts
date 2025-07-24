class ApiError extends Error {
  public data: null;
  public success: boolean;

  constructor(
    public statusCode: number,
    public message: string = "Something went wrong",
    public errors: any[] = [],
    public stack: string = "",
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.success = false;
    this.data = null;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
