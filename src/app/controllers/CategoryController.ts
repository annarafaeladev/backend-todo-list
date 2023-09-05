import { Request, Response, Router } from "express";
import { categoryRepository } from "../repositories/CategoryRepository";
import { ICategory } from "../interfaces/ICategory";
import { Category } from "../entities/Category";
import { BadRequestError, CustomError, NotFoundError } from "../helpers/CutomError";


const categoryController = Router();

categoryController.get('/', async (_req: Request, res: Response): Promise<Response> => {
    const categories = await categoryRepository.find();

    return res.status(200).json(categories);

});

categoryController.post('/', async (req: Request, res: Response): Promise<Response> => {
    const { titulo }: ICategory = req.body;

    console.log(titulo, titulo.length)

    if (!titulo)
        throw new BadRequestError("Titulo não definido");

    const newCategory: ICategory = categoryRepository.create({
        titulo
    });

    await categoryRepository.save(newCategory);

    return res.status(201).send();

});

categoryController.patch('/', async (req: Request, res: Response): Promise<Response> => {
    const { titulo, id }: ICategory = req.body;

    if (id == null)
        throw new BadRequestError("Id invalido");

    if (!titulo)
        throw new BadRequestError("Titulo não definido");

    const category: ICategory | null = await categoryRepository.findOneBy({
        id: Number(id)
    });

    if (category == null)
        throw new NotFoundError("Categoria não encontrada.");

    category.titulo = titulo

    await categoryRepository.save(category);

    return res.status(200).json(category);

});


categoryController.delete('/:id', async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    if (id == null)
        throw new BadRequestError("Não foi possivel deletar categoria, id inválido");


    const category: ICategory | null = await categoryRepository.findOneBy({
        id: Number(id)
    });

    if (category == null)
        throw new CustomError("Não foi possivel deletar, categoria não encontrada.", 404);

    await categoryRepository.delete({ id: category.id });

    return res.status(204).send();

});

export { categoryController }