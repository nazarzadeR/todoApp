import { ConfigModule } from '@nestjs/config';
import { Module, MiddlewareConsumer } from '@nestjs/common';

import { AppService } from './app.service';
import { UserModule } from 'user/user.module';
import { AuthModule } from 'auth/auth.module';
import { TodoModule } from 'todo/todo.module';
import { AppController } from './app.controller';
import { PrismaModule } from 'prisma/prisma.module';
import LoggerMiddleware from './middleware/logger.middleware';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PrismaModule,
        UserModule,
        AuthModule,
        TodoModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    configure(customer: MiddlewareConsumer) {
        customer.apply(LoggerMiddleware).forRoutes('*');
    }
}
