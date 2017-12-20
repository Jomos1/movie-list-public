'use strict';

const Pool = require('pg-pool');
const config = require('./config.json');
const {table, host, database, user, password, port} = config;
const Client = new Pool({
  host,
  database,
  user,
  password,
  port,
  idleTimeoutMillis : 1000
});

let post = `INSERT INTO ${table} VALUES (${data.id}, ${data.title}, ${data.year}, ${data.genre})`;

module.exports.post = (event, context, callback) => {
  Client.connect()
  .then(client => {
    console.log('connected to DB ' + Client.options.database);
    client.release();
    return client.query(post);
  })
 .then (data => {
   console.log(data.rows)
})
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message : event
    })
  };
  callback(null, response);
};
