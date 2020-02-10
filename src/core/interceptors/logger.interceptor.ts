import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from '../services/logger.service';
import { Request, Response } from 'express';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private readonly logger: LoggerService = new LoggerService(LoggerInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = Date.now();
    const contextType = context.getType();


    return next.handle().pipe(
      tap(
        () => {
          if (contextType === 'http') {
            const reqTime = Date.now() - startTime;
            this.logHttpRequest(context, reqTime)
          }
        },
        (error: Error) => {
          if (contextType === 'http') {
            const reqTime = Date.now() - startTime;
            this.logHttpRequest(context, reqTime)
          }
        },
      ),
    );
  }

  private logHttpRequest(context: ExecutionContext, reqTime: number) {
    if (context.getType() !== 'http') return;
    const controllerName = context.getClass().name;
    const handlerName = context.getHandler().name;
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const { url, method } = request;
    const { statusCode } = response;


    this.logger.log(`${method.toUpperCase()} ${url} ${statusCode} [${controllerName}:${handlerName}] ${reqTime}ms`);
  }
}
