import prisma = require("../prismaClient");

const createAdminRole = async () => {
    await prisma.role.create({
        data: {
            name: "admin",
            permissions: {
                connect: [
                    { name: "user.view " },     // note the trailing space
                    { name: "user.edit" },
                    { name: "role.view" },
                    { name: "role.edit" },
                    { name: "product.view " },  // note the trailing space
                    { name: "product.edit" },
                    { name: "order.view" },
                    { name: "order.edit" },
                ]
            }
        }
    });
    console.log("Admin role created");
};

createAdminRole();