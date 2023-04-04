import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from 'app/app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors();
    app.use(helmet());
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(process.env.PORT || 8080);
}
bootstrap();
