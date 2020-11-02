import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggingService extends Logger {
    error = (message: string, trace: string) => super.error(message, trace);
    log = (message: string, trace?: string) =>
        super.log(`my-log ${message}`, trace);
}
