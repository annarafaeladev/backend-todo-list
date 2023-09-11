import { BadRequestError, InternalServerError, NotFoundError } from "../helpers/CutomError";
import { IUser, IUserRequest } from "../interfaces/IUser";
import { userRepository } from "../repositories/UserRepository";
import error from "../constants/errors.json";

class UserService {

    async create(req: IUserRequest): Promise<IUser | null> {
        const newUser: IUser = userRepository.create({
            username: req.username,
            password: req.password
        });

        const user: IUser = await userRepository.save(newUser);

        if (user == null)
            throw new BadRequestError(error.USER_ERROR_REGISTER);

        return user;
    }

    async find(id: number) {
        const user: IUser | null = await userRepository.findOneBy({
            id
        });

        if (user == null)
            throw new InternalServerError(error.USER_NOT_FOUND);

        return user;
    }

    async update(req: IUser): Promise<IUser> {
        const user: IUser | null = await userRepository.findOneBy({
            id: req.id
        });

        if (user == null)
            throw new NotFoundError(error.USER_NOT_FOUND);

        user.username = req.username;
        user.password = req.password;

        return await userRepository.save(user);
    }

    async delete(id: number) {
        const user: IUser | null = await userRepository.findOneBy({
            id
        });

        if (user == null)
            throw new NotFoundError(error.USER_NOT_FOUND);

        await userRepository.delete({ id: user.id });
    }


};

export default new UserService();