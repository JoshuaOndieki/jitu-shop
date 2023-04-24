const express = require('express')
const path = require('path')
const os = require('os')
const app = express()
require('dotenv').config()
const APPPORT = process.env.APPPORT || 8080


function ipHostCheck() {
  const https = require('https');

  https.get(`https://api.ipdata.co?api-key=${process.env.IP_DATA_API_KEY}`, (response) => {
    let data = '';
  
    response.on('data', (chunk) => {
      data += chunk;
    });
  
    response.on('end', () => {
      let myIP = JSON.parse(data).ip
      // console.log(JSON.parse(data));
      console.log(`CURRENT IP ADDRESS: ${myIP}`);
  
      // https.get(`${myIP}:3000/products`, (response) => {
      //   let data = '';
      
      //   response.on('data', (chunk) => {
      //     data += chunk;
      //   });
      
      //   response.on('end', () => {
      //     console.log('json-server data: ', data);
      //   });
      // });
    });
  });
}



app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
});

// RUN THE APP TO SERVE index.html
app.listen(APPPORT, () => {
    console.log(`HOSTNAME: ${os.hostname()} APP Listening on PORT: ${APPPORT}`)
    ipHostCheck()
});



// RUN THE JSON SERVER TO SERVE db.json
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
const jsonServerPort = process.env.JSONSERVERPORT || 3000
const localhost = 'localhost'
server.listen(jsonServerPort, localhost, () => {
  console.log(`JSON SERVER RUNNING AT http://${localhost}:${jsonServerPort}`)
});