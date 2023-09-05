import { Category } from "../entities/Category";
import { AppDataSource } from "../../database/data-source";

export const categoryRepository = AppDataSource.getRepository(Category);