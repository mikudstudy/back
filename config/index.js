// figure out what set of credentials to return
// if - we are in production - return the prod set of keys
// else - we are in development - return the dev keys
var config = process.env.DB_URI;

// // keys.js - figure out what set of credentials to return
// if (process.env.NODE_ENV === 'production') {
//   // we are in production - return the prod set of keys
//   config 
// } else {
//   // we are in development - return the dev keys!!!
//   // config = require('./dev')
// }

module.exports = config
