const express = require('express')
const path = require('path')
const os = require('os')
const app = express()
const { exec } = require('child_process');
require('dotenv').config()
const APPPORT = process.env.APPPORT || 8080
const jsonServerPort = process.env.JSONSERVERPORT || 3000
const localhost = 'localhost'


async function getIp(){
  const command = os.platform() === 'win32' ? 'ipconfig | findstr /i "IPv4"' : 'hostname -I'
  const {stdout, stderr} = await new Promise ((resolve, reject)=>{
    exec(command, async (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      reject(error)
    }
    resolve({stdout, stderr})
  });})

  let ip;
  if (os.platform() === 'win32') {
    const ipv4Regex = /IPv4*/i;
    const match = ipv4Regex.exec(stdout);
    ip = match.input.split(':')[1].trim()
  } else {
    ip = stdout.trim()
  }

  return ip
}

app.set('view engine', 'ejs');
app.use('/public', express.static(__dirname + '/public'));

app.get('/', async (req, res) => {
    res.render(path.join(__dirname, 'views/index.ejs'), {FETCH_HOSTNAME: await getIp(), FETCH_PORT: jsonServerPort})
});


// RUN THE APP TO SERVE index.html
app.listen(APPPORT, async() => {
    console.log(`APP RUNNING AT ${await getIp()}:${APPPORT}`)
});



// RUN THE JSON SERVER TO SERVE db.json
const jsonServer = require('json-server');
// const { get } = require('http')
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

async function runJsonServer() {
  let ip = await getIp()
  // console.log(ip);
  server.listen(jsonServerPort, '0.0.0.0' || localhost, () => {
    console.log(`JSON SERVER RUNNING AT http://${ip || localhost}:${jsonServerPort}`)
  });

}


runJsonServer()