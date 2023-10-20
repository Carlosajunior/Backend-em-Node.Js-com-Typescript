import { Module } from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesRepository } from './repositories';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository]
})
export class CategoriesModule { }
