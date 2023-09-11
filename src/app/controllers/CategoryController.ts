import { Request, Response } from "express";
import { ICategory, ICategoryRequest, ICategoryUpdateRequest } from "../interfaces/ICategory";
import { BadRequestError } from "../helpers/CutomError";
import CategoryService from "../services/CategoryService";
import error from "../constants/errors.json";

class CategoryController {

    async create(req: Request, res: Response): Promise<Response> {
        const body: ICategoryRequest = req.body;

        if (!body.title)
            throw new BadRequestError(error.PROPERTIES_INVALID);

        const category: ICategory | null = await CategoryService.create(body);

        return res.status(201).json(category);
    }

    async getCategories(_req: Request, res: Response): Promise<Response> {
        const categories = await CategoryService.find();

        return res.status(200).json(categories);
    }

    async update(req: Request, res: Response): Promise<Response> {
        const body: ICategoryUpdateRequest = req.body;

        if (body.id == null || !body.title)
            throw new BadRequestError(error.PROPERTIES_INVALID);

        const category: ICategory = await CategoryService.update(body);

        return res.status(200).json(category);
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        if (id == null)
            throw new BadRequestError(error.PROPERTIES_INVALID);

        await CategoryService.delete(Number(id))

        return res.status(204).send();
    }
}

export default new CategoryController(); 