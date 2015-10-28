module.exports = {
  development: {
    isProduction: false,
    port: process.env.PORT,
    apiPort: process.env.APIPORT,
    app: {
      name: 'Resource Search Portal'
    }
  },
  production: {
    isProduction: true,
    port: process.env.PORT,
    apiPort: process.env.APIPORT,
    app: {
      name: 'Resource Search Portal'
    }
  }
}[process.env.NODE_ENV || 'development'];
