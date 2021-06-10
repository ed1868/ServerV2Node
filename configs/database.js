const mongoose = require('mongoose')

// Don't forget to set "MONGODB_URI" in ~/server/.env
const uri =
  process.env.MONGODB_URI ||
  `mongodb://localhost/please-set-process-env-mongodb-uri`


var username = 'eddie';
var password = 'alien4721';
var hosts = 'iad2-c9-2.mongo.objectrocket.com:53422,iad2-c9-0.mongo.objectrocket.com:53422,iad2-c9-1.mongo.objectrocket.com:53422';
var database = 'nomadserver';
var options = '?replicaSet=8c7842f155c74eb5811241ae1a901f4a';
var connectionString = 'mongodb://' + username + ':' + password + '@' + hosts + '/' + database + options;


mongoose
  .connect(connectionString, { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  })
