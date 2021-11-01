const { db } = require('../util/admin');
const { getStorage, ref, uploadString } = require('firebase/storage');
const { currentUserId, uploadAttatchment } = require('../util/common');

exports.getAllUsers = (req, res) => {
  let users = [];
  db.collection('users')
    .get()
    .then((data) => {
      data.forEach((doc) => {
        users.push(doc.data());
      });
      return res.json({ success: true, data: users });
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
        res.status(200).json({ success: true, data: doc.data() });
      });
    })
    .catch((err) => {
      res.status(500).json({ success: false, data: err });
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
          res.status(200).json({ success: true, data: response });
        })
        .catch((err) => {
          res.status(500).json({ success: false, data: err });
        });
    });
};

exports.updateProfile = async (req, res) => {
  let feedUrl;
  const { userId } = await currentUserId(req, res);
  if (req.body.avatar) {
    feedUrl = await uploadAttatchment(`feed-${new Date()}`, req.body.avatar);
  }
  db.collection('users')
    .where('uid', '==', userId)
    .limit(1)
    .get()
    .then((query) => {
      const tableRef = query.docs[0];
      let data = tableRef.data();
      data = req.body;
      tableRef.ref
        .update(data)
        .then((response) => {
          res.status(200).json({ success: true, data: response });
        })
        .catch((err) => {
          res.status(500).json({ success: false, data: err });
        });
    });
};
