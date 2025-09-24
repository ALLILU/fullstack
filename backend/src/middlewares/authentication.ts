import express = require("express");
import jwt = require("jsonwebtoken");
import config = require("../config");
import prisma = require("../prismaClient");

const NO_AUTH_PATHS = ["/auth/login", "/users", "/products", "/order"];

const authenticate = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (NO_AUTH_PATHS.includes(req.path)) {
        next();
        return;
    }
    const authorizationheader = req.header("Authorization");
    const token = authorizationheader?.split(' ')[1];

    if (!token) {
        return res.status(401).send("Unauthorized");
   }
    try {
        const decodedData = jwt.verify(token, config.jwtSecret) as any;
    
        (req as any).userId = decodedData.userId;
        (req as any).roleId = decodedData.roleId;
        next();
    } catch (error) {
        console.log('authenticate error', error);
        return res.status(401).send({ message: "Unauthorized" });
    }
};

export = { authenticate };