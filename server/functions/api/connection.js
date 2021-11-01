const { db } = require('../util/admin');
const { currentUserId } = require('../util/common');

exports.addToFollowList = async (req, res) => {
  try {
    const { userId } = await currentUserId(req, res);
    await db.collection('followings').add({
      userId,
      followingId: req.body.userId,
      status: 1,
    });
    await db.collection('followers').add({
      userId: req.body.userId,
      followerId: userId,
      status: 1,
    });
    return res.status(200).json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
};

exports.getFollowersList = async (req, res) => {
  const { userId } = await currentUserId(req, res);
  let docRef = db
    .collection('followings')
    .where('userId', '==', userId)
    .where('status', '==', 1);
  docRef
    .get()
    .then((querySnapshot) => {
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      res.status(200).json({ success: true, data: data });
    })
    .catch((err) => {
      res.status(500).json({ success: false, data: err.message });
    });
};

exports.getFollowingsList = async (req, res) => {
  const { userId } = await currentUserId(req, res);
  let docRef = db
    .collection('followers')
    .where('userId', '==', userId)
    .where('status', '==', 1);
  docRef
    .get()
    .then((querySnapshot) => {
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      res.status(200).json({ success: true, data: data });
    })
    .catch((err) => {
      res.status(500).json({ success: false, data: err.message });
    });
};

exports.removeFollowers = async (req, res) => {
  const { userId } = await currentUserId(req, res);
  let docRef = db
    .collection('followings')
    .where('userId', '==', userId)
    .where('followingId', '==', req.body.userId)
    .limit(1);
  docRef.get().then((query) => {
    const tableRef = query.docs[0];
    let data = tableRef.data();
    data = req.body;
    tableRef.ref
      .update({ status: 0 })
      .then((response) => {
        res.status(200).json({ success: true, data: response });
      })
      .catch((err) => {
        res.status(500).json({ success: false, data: err });
      });
  });
};

exports.removeFollowings = async (req, res) => {
  const { userId } = await currentUserId(req, res);
  let docRef = db
    .collection('followers')
    .where('userId', '==', userId)
    .where('followerId', '==', req.body.userId)
    .limit(1);
  docRef.get().then((query) => {
    const tableRef = query.docs[0];
    let data = tableRef.data();
    data = req.body;
    tableRef.ref
      .update({ status: 0 })
      .then((response) => {
        res.status(200).json({ success: true, data: response });
      })
      .catch((err) => {
        res.status(500).json({ success: false, data: err });
      });
  });
};
