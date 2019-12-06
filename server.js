const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
//My modules
const configJson = require('./config.json');
const route = require('./routes/route');

//Variables
const connectionStringMongoDb = process.env.MONGODB || configJson.connectionStringMongoDb;
const hostname = process.env.HOSTNAMEAPI || configJson.hostname;
const port = process.env.PORTAPI || configJson.port;

//Add my router in new file
let app = express();
route(app);


bodyParser = require('body-parser');
mongoose.Promise = global.Promise;
mongoose.connect(connectionStringMongoDb, { useUnifiedTopology: true })
.then(() => 
{
  console.log("Successfully connected to the database");
})
.catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

const server = http.Server(app);
server.listen(port, () => {
  console.log("     ");
  console.log(`Server running at http://${hostname}:${port}/`);
});