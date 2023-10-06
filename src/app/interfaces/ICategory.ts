import { Timestamp } from "typeorm"
import { User } from "../entities/User"

export interface ICategory {
    id: number,
    title: string
    updated_at: Date
    created_at: Date,
    user: User
}

export interface ICategoryRequest {
    title: string
}

export interface ICategoryDTO {
    id: number,
    title: string
}

