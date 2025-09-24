import express = require("express");
import prisma = require("../prismaClient");
import compareSync = require("bcryptjs");
import  jwt = require("jsonwebtoken");
import config = require("../config");

const login = async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;
    const user = await prisma.user.findFirst({
        where: { email },
        include: {
            password: true,
            role: true
        }
    });
    
    if (!user) {
        return res.status(404).send({ message: "Failed to login" });
    } 
    
    if (!compareSync.compareSync(password, user.password?.hash || "")) { 
        return res.status(404).send({ message: "Invalid credentials" });
    }
    
    const userPayload = {
        userId: user.id,
        roleId: user.role?.id
     }
     const token = jwt.sign(userPayload, config.jwtSecret, { expiresIn: "1d" })

    res.status(200).json({ 
        token: token, 
        userId: user.id,
        name: user.name,
        email: user.email,
        roleId: user.role?.id
    });
};
 
export = { login };