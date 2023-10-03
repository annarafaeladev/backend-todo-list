import { BadRequestError, InternalServerError, NotFoundError, UnauthorizedError } from "../helpers/api-errors";
import { ILoginDTO, IUser, IUserDTO, IUserLoginRequest, IUserRequest } from "../interfaces/IUser";
import { userRepository } from "../repositories/UserRepository";
import error from "../constants/errors.json";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Console } from "console";
import { Request, Response } from "express";

class UserService {

    async create(req: IUserRequest): Promise<IUserDTO | null> {
        const { username, password, name } = req;
        const userExists: IUser | null = await userRepository.findOneBy({
            username
        })

        if (userExists)
            throw new BadRequestError(error.USER_ALREADY_EXISTS)


        if (password.length < 6 || !name)
            throw new BadRequestError(error.PROPERTIES_INVALID)

        const hasPassword = await bcrypt.hash(password, 10);

        const newUser: IUser = userRepository.create({
            name,
            username,
            password: hasPassword
        });

        const user: IUser = await userRepository.save(newUser);

        if (!user)
            throw new BadRequestError(error.USER_ERROR_REGISTER);

        const { password: _, ...newUserResponse } = user;

        return newUserResponse;
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

    async login(body: IUserLoginRequest): Promise<ILoginDTO> {
        const { password, username } = body;

        const user: IUser | null = await userRepository.findOneBy({
            username
        })

        if (!user)
            throw new BadRequestError(error.CREDENTIAL_INVALID)


        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword)
            throw new BadRequestError(error.CREDENTIAL_INVALID)

        const token = jwt.sign({ id: user.id }, `${process.env.JWT_PASSWORD}` ?? '', {
            expiresIn: '1h'
        });

        const { password: _, ...userLogin } = user;

        return {
            user: userLogin,
            token
        }
    }
};

export default new UserService();