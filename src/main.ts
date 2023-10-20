import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AuditInterceptor } from './modules/audit/interceptors';
import { LoggerInterceptor } from './modules/audit/interceptors/logger.interceptor';
import { TrimBodyTextPipe } from './modules/common/pipes/trim-body-texts.pipe';
import './modules/messages/queue/insert-last-sent-message-to-professional.consumer';
import './modules/messages/queue/send-message.consumer';
import './modules/vacancies/applications/queue/insert-candidate.consumer';
import './modules/vacancies/queues/consumers/insert-tags.consumer';
import './modules/vacancies/queues/consumers/update-langs.consumer';
import './modules/professional-profiles/profiles/queues/consumers/update-profile-tags.consumer'

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
  app.useGlobalInterceptors(new AuditInterceptor());
  app.useGlobalInterceptors(new LoggerInterceptor());

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
