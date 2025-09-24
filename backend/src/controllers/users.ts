import express = require("express");
import prisma = require("../prismaClient");
import hashsync = require("bcryptjs");

const createUser = async (req: express.Request, res: express.Response) => {
   console.log('req.body', req.body);
   
   const userData: any = {
       name: req.body.name,
       email: req.body.email,
       password: {
           create: {
               hash: hashsync.hashSync(req.body.password, 10)
           }
       }
   };
   
   // Only add role if roleId is provided and exists
   if (req.body.roleId) {
       const roleExists = await prisma.role.findFirst({
           where: { id: req.body.roleId }
       });
       if (roleExists) {
           userData.role = {
               connect: { id: req.body.roleId }
           };
       }
   }
   
   const newUser = await prisma.user.create({
       data: userData
   });
   res.status(201).json(newUser);
};

const listUsers = async (req: express.Request, res: express.Response) => {
    const users = await prisma.user.findMany();
    res.json(users);
};

const getUser = async (req: express.Request, res: express.Response) => { 
    const userId = req.params.id;
    const user = await prisma.user.findFirst({
        where: {
            id: Number(userId)
        }
    });
    if (!user) {
        res.status(404).json({ message: "User not found" });
    } else {
        res.json(user);
    }
};

export = { createUser, listUsers, getUser };