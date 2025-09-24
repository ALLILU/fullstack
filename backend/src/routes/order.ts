import express = require("express");
const ordersController = require("../controllers/order");
import authorize = require("../middlewares/authorization");
import permissions = require("../constants");


const router = express.Router(); 

router.post('/', ordersController.createOrder);
router.get('/', authorize.authorize(["permissions.order.view"]),ordersController.listOrders); 
router.get('/:id', authorize.authorize(["permissions.order.view"]),ordersController.getOrderById);

export = router; 
