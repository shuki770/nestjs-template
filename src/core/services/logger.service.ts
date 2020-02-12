import { Injectable, Logger, LoggerService as NestLoggerService } from '@nestjs/common';
import { formatWithOptions } from 'util';

@Injectable()
export class LoggerService implements NestLoggerService {
  private readonly logger: Logger;
  private readonly context: string;

  constructor(context?: string) {
    this.logger = new Logger(context, true);
    this.context = context;
  }

  static createLogger(context?: string): LoggerService {
    return new LoggerService(context);
  }

  public log(message: string, ...args: any[]) {
    this.logger.log(this.format(message, args));
  }

  public error(message: string, error?: string | Error, ...args: any[]) {
    this.logger.error(this.format(message, args), error instanceof Error ? error.stack : error);
  }

  public warn(message: string, ...args: any[]) {
    this.logger.warn(this.format(message, args));
  }

  public debug(message: string, ...args: any[]) {
    this.logger.debug(this.format(message, args));
  }

  public verbose(message: string, ...args: any[]) {
    this.logger.verbose(this.format(message, args));
  }

  private format(message: string, args?: string[]) {
    if (!args.length) return message;

    return formatWithOptions({ colors: true, depth: 5 }, message, ...args);
  }
}
