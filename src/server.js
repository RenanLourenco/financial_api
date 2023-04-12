const app = require('./index');
require('dotenv').config()
const port = process.env.PORT
window.salt = process.env.SECRET

app.listen(port, () => {
    console.log('server listening in port: ' + port);
})