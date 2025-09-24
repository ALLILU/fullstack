import express = require("express");
const productsController = require("../controllers/products");
import authorize = require("../middlewares/authorization");
import permissions = require("../constants");


const router = express.Router(); 

router.post('/', authorize.authorize(["permissions.product.edit"]), productsController.createProduct);
router.get('/', authorize.authorize(["permissions.product.view"]),productsController.listProducts); 
router.get('/:id', authorize.authorize(["permissions.product.view"]),productsController.getProductById);

export = router; 
