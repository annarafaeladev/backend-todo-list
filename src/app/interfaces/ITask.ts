import { Category } from "../entities/Category"
import { SubTask } from "../entities/SubTask"
import { User } from "../entities/User"

export interface ITask {
    id: number
    title: string,
    description: string,
    done: boolean,
    severity: number,
    subtasks: SubTask[],
    user: User,
    category: Category,
    updated_at: Date
    created_at: Date
}

export interface INewTask {
    title: string,
    description: string,
    done: boolean,
    severity: number,
    user: User,
    category?: Category
}

export interface ITaskCreateRequest {
    title: string,
    description: string,
    categoryId?: number
}


export interface ITaskUpdateRequest {
    id: number
    title: string,
    description: string,
    done: boolean,
    severity: number,
}

export interface ITaskDto {
    id: number
    title: string,
    description: string,
    done: boolean,
    severity: number,
    subtasks: SubTask[],
    category: Category,
    updated_at: Date
    created_at: Date
}