import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ATStrategy extends PassportStrategy(Strategy, 'at') {
    constructor(
        private prisma: PrismaService,
        private configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('JWT_ACCESS_TOKEN'),
        });
    }

    async validate(payload: any) {
        if (!!!payload) {
            throw new ForbiddenException();
        }

        const user = await this.prisma.user.findUnique({
            where: {
                id: payload.id,
            },
        });

        delete user.password;

        return user;
    }
}
