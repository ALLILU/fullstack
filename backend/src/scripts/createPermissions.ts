import prisma = require("../prismaClient");

const createPermissions = async () => {
    await prisma.permission.createMany({
        data: [
            { name: "user.view " }, 
            { name: "user.edit" },
            { name: "role.view" },
            { name: "role.edit" },
            { name: "product.view " },
            { name: "product.edit" },
            { name: "order.view" },
            { name: "order.edit" }, 
        ],  
        skipDuplicates: true
    });
    console.log("Permissions created");
};
createPermissions()