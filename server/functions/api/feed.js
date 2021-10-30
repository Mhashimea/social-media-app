const { db } = require('../util/admin');
const { uploadAttatchment, currentUserId } = require('../util/common');

exports.getAllFeed = (req, res) => {
  let feeds = [];
  db.collection('feed')
    .get()
    .then((data) => {
      data.forEach((doc) => {
        feeds.push(doc.data());
      });
      return res.json(feeds);
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
    console.log('feedUrl', feedUrl);
  }

  const payload = {
    attatchmentUrl: feedUrl,
    description: req.body.description,
    status: true,
    userId: userId,
    createdAt: new Date(),
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
