import * as path from 'path';
import * as winston from 'winston';
import { env } from '../../env';
const { createLogger, format, transports } = winston;
const { combine, timestamp, printf, colorize, align } = format;

const logLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        sql: 4,
        socket: 5,
        debug: 6,
    },
    colors: {
        error: 'red',
        warn: 'darkred',
        info: 'green',
        http: 'cyan',
        sql: 'blue',
        socket: 'blue',
        debug: 'gray',
    },
};

export class Logger {

    public static DEFAULT_SCOPE = 'app';

    private static parsePathToScope(filepath: string): string {
        if (filepath.indexOf(path.sep) >= 0) {
            filepath = filepath.replace(process.cwd(), '');
            filepath = filepath.replace(`${path.sep}src${path.sep}`, '');
            filepath = filepath.replace(`${path.sep}dist${path.sep}`, '');
            filepath = filepath.replace('.ts', '');
            filepath = filepath.replace('.js', '');
            filepath = filepath.replace(path.sep, ':');
        }
        return filepath;
    }

    private logger: any;

    private scope: string;

    constructor(scope?: string) {
        this.initialize();
        this.scope = Logger.parsePathToScope((scope) ? scope : Logger.DEFAULT_SCOPE);
    }

    public debug(message: string, ...args: any[]): void {
        this.log('debug', message, args);
    }

    public sql(message: string, ...args: any[]): void {
        this.log('sql', message, args);
    }

    public http(message: string, ...args: any[]): void {
        message = message.substring(0, message.lastIndexOf('\n'));
        this.log('http', message, args);
    }

    public info(message: string, ...args: any[]): void {
        this.log('info', message, args);
    }

    public warn(message: string, ...args: any[]): void {
        this.log('warn', message, args);
    }

    public error(message: string, ...args: any[]): void {
        this.log('error', message, args);
    }

    public socket(message: string, ...args: any[]): void {
        this.log('socket', message, args);
    }

    private log(level: string, message: string, args: any[]): void {
        if (winston) {
            this.logger.log(level, `${this.formatScope()} ${message}`, args);
        }
    }

    private initialize(): void {
        const myFormat = combine(
            colorize(),
            timestamp(),
            align(),
            printf(info => {
                const ts = info.timestamp.slice(0, 19).replace('T', ' ');
                return `${ts} ${info.level}: ${info.message}`;
            })
        );
        if (winston) {
            winston.addColors(
                logLevels
            );
            this.logger = createLogger({
                level: env.log.level,
                transports: [
                    new transports.Console(),
                ],
                json: env.log.json,
                format: myFormat,
                levels: logLevels.levels,
                handleExceptions: true,
            });
        }
    }

    private formatScope(): string {
        return `[${this.scope}]`;
    }

}
