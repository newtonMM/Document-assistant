export class CustomError extends Error {
  message: string;
  code: number;

  constructor({ message, code }: { message: string; code: number }) {
    super();
    this.message = message;
    this.code = code;
  }
}
