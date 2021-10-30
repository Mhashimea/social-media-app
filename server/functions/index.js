const functions = require('firebase-functions');
const app = require('express')();
const cors = require('cors');
const firebaseAuth = require('./util/middleware');

const {
  getAllUsers,
  getUserById,
  updateUser,
  updateProfile,
} = require('./api/user');
const { signup, signin, me } = require('./api/auth');

app.use(cors());

app.get('/users', getAllUsers);
app.get('/userById', firebaseAuth, getUserById);
app.post('/update-user', updateUser);
app.post('/upload-avatar', updateProfile);

app.post('/signup', signup);
app.post('/signin', signin);
app.get('/me', me);

exports.api = functions.region('europe-west1').https.onRequest(app);
