import {createLogger, transports, format } from 'winston';
const {combine, timestamp, printf} = format;

const myFormat = printf(({ level, message, timestamp, file }) => {
    return `${timestamp} [${level.toUpperCase()}] ${message} (${file || 'unknown'})`;
  });

const logger = createLogger({
    level: process.env.LOG_LEVEL || 'debug',
    format: combine(
        timestamp(),
        myFormat
    ),
    transports: [
      new transports.Console(),
    ]
});

export default logger;