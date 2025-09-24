import prisma = require("../prismaClient");
import faker = require("@faker-js/faker");



const populateOrder = async () => {
    const products = await prisma.product.findMany();
    const order = new Array(30).fill(null).map(() => {
        
        const orderProducts = faker.faker.helpers.arrayElements(products, { min: 1, max: 5 });
        
        const total = orderProducts.reduce((acc: number, product: any) => acc + product.price, 0);

        return {
            name: faker.faker.person.fullName(),
            email: faker.faker.internet.email(),
            total: parseFloat(faker.faker.commerce.price()),
            createdAt: faker.faker.date.recent({days:7}),
            products: orderProducts,
        }
    });
    await Promise.all(order.map(async (order) => {
        await prisma.order.create({
            data:{
                name: order.name,
                email: order.email,
                total: order.total,
                createdAt: order.createdAt,
                products: {
                    connect: order.products.map((product: any) => ({ id: product.id }))
                }
            }
        })
    }))
    console.log('Orders created successfully!');
    return
 }

 populateOrder();
