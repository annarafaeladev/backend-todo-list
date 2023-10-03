import { Request, Response } from "express";
import { BadRequestError, UnauthorizedError } from "../helpers/api-errors";
import UserService from "../services/UserService";
import { ILoginDTO, IUser, IUserDTO, IUserLoginRequest, IUserRequest } from "../interfaces/IUser";
import error from "../constants/errors.json";


class UserController {

    async create(req: Request, res: Response): Promise<Response> {
        const body: IUserRequest = req.body;

        const category: IUserDTO | null = await UserService.create(body);

        return res.status(201).json(category);
    }

    async find(req: Request, res: Response): Promise<Response> {
        return res.status(200).json(req.user);
    }

    async update(req: Request, res: Response): Promise<Response> {
        const body: IUser = req.body;

        if (body.username == null || !body.password)
            throw new BadRequestError(error.PROPERTIES_INVALID);

        const user: IUser = await UserService.update(body);

        return res.status(200).json(user);
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        if (!id || isNaN(Number(id)))
            throw new BadRequestError(error.PROPERTIES_INVALID);

        await UserService.delete(Number(id))

        return res.status(204).send();
    }

    async login(req: Request, res: Response): Promise<Response> {
        const body: IUserLoginRequest = req.body;

        const login: ILoginDTO = await UserService.login(body)

        return res.status(200).json(login);
    }

}

export default new UserController(); 