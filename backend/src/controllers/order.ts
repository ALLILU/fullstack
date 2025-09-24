import express = require("express");
import prisma = require("../prismaClient");

const listOrders = async (req: express.Request, res: express.Response) => {
    const order = await prisma.order.findMany(
        {
        include: {
            products: true
            }
        }
    );
    return res.status(200).json(order);
};

const getOrderById = async (req: express.Request, res: express.Response) => {
    const order = await prisma.order.findUnique({
        where: { 
            id: Number(req.params.id) 
        },
        include: {
            products: true
        }
    }); 
    if (!order) {
        return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(order);
};

const createOrder = async (req: express.Request, res: express.Response) => {
    const newOrder = await prisma.order.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            total: req.body.total,
            createdAt: req.body.createdAt? new Date(req.body.createdAt) : new Date(),
            products: {
                connect: req.body.products.map((productId: number) => ({ id: productId}))
            }
        }
    });
    return res.status(201).json(newOrder);
};

export = { listOrders, getOrderById ,createOrder}; 