import { BadRequestError, InternalServerError, NotFoundError } from "../helpers/api-errors";
import { ICategory, ICategoryRequest, ICategoryUpdateRequest } from "../interfaces/ICategory";
import { categoryRepository } from "../repositories/CategoryRepository";
import error from "../constants/errors.json";

class CategoryService {

    async create(req: ICategoryRequest): Promise<ICategory | null> {
        const newCategory: ICategory = categoryRepository.create({
            title: req.title
        });

        const category: ICategory = await categoryRepository.save(newCategory);

        if (category == null)
            throw new BadRequestError(error.CATEGORY_ERROR_REGISTER);

        return category;
    }

    async find() {
        const categories: ICategory[] | undefined = await categoryRepository.find();

        if (categories == undefined)
            throw new InternalServerError(error.CATEGORY_ERROR_FIND_ALL);

        return categories;
    }

    async update(req: ICategoryUpdateRequest): Promise<ICategory> {
        const category: ICategory | null = await categoryRepository.findOneBy({
            id: Number(req.id)
        });

        if (category == null)
            throw new NotFoundError(error.CATEGORY_NOT_FOUND);

        category.title = req.title

        return await categoryRepository.save(category);
    }

    async delete(id: number) {
        const category: ICategory | null = await categoryRepository.findOneBy({
            id
        });

        if (category == null)
            throw new NotFoundError(error.CATEGORY_NOT_FOUND);

        await categoryRepository.delete({ id: category.id });
    }


};

export default new CategoryService();