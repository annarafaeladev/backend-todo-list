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
    updated_at: Date
    created_at: Date
}

export interface ITaskCreateRequest {
    title: string,
    description: string,
    userId: number
}


export interface ITaskUpdateRequest {
    id: number
    title: string,
    description: string,
    done: boolean,
    severity: number,
}

