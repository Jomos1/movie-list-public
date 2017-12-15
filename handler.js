'use strict';
const Pool = require('pg-pool');
const config = require('./config.json')
const { table, host , database, user, password, port } = config
const Client = new Pool({
  host,
  database,
  user,
  password,
  port,
  idleTimeoutMillis : 1000
});

let getAllMovies = "Select * FROM " + table +  " ORDER BY id ASC"

module.exports.hello = (event, context, callback) => {
  Client.connect()
  .then(client => {
    console.log('connected to DB ' + Client.options.database)
    client.release()
    return client.query(getAllMovies)
  })
  .then (data => {
    console.log(data.rows);
  })

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      message : 'SUCC'
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
