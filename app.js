const express = require("express");
const app = express();
require('dotenv/config');
const mongoose = require("mongoose");
const verifyToken = require("./middleware/authverfiy")

const productSchema = require('./routers/products')
const categorySchema = require('./routers/categories')
const orderRoute = require('./routers/orders')
const userSchema = require('./routers/user')
const yaml = require("yamljs")
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = yaml.load("swagger.yaml")


const cors = require('cors');

app.use(cors());

app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(`/api-docs`, swaggerUi.serve,swaggerUi.setup(swaggerDocument))

const api = process.env.API_URL;

mongoose
  .connect(process.env.CONNECTION_STRING, {
    dbName: "sample_eshop",
  })
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });
 

app.use(`${api}/users`,userSchema)


app.use(`${api}/products`,productSchema)
app.use(`${api}/categories`,categorySchema)
app.use(`${api}/order`,orderRoute)



app.listen(3000, () => {
  console.log("server is running");
});
