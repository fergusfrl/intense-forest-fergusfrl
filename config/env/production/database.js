const parse = require('pg-connection-string').parse;

module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: parse(env('DATABASE_URL')).host,
        port: parse(env('DATABASE_URL')).port,
        database: parse(env('DATABASE_URL')).database,
        username: parse(env('DATABASE_URL')).user,
        password: parse(env('DATABASE_URL')).password,
      },
      options: {
        ssl: true,
      },
    },
  },
});