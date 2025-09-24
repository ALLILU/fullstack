import express = require("express");
import prisma = require("../prismaClient");

const listProducts = async (req: express.Request, res: express.Response) => {
    const products = await prisma.product.findMany();
    return res.status(200).json(products);
};

const getProductById = async (req: express.Request, res: express.Response) => {
    const product = await prisma.product.findUnique({
        where: { 
            id: Number(req.params.id) 
        }
    }); 
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(product);
};

const createProduct = async (req: express.Request, res: express.Response) => {
    const newProduct = await prisma.product.create({
        data: {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price
        }
    });
    return res.status(201).json(newProduct);
};

export = { listProducts, createProduct, getProductById }; 