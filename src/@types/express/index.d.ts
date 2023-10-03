import { User } from '../../app/entities/User'
import { IUserDTO } from '../../app/interfaces/IUser'

declare global {
    namespace Express {
        export interface Request {
            user: Partial<User>
        }
    }
}