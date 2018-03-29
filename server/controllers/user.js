const { postSigninByData } = require('../models/user');

const postSignin = async ctx => {
  const obj = ({ account, password, context } = ctx.request.body);
  console.log(obj);
  const result = await postSigninByData(obj);
  return result;
};

module.exports = {
  postSignin,
};
