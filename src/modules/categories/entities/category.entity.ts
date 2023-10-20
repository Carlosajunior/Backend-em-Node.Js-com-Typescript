import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, QueryRunner, UpdateDateColumn } from "typeorm";

@Entity()
export class Categories {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    category: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

}