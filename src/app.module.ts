import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { serverStaticConfig } from '@/config/static';
import { typeormConfig } from '@/config/typeorm/index';
import { APP_GUARD } from '@nestjs/core';
import { getConnection } from 'typeorm';
import { AuthModule } from './modules/common/auth/auth.module';
import { GroupsGuard } from './modules/common/auth/guards/groups.guard';
import { AuthMiddleware } from './modules/common/auth/middlewares';
import { ElapsedTimeMiddleware } from './modules/common/auth/middlewares/logger.middleware';
import { UserModule } from './modules/users/user.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { AnswersModule } from './modules/answers/answers.module';
import { AlternativesModule } from './modules/alternatives/alternatives.module';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: GroupsGuard
    }
  ],
  imports: [
    AuthModule,
    ServeStaticModule.forRoot(serverStaticConfig),
    TypeOrmModule.forRoot(typeormConfig),
    UserModule,
    QuestionsModule,
    AnswersModule,
    AlternativesModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'api', method: RequestMethod.GET },
        { path: 'auth', method: RequestMethod.POST },
        {
          path: 'imports/vacancies-portal-profiles',
          method: RequestMethod.GET
        },
        { path: 'imports/internal-profiles', method: RequestMethod.GET },
        { path: 'imports', method: RequestMethod.POST }
      )
      .forRoutes({ path: '/[a-zA-Z0-9-/_]+', method: RequestMethod.ALL });
    consumer
      .apply(ElapsedTimeMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }

  onApplicationShutdown() {
    getConnection().close();
  }
}
