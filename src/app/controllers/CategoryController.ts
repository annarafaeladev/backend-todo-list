import { Request, Response } from "express";
import { ICategory, ICategoryRequest, ICategoryDTO } from "../interfaces/ICategory";
import { BadRequestError } from "../helpers/api-errors";
import CategoryService from "../services/CategoryService";
import error from "../constants/errors.json";

class CategoryController {

    async create(req: Request, res: Response): Promise<Response> {
        const body: ICategoryRequest = req.body;

        if (!body.title)
            throw new BadRequestError(error.PROPERTIES_INVALID);

        const category: ICategoryDTO | null = await CategoryService.create(body, req.user);

        return res.status(201).json(category);
    }

    async getCategories(req: Request, res: Response): Promise<Response> {
        const categories = await CategoryService.find(req.user);

        return res.status(200).json(categories);
    }

    async update(req: Request, res: Response): Promise<Response> {
        const body: ICategoryDTO = req.body;

        if (!body.id || isNaN(Number(body.id)) || !body.title)
            throw new BadRequestError(error.PROPERTIES_INVALID);

        const category: ICategoryDTO = await CategoryService.update(body, req.user);

        return res.status(200).json(category);
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        if (!id || isNaN(Number(id)))
            throw new BadRequestError(error.PROPERTIES_INVALID);

        await CategoryService.delete(Number(id))

        return res.status(204).send();
    }
}

export default new CategoryController(); 