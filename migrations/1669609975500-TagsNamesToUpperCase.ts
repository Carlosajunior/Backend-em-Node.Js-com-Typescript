import { MigrationInterface, QueryRunner } from "typeorm";

export class TagsNamesToUpperCase1669609975500 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "unaccent"`)

        await queryRunner.query(`
        DO $$
        DECLARE  
            profile_tag_record	RECORD;
            tag_name varchar;
            tag_id_aux uuid;
        BEGIN
            FOR profile_tag_record IN SELECT * FROM profiles_tags LOOP
                tag_name = (SELECT name FROM tag WHERE id = profile_tag_record.tag_id);
                tag_id_aux = (SELECT id FROM tag WHERE LOWER(unaccent(name)) = LOWER(unaccent(tag_name)) ORDER BY created_at LIMIT 1);
                UPDATE profiles_tags SET tag_id = tag_id_aux WHERE id = profile_tag_record.id;
            END LOOP;
        END $$;`)

        await queryRunner.query(`
        DO $$
        DECLARE  
            vacancy_tag_record	RECORD;
            tag_name varchar;
            tag_id_aux uuid;
        BEGIN
            FOR vacancy_tag_record IN SELECT * FROM vacancies_tags LOOP
                tag_name = (SELECT name FROM tag WHERE id = vacancy_tag_record.tag_id);
                tag_id_aux = (SELECT id FROM tag WHERE LOWER(unaccent(name)) = LOWER(unaccent(tag_name)) ORDER BY created_at LIMIT 1);
                UPDATE vacancies_tags SET tag_id = tag_id_aux WHERE (tag_id = vacancy_tag_record.tag_id AND vacancy_id =vacancy_tag_record.vacancy_id) AND (tag_id <> vacancy_tag_record.tag_id AND vacancy_id <> vacancy_tag_record.vacancy_id);
            END LOOP;
        END $$;`)

        await queryRunner.query(`
            DO $$
            DECLARE
                profile_tag_record	RECORD;
            BEGIN
            FOR profile_tag_record IN 
                    SELECT * FROM tag t 
                    LEFT JOIN profiles_tags pt 
                    ON t.id = pt.tag_id 
                    WHERE pt.tag_id IS NULL AND (
                        SELECT COUNT(*) FROM tag 
                        WHERE LOWER(unaccent(name)) = LOWER(unaccent(t.name))) > 1
                LOOP
                    DELETE FROM tag WHERE id = profile_tag_record.id;
                END LOOP;                       
            END $$;`)


        await queryRunner.query(`
            DO $$
            DECLARE
                vacancy_tag_record	RECORD;
            BEGIN
            FOR vacancy_tag_record IN
                    SELECT * FROM tag t
                    LEFT JOIN vacancies_tags vt
                    ON t.id = vt.tag_id
                    WHERE vt.tag_id IS NULL AND (
                        SELECT COUNT(*) FROM tag
                        WHERE LOWER(unaccent(name)) = LOWER(unaccent(t.name))) > 1
                LOOP
                    DELETE FROM tag WHERE id = vacancy_tag_record.id;
                END LOOP;
            END $$;`)

        await queryRunner.query("UPDATE tag SET name = UPPER(name);")

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
