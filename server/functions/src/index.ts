const functions = require('firebase-functions');
const app = require('express')();

const { getUsers } = require('./api/todos');

app.get('/users', getUsers);

exports.api = functions.https.onRequest(app);
