import { Request, Response } from "express";
import { prismaClient } from "../database/prisma-client";

export class CategoryController {
    async createCategory(request: Request, response: Response) {
        try {
            const { name } = request.body;

            const category = await prismaClient.category.create({
                data: {
                    name
                }
            });

            return response.status(201).json(category);

        } catch (error: any) {
            return response.status(500).send(`Error: ${error.message}`);
        }
    }

    async getCategoryById(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const category = await prismaClient.category.findFirst({
                where: {
                    id
                }
            });

            if (!category) {
                return response.status(404).send("Categoria não encontrada!");
            }

            return response.status(200).send(category);

        } catch (error: any) {
            return response.status(500).send(error.message);
        }
    }

    async getAllCategories(request: Request, response: Response) {
        try {

            const categories = await prismaClient.category.findMany();

            if (!categories) {
                return response.status(404).send("Nenhuma categoria encontrada!");
            }

            return response.status(200).send(categories);

        } catch (error: any) {
            return response.status(500).send(error.message);
        }
    }

    async updateCategory(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const category = await prismaClient.category.findFirst({
                where: {
                    id
                }
            });

            if (!category) {
                return response.status(404).send("Categoria não encontrada!");
            }

            const updatedCategory = await prismaClient.category.update({
                where: {
                    id
                },
                data: request.body
            });

            return response.status(204).send(updatedCategory);

        } catch (error: any) {
            return response.status(500).send(error.message);
        }
    }

    async deleteCategory(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const category = await prismaClient.category.findFirst({
                where: {
                    id
                }
            });

            if (!category) {
                return response.status(404).send("Categoria não encontrada!");
            }

            const deletedCategory = await prismaClient.category.delete(({
                where: {
                    id
                }
            }));

            return response.status(200).send(deletedCategory);

        } catch (error: any) {
            return response.status(500).send(error.message);
        }
    }

    async insertCategoryProduct(request: Request, response: Response) {
        try {
            const { name, price, bar_code, id_category } = request.body;

            const product = await prismaClient.productCategory.create({
                data: {
                    product: {
                        create: {
                            bar_code,
                            name,
                            price,
                        },
                    },
                    category: {
                        connect: {
                            id: id_category,
                        },
                    },
                },
            });

            return response.status(201).send(product);

        } catch (error: any) {
            return response.status(500).send(error.message);
        }
    }

}
