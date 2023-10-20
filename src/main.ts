import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TrimBodyTextPipe } from './modules/common/pipes/trim-body-texts.pipe';

process.env.TZ = 'America/Sao_Paulo'; // UTC -03:00
console.log(new Date().toString());

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new TrimBodyTextPipe(),
    new ValidationPipe({
      whitelist: true
    })
  );
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('SW Recruiter API')
    .setDescription('Back-end')
    .setVersion('1.0')
    .addSecurity('Auth', {
      description: 'Bearer <JWT>',
      name: 'Authorization',
      bearerFormat: 'Bearer',
      scheme: 'Bearer',
      type: 'http',
      in: 'Header'
    })
    .addSecurityRequirements('Auth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
