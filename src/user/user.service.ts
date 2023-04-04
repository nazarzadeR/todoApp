import {
    Injectable,
    ForbiddenException,
    UnauthorizedException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { PrismaService } from 'prisma/prisma.service';
import { UserSignDto, UserUpdateDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async create(userDto: UserSignDto) {
        try {
            return await this.prisma.user.create({
                data: {
                    username: userDto.username,
                    password: userDto.password,
                },
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials already taken');
                }
            }
        }
    }

    async read(username: string) {
        try {
            return await this.prisma.user.findUniqueOrThrow({
                where: { username },
                select: {
                    id: true,
                    role: true,
                    username: true,
                },
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new ForbiddenException(
                        'We have not username like this.',
                    );
                }
            }
        }
    }

    async readWithTodo(username: string) {
        try {
            return await this.prisma.user.findUniqueOrThrow({
                where: { username },
                select: {
                    id: true,
                    role: true,
                    username: true,
                    todos: true,
                },
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new ForbiddenException(
                        'We have not username like this.',
                    );
                }
            }
        }
    }

    async update(userId: string, credential: UserUpdateDto) {
        return await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: credential,
        });
    }

    async delete(userId: string) {
        return await this.prisma.user.delete({
            where: { id: userId },
        });
    }

    async all() {
        return await this.prisma.user.findMany({ include: { todos: true } });
    }

    async verifyRefreshToken(token: string) {
        try {
            return await this.prisma.user.findFirstOrThrow({
                where: { refreshToken: token },
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new UnauthorizedException('Refresh token not used');
                }
            }
        }
    }
}
