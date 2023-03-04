// import libs

const express = require('express');
const cors = require('cors');
const routes = require('./routes')
require('dotenv').config()
const port = process.env.PORT
const app = express()

//use libs
app.use(cors());
app.use(express.json());

routes(app)


app.listen(port, () => {
    console.log('server listening in port: ' + port);
})

module.exports = app