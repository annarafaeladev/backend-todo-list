import { AppDataSource } from "../../database/data-source";
import { SubTask } from "../entities/SubTask";

export const subTaskRepository = AppDataSource.getRepository(SubTask);