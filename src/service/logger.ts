import * as winston from 'winston';

class logger {
    private _logger: any;

    constructor () {
        this._logger = null;
    }

    loggerInit () {
        winston.emitErrs = true;

        function zeroFill (num: number, digit: number): string {
            let filledNum: string = num + '';
            if (digit === 2) {
                return filledNum.length < 2 ? '0' + filledNum : filledNum;
            } else if (digit === 3) {
                if( filledNum.length == 1 ){
                    return '00' + filledNum;
                }else if( filledNum.length == 2 ){
                    return '0' + filledNum;
                }else {
                    return filledNum;
                }
            } else {
                return filledNum;
            }
        }

        function timestampBuilder (): string {
            const date: Date = new Date();
            const tz: number = date.getTime() + (date.getTimezoneOffset() * 60000) + (9 * 3600000);
            date.setTime(tz);

            const curr_hour: string = zeroFill(date.getHours(), 2);
            const curr_min: string = zeroFill(date.getMinutes(), 2);
            const curr_sec: string = zeroFill(date.getSeconds(), 2);
            const curr_msec: string = zeroFill(date.getMilliseconds(), 3);

            return curr_hour+":"+curr_min+":"+curr_sec+"."+curr_msec;
        }

        function logFormatter (options: any): string {
            return '['+ options.timestamp() +' '+ options.level.toUpperCase() +']'+ (undefined !== options.message ? options.message : '') +
                (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
        }

        this._logger = new winston.Logger( {
            transports: [
                new winston.transports.DailyRotateFile( {
                    filename: __dirname + '/../../logs/control_',
                    datePattern: 'yyyy-MM-dd.log',
                    level: 'debug',
                    handleExceptions: true,
                    json: false,
                    colorize: true,
                    maxFiles: 10,
                    maxsize: 1*1024*1024*1024,
                    timestamp: timestampBuilder,
                    formatter: logFormatter
                }),
                new winston.transports.Console({
                    level: 'debug',
                    handleExceptions: true,
                    json: false,
                    colorize: true,
                    timestamp: timestampBuilder,
                    formatter: logFormatter
                })
            ],
            exitOnError: false
        });
    }

    debug (msg: string) {
        this.logWrite(msg, 'debug');
    }

    info (msg: string) {
        this.logWrite(msg, 'info');
    }

    warning (msg: string) {
        this.logWrite(msg, 'warning');
    }

    error (msg: string) {
        this.logWrite(msg, 'error');
    }

    private logWrite (msg: string, loglevel: string) {
        if (this._logger) {
            if (loglevel === 'debug') {
                if (this._logger.debug) {
                    this._logger.debug(msg);
                }
            } else if (loglevel === 'info') {
                if (this._logger.info) {
                    this._logger.info(msg);
                }
            } else if (loglevel === 'warning') {
                if (this._logger.warningLog) {
                    this._logger.warningLog(msg);
                }
            } else if (loglevel === 'error') {
                if (this._logger.error) {
                    this._logger.error(msg);
                }
            }
        }
    }
}

export default new logger();
