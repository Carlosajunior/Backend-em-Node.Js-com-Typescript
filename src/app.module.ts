import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractsModule } from './modules/contracts/contracts.module';
import { serverStaticConfig } from '@/config/static';
import { typeormConfig } from '@/config/typeorm/index';
import { LanguagesModule } from '@/modules/common/languages';
import { TagsModule } from '@/modules/common/tags';
import { AttachmentsModule } from '@/modules/professional-profiles/attachments';
import { ObservationsModule } from '@/modules/professional-profiles/observations';
import { ProfilesModule } from '@/modules/professional-profiles/profiles';
import { APP_GUARD } from '@nestjs/core';
import { getConnection } from 'typeorm';
import { router } from './config/bull/bull';
import { AuditsModule } from './modules/audit/audit.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { AuthModule } from './modules/common/auth/auth.module';
import { GroupsGuard } from './modules/common/auth/guards/groups.guard';
import { AuthMiddleware } from './modules/common/auth/middlewares';
import { ElapsedTimeMiddleware } from './modules/common/auth/middlewares/logger.middleware';
import { ConfigurationsModule } from './modules/common/configurations/configurations.module';
import { ElasticModule } from './modules/common/elastic/elastic.module';
import { CustomersModule } from './modules/customers/customers.module';
import { DossierModule } from './modules/dossiers/dossier.module';
import { ColumnsModule } from './modules/funnel/columns';
import { FunnelModule } from './modules/funnel/funnel.module';
import { MessagesModule } from './modules/messages';
import { OfferLettersModule } from './modules/offer-letters/offer-letters.module';
import { OffersModule } from './modules/offers/offers.module';
import { PostJobInterviewModule } from './modules/post-job-interview/post-job-interview.module';
import { PreJobInterviewModule } from './modules/pre-job-interview/pre-job-interview.module';
import { ExperiencesModule } from './modules/professional-profiles/experiences';
import { FormationsModule } from './modules/professional-profiles/formations';
import { OfficesModule } from './modules/professional-profiles/offices/offices.module';
import { ReferencesModule } from './modules/professional-profiles/references';
import { SearchProfilesModule } from './modules/professional-profiles/search';
import { SocialMediasModule } from './modules/professional-profiles/social-medias';
import { SquadModule } from './modules/squads/squad.module';
import { TemplatesModule } from './modules/templates/templates.module';
import { UserModule } from './modules/users/user.module';
import { ListingModule } from './modules/vacancies/applications';
import { VacancyModule } from './modules/vacancies/vacancy.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { AnswersModule } from './modules/answers/answers.module';
import { AlternativesModule } from './modules/alternatives/alternatives.module';
import { ImportsModule } from './modules/imports/imports.module';
import { LogsImportsModule } from './modules/logs-imports/logs-imports.module';
import { RolesModule } from './modules/roles/roles.module';
import { ProfilesOfferLettersModule } from './modules/professional-profiles/profiles-offer-letters/profiles-offer-letters.module';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: GroupsGuard
    }
  ],
  imports: [
    AttachmentsModule,
    AuditsModule,
    AuthModule,
    CategoriesModule,
    ColumnsModule,
    ConfigurationsModule,
    ContractsModule,
    CustomersModule,
    DossierModule,
    ElasticModule,
    ExperiencesModule,
    FormationsModule,
    FunnelModule,
    ImportsModule,
    LanguagesModule,
    ListingModule,
    LogsImportsModule,
    MessagesModule,
    ObservationsModule,
    OfferLettersModule,
    OffersModule,
    OfficesModule,
    PostJobInterviewModule,
    PreJobInterviewModule,
    ProfilesModule,
    ReferencesModule,
    RolesModule,
    SearchProfilesModule,
    ServeStaticModule.forRoot(serverStaticConfig),
    SocialMediasModule,
    SquadModule,
    TagsModule,
    TemplatesModule,
    TypeOrmModule.forRoot(typeormConfig),
    UserModule,
    VacancyModule,
    DossierModule,
    QuestionsModule,
    AnswersModule,
    AlternativesModule,
    ProfilesOfferLettersModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(router).forRoutes('/admin/queues');
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
