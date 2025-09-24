import express = require("express");
const usersController = require("../controllers/users");
import authorize = require("../middlewares/authorization");
import authenticate = require("../middlewares/authentication");
import permissions = require("../constants");


const router = express.Router(); 

router.post('/', authorize.authorize(["permissions.user.edit"]), usersController.createUser);
router.get('/', authorize.authorize(["permissions.user.view"]),usersController.listUsers); 
router.get('/:id', authorize.authorize(["permissions.user.view"]),usersController.getUser);

export = router; 
