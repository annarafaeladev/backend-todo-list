import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ICategory } from "../interfaces/ICategory";
import { Task } from "./Task";

@Entity("categories")
export class Category {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    title: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;

    @OneToMany(() => Task, task => task.user)
    task: Task[]
}