module.exports = {
  development: {
    isProduction: false,
    apiPort: process.env.APIPORT,
    couchDB: {
      host: 'localhost',
      port: 5984,
      credentials: false,
      ssl: false
    }
  },
  production: {
    isProduction: true,
    apiPort: process.env.APIPORT,
    couchDB: {
      host: 'localhost',
      port: 5984,
      credentials: false,
      ssl: false
    }
  }
}[process.env.NODE_ENV || 'development'];
