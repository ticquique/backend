export interface LoggerInterface {
    debug(message: string, ...args: any[]): void;
    info(message: string, ...args: any[]): void;
    warn(message: string, ...args: any[]): void;
    error(message: string, ...args: any[]): void;
    sql(message: string, ...args: any[]): void;
    http(message: string, ...args: any[]): void;
    socket(message: string, ...args: any[]): void;
}
