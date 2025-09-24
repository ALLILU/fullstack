import express = require("express");
const rolesController = require("../controllers/roles");
import authorize = require("../middlewares/authorization");
import permissions = require("../constants");
 
const router = express.Router();


router.get("/", authorize.authorize(["permissions.role.view"]), rolesController.listRoles);
router.post("/", authorize.authorize(["permissions.role.edit"]), rolesController.createRole);


export = router;