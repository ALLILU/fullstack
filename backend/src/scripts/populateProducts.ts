import faker = require("@faker-js/faker");
import prisma = require("../prismaClient");

const populateProducts = async () => {
    const products = new Array(30).fill(null).map(() => {
        return {
            title: faker.faker.commerce.productName(),
            description: faker.faker.commerce.productDescription(),
            price: parseFloat(faker.faker.commerce.price()),
        }
    });
     console.log(products)
     await prisma.product.createMany({
        data: products,
        skipDuplicates: true
     });
    console.log('Products created successfully!');
}

populateProducts();