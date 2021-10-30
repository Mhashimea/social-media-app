const { admin, db } = require('../util/admin');
const {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} = require('firebase/storage');

exports.uploadAttatchment = async (refName, fileUrl) => {
  const storage = getStorage();
  const storageRef = ref(storage, refName);
  const base64Url = fileUrl;

  await uploadString(storageRef, base64Url, 'data_url');
  const url = await getDownloadURL(storageRef);
  return url;
};

exports.currentUserId = async (req, res, next) => {
  let userId;
  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    idToken = req.headers.authorization.split('Bearer ')[1];
  }
  await admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      userId = decodedToken.user_id;
    });
  return { userId };
};
