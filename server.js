const http = require('http')
const app = require('./app')
const { PORT } = require('./config/config')
const connectToDB =require("./db/db")


const server = http.createServer(app)
connectToDB()
server.listen(PORT, () => console.log(`Running in ${process.env.NODE_ENV} mode on port ${PORT}`))