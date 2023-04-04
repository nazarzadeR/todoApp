import * as argon2 from 'argon2';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable, ForbiddenException } from '@nestjs/common';

import { UserSignDto } from 'user/dto/user.dto';
import { UserService } from 'user/user.service';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private userService: UserService,
        private configService: ConfigService,
    ) {}

    async signup(credentials: UserSignDto) {
        credentials.password = await argon2.hash(credentials.password);

        const createdUser = await this.userService.create(credentials);

        const [access_token, refresh_token] = await this.signToken(
            createdUser.id,
            createdUser.username,
        );

        await this.prisma.user.update({
            where: {
                id: createdUser.id,
            },
            data: {
                refreshToken: refresh_token,
            },
        });

        return {
            access_token,
            refresh_token,
        };
    }

    async singIn(credentials: UserSignDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                username: credentials.username,
            },
        });

        if (!user) throw new ForbiddenException('Credential incorrect');

        const pwdMatch = await argon2.verify(
            user.password,
            credentials.password,
        );

        if (!pwdMatch) throw new ForbiddenException('Credential incorrect');

        const [access_token, refresh_token] = await this.signToken(
            user.id,
            user.username,
        );

        await this.prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                refreshToken: refresh_token,
            },
        });

        return {
            access_token,
            refresh_token,
        };
    }

    async refresh(user: User) {
        const payload = {
            id: user.id,
            username: user.username,
        };

        return {
            access_token: await this.jwtService.signAsync(payload, {
                expiresIn: '4h',
                secret: this.configService.get<string>('JWT_ACCESS_TOKEN'),
            }),
        };
    }

    async signToken(userId: any, username: string) {
        const payload = { id: userId, username };
        return await Promise.all([
            this.jwtService.signAsync(payload, {
                expiresIn: '4h',
                secret: this.configService.get<string>('JWT_ACCESS_TOKEN'),
            }),
            this.jwtService.signAsync(payload, {
                expiresIn: '4d',
                secret: this.configService.get<string>('JWT_REFRESH_TOKEN'),
            }),
        ]);
    }
}
