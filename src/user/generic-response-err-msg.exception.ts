import { HttpException } from '@nestjs/common';
import { GenericResponseErrConfig } from './generic-response-err-config.type';

export class GenericResponseErrMsg extends HttpException {
  constructor(
    error?: string,
    operation?: number,
    config?: GenericResponseErrConfig,
  ) {
    const message = {
      error,
      operation,
      config,
    };
    super(message, operation);
  }
}
