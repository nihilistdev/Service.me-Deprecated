export class ConsoleDebug {
  static error(message: string) {
    console.log(`\x1b[31m[ERROR]:\x1b[0m ${message}`);
  }

  static info(message: string) {
    console.log(`\x1b[33m[INFO]:\x1b[0m ${message}`);
  }
}
