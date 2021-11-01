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
const { getAllFeed, addFeed } = require('./api/feed');
const {
  addToFollowList,
  getFollowersList,
  removeFollowers,
  getFollowingsList,
} = require('./api/connection');

app.use(cors());

app.get('/users', getAllUsers);
app.get('/userById', firebaseAuth, getUserById);
app.post('/update-user', updateUser);
app.post('/upload-avatar', updateProfile);

app.get('/feeds', getAllFeed);
app.post('/add-feed', firebaseAuth, addFeed);
app.post('/add-follower', addToFollowList);
app.get('/get-followers', getFollowersList);
app.get('/get-followings', getFollowingsList);
app.post('/remove-follower', removeFollowers);

app.post('/signup', signup);
app.post('/signin', signin);
app.get('/me', firebaseAuth, me);

exports.api = functions.region('europe-west1').https.onRequest(app);
