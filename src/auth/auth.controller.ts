import {
    Body,
    Post,
    HttpCode,
    UseGuards,
    Controller,
    HttpStatus,
} from '@nestjs/common';

import { RTGuard } from './guard';
import { GetUser } from './decorator';
import { AuthService } from './auth.service';
import { UserSignDto } from 'user/dto/user.dto';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    async signup(@Body() credential: UserSignDto) {
        return await this.authService.signup(credential);
    }

    @Post('signin')
    @HttpCode(HttpStatus.ACCEPTED)
    async signin(@Body() credential: UserSignDto) {
        return await this.authService.singIn(credential);
    }

    @Post('refresh')
    @UseGuards(RTGuard)
    @HttpCode(HttpStatus.OK)
    async refresh(@GetUser() user: User) {
        return await this.authService.refresh(user);
    }
}
