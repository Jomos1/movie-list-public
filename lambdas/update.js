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

let update = `UPDATE ${table} (SET title =  ${data.title}, year =  ${data.year}, genre = ${data.genre} WHERE id = ${data.id})`;
console.log(data);

module.exports.update = (event, context, callback) => {
  Client.connect()
  .then(client => {
    console.log('connected to DB ' + Client.options.database);
    client.release();
    return client.query(update);
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
