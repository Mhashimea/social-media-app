const { db } = require('../util/admin');
const { uploadAttatchment, currentUserId } = require('../util/common');

exports.getAllFeed = async (req, res) => {
  let userIds = [];
  let feeds = [];
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
  data.forEach(async (doc) => {
    if (userIds.includes(doc.data().userId)) {
      // const userDetails = await getUserData(doc.data().userId);
      feeds.push({
        // ...userDetails[0],
        ...doc.data(),
      });
    }
  });

  return res.json({ success: true, data: feeds });
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
