import { Request, Response } from "express";
import { BadRequestError } from "../helpers/CutomError";
import { ITask, ITaskUpdateRequest, ITaskCreateRequest } from "../interfaces/ITask";
import error from "../constants/errors.json";
import TaskService from "../services/TaskService";


class TaskController {

    async create(req: Request, res: Response): Promise<Response> {
        const body: ITaskCreateRequest = req.body;

        const category: ITask | null = await TaskService.create(body);

        return res.status(201).json(category);
    }

    async find(req: Request, res: Response): Promise<Response> {
        const user = await TaskService.find();

        return res.status(200).json(user);
    }

    async update(req: Request, res: Response): Promise<Response> {
        const body: ITaskUpdateRequest = req.body;

        if (body.id == null)
            throw new BadRequestError(error.PROPERTIES_INVALID);

        const category: ITask = await TaskService.update(body);

        return res.status(200).json(category);
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        if (id == null)
            throw new BadRequestError(error.PROPERTIES_INVALID);

        await TaskService.delete(Number(id))

        return res.status(204).send();
    }
}

export default new TaskController(); 