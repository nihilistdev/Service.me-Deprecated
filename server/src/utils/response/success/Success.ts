export class Success {
  constructor(
    private readonly httpStatusCode: number,
    private readonly message?: string,
    private readonly data?: any
  ) {}

  get JSON() {
    return {
      statusCode: this.httpStatusCode,
      message: this.message,
      data: this.data,
    };
  }
}
