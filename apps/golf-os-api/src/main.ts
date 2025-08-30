/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { join } from 'path';

import { AppModule } from './app/app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    // app.enableVersioning({
    //     defaultVersion: '1',
    //     type: VersioningType.URI,
    //     prefix: 'v',
    // });

    const config = app.get(ConfigService);

    const globalPrefix = config.get<string>('app.globalPrefix', 'api');
    app.setGlobalPrefix(globalPrefix);

    app.useStaticAssets(join(__dirname, 'assets'), {
        prefix: '/assets',
    });

    app.enableCors({
        origin: true,
        credentials: true,
    });

    const port = config.get<number>('app.port', 9000);
    await app.listen(port, () => {
        Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
    });
}

bootstrap();
