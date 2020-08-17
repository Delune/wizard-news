
// setting up postgres driver
const pg = require('pg')
const postgresURL = 'postgres://localhost/wnews'
const client = new pg.Client(postgresURL)

// connection to postrgres server
client.connect()

// make the client available as a Node module
module.exports = client