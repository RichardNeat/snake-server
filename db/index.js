const {MongoClient} = require('mongodb');

const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `${__dirname}/../.env.${ENV}`
});

if (!process.env.uri) {
  throw new Error('URI not set');
};

module.exports = new MongoClient(process.env.uri);