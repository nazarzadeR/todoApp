import { Request, Response, NextFunction } from 'express';
import { NestMiddleware, Injectable, Logger } from '@nestjs/common';

@Injectable()
export default class LoggerMiddleware implements NestMiddleware {
    private logger = new Logger('HTTP');

    use(req: Request, res: Response, next: NextFunction) {
        const { ip, method, originalUrl } = req;
        const userAgent = req.get('user-agent') || '';

        res.on('finish', () => {
            const { statusCode } = res;
            const contentLength = res.get('content-length');

            this.logger.log(
                `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
            );

            if (method !== 'GET' && statusCode >= 400)
                this.logger.error(req.body);
        });

        next();
    }
}
