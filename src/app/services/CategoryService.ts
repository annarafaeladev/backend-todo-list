import { BadRequestError, InternalServerError, NotFoundError } from "../helpers/api-errors";
import { ICategory, ICategoryRequest, ICategoryDTO } from "../interfaces/ICategory";
import { categoryRepository } from "../repositories/CategoryRepository";
import error from "../constants/errors.json";
import { IUserDTO } from "../interfaces/IUser";

class CategoryService {

    getCategoryDto(category: ICategory): ICategoryDTO {
        return {
            id: category.id,
            title: category.title
        }
    }

    async create(req: ICategoryRequest, user: Partial<IUserDTO>): Promise<ICategoryDTO | null> {
        const newCategory: ICategory = categoryRepository.create({
            title: req.title,
            user
        });

        const category: ICategory = await categoryRepository.save(newCategory);

        if (category == null)
            throw new BadRequestError(error.CATEGORY_ERROR_REGISTER);


        return this.getCategoryDto(category);
    }

    async find(user: Partial<IUserDTO>): Promise<ICategoryDTO[]> {
        const categories: ICategoryDTO[] | undefined = await categoryRepository.find({
            where: {
                user: { id: user.id }
            },
            select: ["id", "title"]
        });

        if (categories == undefined)
            throw new InternalServerError(error.CATEGORY_ERROR_FIND_ALL);

        return categories;
    }

    async update(req: ICategoryDTO, user: Partial<IUserDTO>): Promise<ICategoryDTO> {
        const category: ICategory | null = await categoryRepository.findOneBy({
            user: { id: user.id },
            id: req.id,
        });

        if (category == null)
            throw new NotFoundError(error.CATEGORY_NOT_FOUND);

        category.title = req.title

        await categoryRepository.save(category);

        return this.getCategoryDto(category);
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