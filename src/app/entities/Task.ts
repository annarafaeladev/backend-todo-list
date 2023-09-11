import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { SubTask } from "./SubTask";

@Entity("tasks")
export class Task {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    title: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    description: string;

    @Column({ default: false, nullable: false })
    done: boolean

    @Column({ default: 1, nullable: false })
    severity: number

    @ManyToOne(() => User, user => user.task, { eager: true })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => SubTask, (subtask) => subtask.task, { cascade: true })
    subtasks: SubTask[];

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;

}