import { BadRequestError, InternalServerError, NotFoundError } from "../helpers/api-errors";
import { ITaskCreateRequest, ITask, ITaskUpdateRequest } from "../interfaces/ITask";
import { taskRepository } from "../repositories/TaskRepository";
import error from "../constants/errors.json";
import UserService from "./UserService";

class TaskService {

    async create(req: ITaskCreateRequest): Promise<ITask | null> {
        const user = await UserService.find(req.userId);
        const task: ITask = taskRepository.create({
            title: req.title,
            description: req.description,
            severity: 1,
            done: false,
            user
        });

        const newTask: ITask = await taskRepository.save(task);

        if (newTask == null)
            throw new BadRequestError(error.USER_ERROR_REGISTER);

        return newTask;
    }

    async find() {
        const tasks: ITask[] | null = await taskRepository.find();

        if (tasks == null)
            throw new InternalServerError(error.USER_NOT_FOUND);

        return tasks;
    }

    async findById(id: number) {
        const task: ITask | null = await taskRepository.findOne({
            where: {
                id
            }
        });

        if (task == null)
            throw new InternalServerError("cateogria nao encontrada");

        return task;
    }

    async update(req: ITaskUpdateRequest): Promise<ITask> {
        const task: ITask | null = await taskRepository.findOneBy({
            id: Number(req.id)
        });

        if (task == null) {
            throw new NotFoundError(error.USER_NOT_FOUND);
        }

        if (req.title)
            task.title = req.title;

        if (req.description)
            task.description = req.description;

        if (req.done != null)
            task.done = req.done;

        if (req.severity != null) {
            if (req.severity <= 0)
                throw new BadRequestError("Propriedade severity precise ser maior que 0");

            task.severity = req.severity;
        }

        return await taskRepository.save(task);
    }

    async delete(id: number) {
        const task: ITask | null = await taskRepository.findOneBy({
            id
        });

        if (task == null)
            throw new NotFoundError(error.USER_NOT_FOUND);

        await taskRepository.delete({ id: task.id });
    }


};

export default new TaskService();