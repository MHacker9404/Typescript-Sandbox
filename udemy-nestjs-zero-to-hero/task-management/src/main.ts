import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { LoggingService } from './shared/logging/logging.service';
import config from 'config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { logger: false });
    const logger = app.get(LoggingService);
    logger.setContext(`bootstrap`);
    app.useLogger(logger);

    const serverConfig: any = config.get('server');
    logger.log(JSON.stringify(serverConfig));

    const port = process.env.PORT || serverConfig.port;
    await app.listen(port);

    logger.log(`application listening on port ${port}`);
}
bootstrap();
