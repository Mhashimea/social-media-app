const { db } = require('../util/admin');
const { uploadAttatchment, currentUserId } = require('../util/common');

exports.getAllFeed = async (req, res) => {
  let data = [];
  let feeds = [];
  const { userId } = await currentUserId(req, res);
  let docRef = db
    .collection('followings')
    .where('userId', '==', userId)
    .where('status', '==', 1);
  docRef.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
  });

  console.log(data);

  db.collection('feed')
    .get()
    .then((data) => {
      data.forEach((doc) => {
        feeds.push(doc.data());
      });
      return res.json({ success: true, data: feeds });
    })
    .catch((err) => {
      res.status(500).json({ error: err.code });
    });
};

exports.addFeed = async (req, res) => {
  const { userId } = await currentUserId(req, res);
  let feedUrl;

  if (req.body.attatchmentUrl) {
    feedUrl = await uploadAttatchment(
      `feed-${new Date()}`,
      req.body.attatchmentUrl
    );
  }

  const payload = {
    attatchmentUrl: feedUrl,
    status: true,
    userId: userId,
    createdAt: new Date(),
    type: req.body.type,
  };

  db.collection('feed')
    .add(payload)
    .then((doc) => {
      return res.status(200).json({ success: true, data: doc });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Internal Server Error' });
    });
};
