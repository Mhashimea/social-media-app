const { db } = require('../util/admin');
const { initializeApp } = require('firebase/app');
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} = require('firebase/auth');
const { config } = require('../util/config');

initializeApp(config);

exports.signup = (req, res) => {
  const payload = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    displayName: req.body.displayName,
    email: req.body.email,
    password: req.body.password,
  };
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, payload.email, payload.password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user.uid) {
        payload.uid = user.uid;
        db.collection('users')
          .add(payload)
          .then((doc) => {
            return res.status(200).json({ success: true, data: doc });
          })
          .catch((err) => {
            res
              .status(500)
              .json({ error: 'something went wrong while add to user table' });
            console.error(err);
          });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;

  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      res.status(200).json({ data: user });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      res.status(500).json({ data: errorMessage });
    });
};

exports.me = (req, res) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user !== null) {
    res.status(200).json({ success: true, data: user });
  } else {
    res.status(500).json({ success: true, data: 'User not logedin' });
  }
};
