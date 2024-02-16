import { config } from './config';

export class Logger {
    static isProd = config.APP_ENV_PROD;
    static log(...args: unknown[]) {
        if (this.isProd) {
        // crashlytics().log(args.join(' '))
        } else {
            // eslint-disable-next-line no-console
            console.log(...args);
        }
    }
    static error(err: Error | string) {
        let e = err;

        if (!(err instanceof Error)) {
            e = new Error(err);
        }
        if (this.isProd) {
            // eslint-disable-next-line no-console
            console.error(e);

            // crashlytics().recordError(e);
        } else {
            // eslint-disable-next-line no-console
            console.error(e);
        }
    }
}
