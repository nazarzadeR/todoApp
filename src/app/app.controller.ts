import {
    Get,
    Post,
    UseGuards,
    Controller,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';

import { Role } from '@prisma/client';
import { Roles } from 'auth/decorator';
import { AppService } from './app.service';
import { ATGuard, RoleGuard } from 'auth/guard';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async up() {
        return await this.appService.up();
    }

    @Post('clear')
    @Roles(Role.ADMIN)
    @HttpCode(HttpStatus.OK)
    @UseGuards(ATGuard, RoleGuard)
    async clear() {
        return await this.appService.clear();
    }
}
