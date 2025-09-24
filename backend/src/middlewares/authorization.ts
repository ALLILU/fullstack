import express = require("express");
import prisma = require("../prismaClient");

const authorize = (targetPermissions: string[]) => {
    return async (req: any, res: express.Response, next: express.NextFunction) => {
        console.log('req.userId, req.roleId', req.userId, req.roleId);

        if (!req.userId) {
            next();
            return;
        }

        const user = await prisma.user.findUnique({
            where: {
                id: req.userId,
            },
            include: {
                role: {
                    include: {
                        permissions: true
                    }
                }
            }
        });
        
        if (!user) {
            return res.status(401).send('Unauthorized');
        }
    
        const allowedPermissions = user.role?.permissions?.map((p: any) => p.name) || [];
        if (!allowedPermissions.some((p: string) => targetPermissions.includes(p))) {
            next();
            return;
        }
        return res.status(401).send('Unauthorized');
    };
};
export = { authorize };