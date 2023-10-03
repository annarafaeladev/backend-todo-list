import { Request, Response } from "express";
import { BadRequestError } from "../helpers/api-errors";
import { ISubTask, ISubTaskCreateRequest, ISubTaskUpdateRequest } from "../interfaces/ISubTask";
import error from "../constants/errors.json";
import SubTaskService from "../services/SubTaskService";


class SubTaskController {
    async create(req: Request, res: Response): Promise<Response> {
        const body: ISubTaskCreateRequest = req.body;

        const subtask: ISubTask | null = await SubTaskService.create(body);

        return res.status(201).json(subtask);
    }

    async find(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        if (!id && isNaN(Number(id)))
            throw new BadRequestError(error.PROPERTIES_INVALID);

        const user = await SubTaskService.findById(Number(id));

        return res.status(200).json(user);
    }

    async findAll(req: Request, res: Response): Promise<Response> {
        const user = await SubTaskService.find();

        return res.status(200).json(user);
    }

    async update(req: Request, res: Response): Promise<Response> {
        const body: ISubTaskUpdateRequest = req.body;

        if (!body.id || isNaN(Number(body.id)))
            throw new BadRequestError(error.PROPERTIES_INVALID);

        const subtask: ISubTask = await SubTaskService.update(body);

        return res.status(200).json(subtask);
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        if (!id || isNaN(Number(id)))
            throw new BadRequestError(error.PROPERTIES_INVALID);

        await SubTaskService.delete(Number(id))

        return res.status(204).send();
    }
}

export default new SubTaskController(); 