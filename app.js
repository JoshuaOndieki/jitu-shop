const express = require('express')
const path = require('path')
const os = require('os')
const app = express()
const port = 8080

app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
});

app.listen(port, () => {
  console.log(os.hostname());
    console.log('Listening on port: ' + port)
});