
const { db } = require('../util/admin');

exports.getUsers = (request: any, response: any) => {
  db.collection('users').get().then((data: any) => {
    console.log(data)
    return response.json(data);
  }).catch((err: any) => {
    console.error(err);
    return response.status(500).json({ error: err.code });
  });
}