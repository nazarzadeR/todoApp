import {
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    UseGuards,
    HttpStatus,
    Controller,
} from '@nestjs/common';
import { Role } from '@prisma/client';

import { UserService } from './user.service';
import { GetUser, Roles } from 'auth/decorator';
import { ATGuard, RoleGuard } from 'auth/guard';
import { UserUpdateDto } from 'user/dto/user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('all')
    @Roles(Role.ADMIN)
    @HttpCode(HttpStatus.OK)
    @UseGuards(ATGuard, RoleGuard)
    async all() {
        return await this.userService.all();
    }

    @Get()
    @UseGuards(ATGuard)
    @HttpCode(HttpStatus.OK)
    async currentUser(@GetUser('username') username: string) {
        return await this.userService.read(username);
    }

    @Post()
    @UseGuards(ATGuard)
    @HttpCode(HttpStatus.OK)
    async readWithPosts(@GetUser('username') username: string) {
        return await this.userService.readWithTodo(username);
    }

    @Get(':username')
    @UseGuards(ATGuard)
    @HttpCode(HttpStatus.OK)
    async read(@Param('username') username: string) {
        return await this.userService.read(username);
    }

    @Patch()
    @UseGuards(ATGuard)
    @HttpCode(HttpStatus.OK)
    async update(
        @GetUser('id') id: string,
        @Body() credentials: UserUpdateDto,
    ) {
        return this.userService.update(id, credentials);
    }

    @Delete()
    @UseGuards(ATGuard)
    @HttpCode(HttpStatus.OK)
    async delete(@GetUser('id') id: string) {
        return this.userService.delete(id);
    }
}
