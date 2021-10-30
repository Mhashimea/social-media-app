const { db } = require('../util/admin');
const { getStorage, ref, uploadString } = require('firebase/storage');

exports.getAllUsers = (req, res) => {
  let users = [];
  db.collection('users')
    .get()
    .then((data) => {
      data.forEach((doc) => {
        users.push(doc.data());
      });
      return res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.getUserById = (req, res) => {
  let docRef = db.collection('users').where('uid', '==', req.body.uid);
  docRef
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        res.status(200).json({ sucess: true, data: doc.data() });
      });
    })
    .catch((err) => {
      res.status(500).json({ sucess: false, data: err });
    });
};

exports.updateUser = (req, res) => {
  db.collection('users')
    .where('uid', '==', req.body.uid)
    .limit(1)
    .get()
    .then((query) => {
      const tableRef = query.docs[0];
      let data = tableRef.data();
      data = req.body;
      tableRef.ref
        .update(data)
        .then((response) => {
          res.status(200).json({ sucess: true, data: response });
        })
        .catch((err) => {
          res.status(500).json({ sucess: false, data: err });
        });
    });
};

exports.updateProfile = (req, res) => {
  const storage = getStorage();
  const storageRef = ref(storage, req.body.name);
  const base64Url = req.body.avatar;

  uploadString(storageRef, base64Url, 'data_url')
    .then((snapshot) => {
      res.status(200).json({ sucess: true, data: snapshot });
    })
    .catch((err) => {
      res.status(500).json({ sucess: false, data: err });
    });
};
