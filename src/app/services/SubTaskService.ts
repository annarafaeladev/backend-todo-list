import { BadRequestError, InternalServerError, NotFoundError } from "../helpers/api-errors";
import { ISubTask, ISubTaskCreateRequest, ISubTaskUpdateRequest } from "../interfaces/ISubTask";
import { subTaskRepository } from "../repositories/SubTaskRepositor";
import error from "../constants/errors.json";
import TaskService from "./TaskService";

class SubTaskService {

    async create(req: ISubTaskCreateRequest): Promise<ISubTask | null> {
        const task = await TaskService.findById(req.taskId);

        if (!task)
            throw new BadRequestError(error.TASK_NOT_FOUND);

        if (isNaN(Number(req.severity)) || Number(req.severity) > 5 || Number(req.severity) < 1)
            throw new BadRequestError(error.PROPERTY_INVALID, "severity");

        const subTask: ISubTask = subTaskRepository.create({
            title: req.title,
            description: req.description,
            severity: req.severity ?? 1,
            done: false,
            task
        });

        const newSubTask: ISubTask = await subTaskRepository.save(subTask);

        if (!newSubTask)
            throw new BadRequestError(error.SUBTASK_ERROR_REGISTER);

        return newSubTask;
    }

    async find() {
        const subTasks: ISubTask[] | null = await subTaskRepository.find();

        if (!subTasks)
            throw new InternalServerError(error.TASK_NOT_FOUND);

        return subTasks;
    }

    async findById(id: number) {
        const subTask: ISubTask | null = await subTaskRepository.findOneBy({
            id
        });

        if (!subTask)
            throw new InternalServerError(error.TASK_NOT_FOUND);

        return subTask;
    }

    async update(req: ISubTaskUpdateRequest): Promise<ISubTask> {
        const subtask: ISubTask | null = await subTaskRepository.findOneBy({
            id: Number(req.id)
        });

        if (!subtask) {
            throw new NotFoundError(error.TASK_NOT_FOUND);
        }

        if (req.title)
            subtask.title = req.title;

        if (req.description)
            subtask.description = req.description;

        if (req.done != null)
            subtask.done = req.done;

        if (req.severity != null) {
            if (req.severity <= 0)
                throw new BadRequestError("Propriedade severity precise ser maior que 0");

            subtask.severity = req.severity;
        }

        return await subTaskRepository.save(subtask);
    }

    async delete(id: number) {
        const subtask: ISubTask | null = await subTaskRepository.findOneBy({
            id
        });

        if (!subtask)
            throw new NotFoundError(error.TASK_NOT_FOUND);

        await subTaskRepository.delete({ id: subtask.id });
    }


};

export default new SubTaskService();