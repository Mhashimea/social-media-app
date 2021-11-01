const { db } = require('../util/admin');
const { uploadAttatchment, currentUserId } = require('../util/common');

exports.getAllFeed = async (req, res) => {
  let userIds = [];
  let feeds = [];
  let returnData = [];
  const { userId } = await currentUserId(req, res);

  // Get the followings user data
  userIds.push(userId);
  let docRef = db
    .collection('followings')
    .where('userId', '==', userId)
    .where('status', '==', 1);
  await docRef.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      userIds.push(doc.data().followingId);
    });
  });

  const data = await db.collection('feed').get();
  data.forEach((doc) => feeds.push(doc.data()));

  for (let i = 0; i < feeds.length; i++) {
    let feed = feeds[i];
    const userDetails = await getUserData(feed.userId);
    if (userDetails && userDetails.length)
      feed = { ...feed, ...userDetails[0] };
    returnData.push(feed);
  }

  return res.json({ success: true, data: returnData });
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

const getUserData = async (userId) => {
  let users = [];
  let docRef = await db
    .collection('users')
    .limit(1)
    .where('uid', '==', userId)
    .get();
  docRef.forEach((doc) => {
    users.push(doc.data());
  });
  return users;
};
