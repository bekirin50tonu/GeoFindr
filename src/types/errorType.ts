


export default interface ICustomError {
  code: number;
  message: string;
}

export class CustomError implements ICustomError {
  code: number;
  message: string;

  constructor(code: number, message: string) {
    this.code = code;
    this.message = message;
  }

}
