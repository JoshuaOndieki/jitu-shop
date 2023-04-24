const express = require('express')
const path = require('path')
const os = require('os')
const app = express()
const APPPORT = process.env.APPPORT || 8080

app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
});

// RUN THE APP TO SERVE index.html
app.listen(APPPORT, () => {
    console.log(`HOSTNAME: ${os.hostname()} APP Listening on PORT: ${APPPORT}`)
});



// RUN THE JSON SERVER TO SERVE db.json
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
const jsonServerPort = process.env.JSONSERVERPORT || 3000
server.listen(jsonServerPort, () => {
  console.log(`HOSTNAME: ${os.hostname()} JSON SERVER Listening on PORT: ${jsonServerPort}`)
});