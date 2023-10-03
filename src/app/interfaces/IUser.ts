export interface IUser {
    id: number,
    username: string,
    password: string,
    name: string,
    updated_at: Date
    created_at: Date
}

export interface IUserDTO {
    id: number,
    username: string,
    name: string,
    updated_at: Date
    created_at: Date,
    token?: string
}


export interface ILoginDTO {
    user: IUserDTO,
    token: string
}

export interface IUserRequest {
    username: string,
    password: string,
    name: string
}

export interface IUserLoginRequest {
    username: string,
    password: string,
}

