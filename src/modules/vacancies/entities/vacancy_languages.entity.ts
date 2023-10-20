import { Languages } from '@/modules/common/languages/entities';
import { DefaultEntity } from '@/modules/common/shared/entities';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { LanguageLevel } from '../constants/language-level.constant';
import { Vacancy } from './vacancy.entity';

@Entity({
  name: 'vacancies_languages'
})
export class VacancyLanguage extends DefaultEntity {
  @Column({
    enum: LanguageLevel
  })
  level: LanguageLevel;

  @Column()
  language_id: string;

  @Column()
  vacancy_id: number;

  @ManyToOne(() => Languages, (language) => language.id, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'language_id' })
  language: Languages;

  @ManyToOne(() => Vacancy, (vacancy) => vacancy.id)
  @JoinColumn({ name: 'vacancy_id' })
  vacancy: Vacancy;
}
