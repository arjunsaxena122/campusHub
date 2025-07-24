class APiResponse {
  public success: boolean;
  constructor(
    public statusCode: number,
    public message: string | object,
    public data: any = "No data available",
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = statusCode < 400;
  }
}

export default APiResponse