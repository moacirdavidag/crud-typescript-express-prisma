import { prismaClient } from "../database/prisma-client";
import { Request, Response } from "express";

export class ProductController {

    async createProduct(request: Request, response: Response) {
        try {
            const { name, bar_code, price } = request.body;

            const product = await prismaClient.product.create({
                data: {
                    bar_code,
                    name,
                    price
                },
            });

            return response.status(201).json(product);
        } catch (error: any) {
            return response.status(500).send(error.message);
        }
    }

    async getProducts(request: Request, response: Response) {
        try {
            const products = await prismaClient.product.findMany();
            return response.status(200).send(products);
        } catch (error: any) {
            return response.status(500).send(`Ocorreu um erro: ${error.message}`);
        }
    }

    async updateProduct(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const product = await prismaClient.product.findUnique({
                where: {
                    id
                }
            })

            if (!product) {
                return response.status(404).send({ err: "Produto não encontrado" });
            }

            const updatedProduct = await prismaClient.product.update({
                where: {
                    id
                },
                data: request.body
            })

            return response.status(200).send(updatedProduct);

        } catch (error: any) {
            return response.status(500).send(error.message);
        }
    }

    async deleteProduct(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const product = await prismaClient.product.findFirst({
                where: {
                    id
                }
            });

            if (!product) {
                return response.status(404).send("Produto não encontrado!");
            }

            const deletedProduct = await prismaClient.product.delete({
                where: {
                    id
                }
            });

            return response.status(200).send(deletedProduct);

        } catch (error: any) {
            return response.status(500).send(error.message);
        }
    }
}