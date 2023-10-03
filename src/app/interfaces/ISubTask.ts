import { Task } from "../entities/Task"

export interface ISubTask {
    id: number
    title: string,
    description: string,
    done: boolean,
    severity: number,
    task: Task
    updated_at: Date
    created_at: Date
}

export interface ISubTaskCreateRequest {
    title: string,
    description: string,
    taskId: number,
    severity: number | null
}


export interface ISubTaskUpdateRequest {
    id: number
    title: string,
    description: string,
    done: boolean,
    severity: number,
}

