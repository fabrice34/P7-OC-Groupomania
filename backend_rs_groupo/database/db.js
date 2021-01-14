const Sequelize = require('sequelize');

const db = {};
const sequelize = new Sequelize(process.env.dbName, process.env.dbUser, process.env.dbPassword, {
  host: process.env.dbHost,
  dialect: 'mysql',
  // operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.sequelize.sync();

module.exports = db;
