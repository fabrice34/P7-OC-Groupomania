const Sequelize = require('sequelize');
const db = require('../database/db.js');

module.exports = db.sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    created_date: {
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    },
    image_URL: {
      type: Sequelize.STRING,
      defaultValue: '',
    },
  },
);
