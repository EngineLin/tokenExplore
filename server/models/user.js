const db = require('../config/db');

const Signin = db.model('Account', {
  account: String,
  password: String,
  context: String,
});

const postSigninByData = async obj => {
  const newSignin = new Signin(obj);
  return true
};

module.exports = {
  postSigninByData,
};
