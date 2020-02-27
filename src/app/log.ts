import { formatDate } from '@angular/common';
import { environment } from '../environments/environment';

export enum LogLevel {
    All = 0,
    Debug = 1,
    Info = 2,
    Warn = 3,
    Error = 4,
    Fatal = 5,
    Off = 6
  }

  export class Log {
    constructor(private name: string, private logLevel?: LogLevel) {
        if (logLevel == undefined) {
            this.logLevel = LogLevel.Debug;
        }
    }

    private shouldLog(logLevel: LogLevel): boolean {
        return (logLevel >= this.logLevel);
    }

    private log(logLevel: LogLevel, logMessage: string) {
        if (this.shouldLog(logLevel)) {
            console.log(formatDate(new Date() ,'dd/MM/yyyy HH:mm:ss', 'en-UK') + ' ' + this.name + ' ' + logMessage);
        }
    }

    private err(logLevel: LogLevel, logMessage: string) {
        if (this.shouldLog(logLevel)) {
            console.error(formatDate(new Date() ,'dd/MM/yyyy HH:mm:ss', 'en-UK') + ' ' + this.name + ' ' + logMessage);
        }
    }

    public debug(logMessage: string): void {
        this.log(LogLevel.Debug, logMessage);
    }

    public info(logMessage: string): void {
        this.log(LogLevel.Info, logMessage);
    }

    public warn(logMessage: string): void {
        this.log(LogLevel.Warn, logMessage);
    }

    public error(logMessage: string): void {
        this.err(LogLevel.Error, logMessage);
    }

    public fatal(logMessage: string): void {
        this.err(LogLevel.Fatal, logMessage);
    }
}
