export class Success<T> {
  constructor(
    private httpStatusCode: number,
    private message?: string,
    private data?: T | T[]
  ) {}

  get JSON() {
    return {
      statusCode: this.httpStatusCode,
      message: this.message,
      data: this.data,
    };
  }
}
