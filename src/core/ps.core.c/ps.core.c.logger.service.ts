import { Injectable, Logger } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf } = format;

@Injectable()
export class LoggerService extends Logger {
  constructor() {
    super();

    const myFormat = printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level}] ${message}`;
    });

    const logger = createLogger({
      level: 'info',
      format: combine(timestamp(), myFormat),
      transports: [
        new transports.File({
          filename: 'logs/app.log',
        }),
      ],
    });

    this.log = logger.info.bind(logger);
    this.warn = logger.warn.bind(logger);
    this.error = logger.error.bind(logger);
    this.debug = logger.debug.bind(logger);
    this.verbose = logger.verbose.bind(logger);
  }
}
