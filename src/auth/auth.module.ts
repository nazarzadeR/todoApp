import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { UserModule } from 'user/user.module';
import { AuthController } from './auth.controller';
import { ATStrategy, RTStrategy } from 'auth/strategy';

@Module({
    imports: [JwtModule.register({}), UserModule],
    controllers: [AuthController],
    providers: [AuthService, ATStrategy, RTStrategy],
})
export class AuthModule {}
