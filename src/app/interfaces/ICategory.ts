import { Timestamp } from "typeorm"

export interface ICategory {
    id: number,
    title: string
    updated_at: Date
    created_at: Date
}

export interface ICategoryRequest {
    title: string
}

export interface ICategoryUpdateRequest {
    id: number,
    title: string
}

