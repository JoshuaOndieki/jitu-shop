const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const cors = require('./cors')
const port = 3000

server.use(middlewares)
server.use(cors())
server.use(router)


server.listen(port, ()=> {
    console.log(`JITU SHOP JSON SERVER LISTENING AT PORT: ${port}`);
})