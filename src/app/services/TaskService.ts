import { BadRequestError, InternalServerError, NotFoundError } from "../helpers/api-errors";
import { ITaskCreateRequest, ITask, ITaskUpdateRequest, INewTask, ITaskDto } from "../interfaces/ITask";
import { taskRepository } from "../repositories/TaskRepository";
import error from "../constants/errors.json";
import { IUser, IUserDTO } from "../interfaces/IUser";
import { categoryRepository } from "../repositories/CategoryRepository";
import { userRepository } from "../repositories/UserRepository";
import { Category } from "../entities/Category";
import { User } from "../entities/User";
import { Task } from "../entities/Task";

class TaskService {


    async create(body: ITaskCreateRequest, { id }: Partial<IUserDTO>): Promise<ITaskDto | null> {
        if (!body.title)
            throw new BadRequestError("Property title invalid");

        const user: User | null = await userRepository.findOneBy({
            id
        });

        if (user == null)
            throw new InternalServerError(error.USER_NOT_FOUND);

        const taskEntity: INewTask = {
            title: body.title,
            description: body.description,
            severity: 1,
            done: false,
            user
        }


        if (body.categoryId) {
            const category: Category | null = await categoryRepository.findOne({
                where: {
                    id: body.categoryId
                }
            });

            if (category == null) {
                throw new BadRequestError("Category not found");
            }

            taskEntity.category = category;
        }

        const task: Task = taskRepository.create(taskEntity);

        const newTask: Task = await taskRepository.save(task);

        if (newTask == null)
            throw new BadRequestError(error.USER_ERROR_REGISTER);

        const { user: userTask, ...properties } = newTask
        return properties;
    }

    async find(userDto: Partial<IUser>) {
        const tasks: Task[] | null = await taskRepository.find({
            where: {
                user: { id: userDto.id }
            }
        });

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