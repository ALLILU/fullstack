import express = require("express");
import prisma = require("../prismaClient");


const listRoles = async (req: any, res: express.Response) => {
    console.log(req.userId);
    const roles = await prisma.role.findMany({
            include: {
            permissions: true,
        }
    });
    res.json(roles);
};
const createRole = async (req: express.Request, res: express.Response) => {
    console.log('req.body', req.body.permissions);
    const newRole  = await prisma.role.create({
        data: {
            name: req.body.name,
            permissions: {
                connect: req.body.permissions.map((p: any) => ({ name: p }))
            }
        }
    });
    res.status(201).json({newRole});
};

export = { listRoles, createRole };
