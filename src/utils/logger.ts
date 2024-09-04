import { createLogger, format, transports, Logger as WinstonLogger } from 'winston';
import * as path from 'path';
import { fileURLToPath } from 'url';
import moment from 'moment-timezone';
import 'dotenv/config';

class Logger {
    private logger: WinstonLogger;
    private timezone: string;

    constructor() {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        this.timezone = process.env.API_TIMEZONE || 'UTC';
        const logFilePath = path.join(__dirname, '..', '..', 'bot.log');

        this.logger = createLogger({
            level: 'info',
            format: format.combine(
                format.timestamp({
                    format: () => moment().tz(this.timezone).format('YYYY-MM-DD HH:mm:ss')
                }),
                format.printf(info => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`)
            ),
            transports: [
                new transports.File({ filename: logFilePath }),
                new transports.Console()
            ],
        });
    }

    public log(message: string): void {
        this.logger.info(message);
    }

    public error(message: string): void {
        this.logger.error(message);
    }

    public warn(message: string): void {
        this.logger.warn(message);
    }

    public debug(message: string): void {
        this.logger.debug(message);
    }
}

export default Logger;