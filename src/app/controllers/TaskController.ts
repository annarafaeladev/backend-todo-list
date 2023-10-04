import { Request, Response } from "express";
import { BadRequestError } from "../helpers/api-errors";
import { ITask, ITaskUpdateRequest, ITaskCreateRequest } from "../interfaces/ITask";
import error from "../constants/errors.json";
import TaskService from "../services/TaskService";


class TaskController {

    async create(req: Request, res: Response): Promise<Response> {
        const body: ITaskCreateRequest = req.body;

        const category: ITask | null = await TaskService.create(body, req.user);

        return res.status(201).json(category);
    }

    async find(req: Request, res: Response): Promise<Response> {
        const user = await TaskService.find(req.user);

        return res.status(200).json(user);
    }

    async update(req: Request, res: Response): Promise<Response> {
        const body: ITaskUpdateRequest = req.body;

        if (!body.id || isNaN(Number(body.id)))
            throw new BadRequestError(error.PROPERTIES_INVALID);

        const category: ITask = await TaskService.update(body);

        return res.status(200).json(category);
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        if (!id || isNaN(Number(id)))
            throw new BadRequestError(error.PROPERTIES_INVALID);

        await TaskService.delete(Number(id))

        return res.status(204).send();
    }

    async findById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        if (!id || isNaN(Number(id)))
            throw new BadRequestError(error.PROPERTIES_INVALID);

        const task: ITask = await TaskService.findById(Number(id))

        return res.status(200).json(task);
    }
}

export default new TaskController(); 