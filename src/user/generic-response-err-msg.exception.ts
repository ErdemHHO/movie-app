import { HttpException } from '@nestjs/common';

export class GenericResponseErrMsg extends HttpException {
  constructor(error?: string, operation?: number, config?: Object) {
    const message = {
      error,
      operation,
      config,
    };
    super(message, operation);
  }
}
