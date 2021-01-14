const Sequelize = require('sequelize');
const db = require('../database/db.js');
const User = require('./User.js');

const Post = db.sequelize.define(
  'post',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId:{
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
    },
    title: {
      type: Sequelize.STRING,
      defaultValue: '',
      allowNull: false,
    },
    body: {
      type: Sequelize.TEXT,
      defaultValue: '',
     
    },
    image_URL: {
      type: Sequelize.STRING,
      defaultValue: '',
    },
    created_date: {
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false,
    }
  },
);

Post.belongsTo(User);

module.exports = Post;
