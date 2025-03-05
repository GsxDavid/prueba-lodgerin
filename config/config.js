require('dotenv').config()

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT,
    "logging": false
  },
  "test": {
    "username": process.env.DB_USERNAME_TEST || "root",
    "password": process.env.DB_PASSWORD_TEST || null,
    "database": process.env.DB_DATABASE_TEST || "lodgerin_test",
    "host": process.env.DB_HOST_TEST || "127.0.0.1",
    "dialect": process.env.DB_DIALECT_TEST || "postgres"
  },
  "production": {
    "username": process.env.DB_USERNAME_PROD || "root",
    "password": process.env.DB_PASSWORD_PROD || null,
    "database": process.env.DB_DATABASE_PROD || "lodgerin_production",
    "host": process.env.DB_HOST_PROD || "127.0.0.1",
    "dialect": process.env.DB_DIALECT_PROD || "postgres"
  }
}