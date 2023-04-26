const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const cors = require('cors')

port = 3000

server.use(middlewares)
server.use(router)
server.use(cors())

server.listen(port, ()=> {
    console.log(`JITU SHOP JSON SERVER LISTENING AT PORT: ${port}`);
})