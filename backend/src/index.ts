import express = require('express');
import bodyParser = require('body-parser');
import AuthRouter = require('./routes/auth');
import UsersRouter = require('./routes/users');
import RolesRouter = require('./routes/roles');
import authenticate = require('./middlewares/authentication');
import authorize = require('./middlewares/authorization');
import ProductsRouter = require('./routes/products');
import OrderRouter = require('./routes/order');
import populateProducts = require('./scripts/populateProducts');


const app = express();
 
app.use(bodyParser.json());
  
// Public routes (no authentication required)
app.use('/auth', AuthRouter);
app.use('/products', ProductsRouter);
app.use('/order', OrderRouter);

// Apply authentication middleware for protected routes
app.use(authenticate.authenticate);
app.use('/users', UsersRouter);
app.use('/roles', RolesRouter);




app.get("/b", (req, res) => {  
  res.send("Hello World!!!");
});

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});