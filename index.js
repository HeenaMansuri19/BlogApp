const express = require('express')
const app = express();
require('./model/config')
const dotenv = require ('dotenv')
dotenv.config()
const bodyparser = require('body-parser')
const routers = require('./routers/mainRouters')

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routers)

const server = app.listen(process.env.PORT,function(req,res){
    console.log(`Server is running on port no:${process.env.port}`);
})

module.exports = server