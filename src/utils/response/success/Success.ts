export class Success {
  constructor(
    private httpStatusCode: number,
    private message?: string,
    private data?: any
  ) {}

  get JSON() {
    return {
      statusCode: this.httpStatusCode,
      message: this.message,
      data: this.data,
    };
  }
}
