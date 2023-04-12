// import libs

const express = require('express');
const cors = require('cors');
const routes = require('./routes')
const app = express()

//use libs
app.use(cors());
app.use(express.json());
routes(app)

module.exports = app