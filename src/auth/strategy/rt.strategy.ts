import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

import { UserService } from 'user/user.service';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class RTStrategy extends PassportStrategy(Strategy, 'rt') {
    constructor(
        private userService: UserService,
        private configService: ConfigService,
    ) {
        super({
            passReqToCallback: true,
            secretOrKey: configService.get<string>('JWT_REFRESH_TOKEN'),
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request): string => {
                    const token = req?.body?.token;

                    if (!token) {
                        throw new UnauthorizedException('Token not found');
                    }

                    return token;
                },
            ]),
        });
    }

    async validate(req: Request, payload: any) {
        if (!!!payload) {
            throw new UnauthorizedException();
        }

        const user = await this.userService.verifyRefreshToken(req.body.token);

        delete user.password;

        return user;
    }
}
