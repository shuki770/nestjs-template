import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { startCase } from 'lodash';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException | Error, host: ArgumentsHost): void {
    if (host.getType() !== 'http') return;
 
    const response = host.switchToHttp().getResponse<Response>();
    const isProd = process.env.NODE_ENV === 'production'
    const statusCode = 'getStatus' in exception ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = !isProd
        ? exception.message
        : startCase((HttpStatus[statusCode] || HttpStatus[HttpStatus.INTERNAL_SERVER_ERROR]).toLowerCase())

    const responseObject: any = {
      message,
      statusCode,
    };

    if (!isProd && exception.stack) {
      responseObject.error = exception.stack;
    }

    response.status(statusCode).send(responseObject);
  }
}
