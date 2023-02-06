const express = require(`express`)
const app = express()
const mongoose = require(`mongoose`)
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

require('dotenv').config()
app.use(express.json())
app.use(require(`./router/router`))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DBNAME,{
    useNewUrlParser: true, 
    useUnifiedTopology: true
})

app.listen(
    process.env.PORT, 
    ()=> 
        console.log(`http://localhost:${process.env.PORT}`)
        )