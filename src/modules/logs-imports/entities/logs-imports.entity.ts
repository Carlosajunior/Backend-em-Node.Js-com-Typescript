import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ImportsEnum } from "../constants/import.constants";

@Entity()
export class LogsImports {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    link_linkedin: string

    @Column({ type: 'enum', enum: ImportsEnum })
    status: ImportsEnum

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}
