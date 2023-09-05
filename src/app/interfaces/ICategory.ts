import { Timestamp } from "typeorm"

export interface ICategory {
    id?: number,
    titulo: string
    updated_at?: Date
    created_at?: Date
}

