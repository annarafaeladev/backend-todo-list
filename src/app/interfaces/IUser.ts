export interface IUser {
    id: number,
    username: string,
    password: string,
    updated_at: Date
    created_at: Date
}

export interface IUserRequest {
    username: string,
    password: string
}

