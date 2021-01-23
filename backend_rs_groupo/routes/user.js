const express = require('express');

const users = express.Router();
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

users.post('/signup',  userCtrl.signup);// ok!!
users.post('/login', auth, userCtrl.rateLimit, userCtrl.login);//  ok!!
users.delete('/delete/:id', auth, userCtrl.deleteAccount);// ok!!
users.get('/userInfo/:email', auth, userCtrl.userInfo);
users.get('/usersInfo', auth, userCtrl.usersInfo); // ok!!
users.put('/:id', auth,  userCtrl.changeInfo);//

module.exports = users;
