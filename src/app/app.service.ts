import { Injectable } from '@nestjs/common';

import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AppService {
    constructor(private prisma: PrismaService) {}
    up() {
        return {
            up: true,
        };
    }

    async clear() {
        return await this.prisma.clearDB();
    }
}
