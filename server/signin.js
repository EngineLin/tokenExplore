/**
 * 路由: /post/signin
 * 接收註冊資料，將註冊成功的資料放到資料庫內。
 * 產生並回傳一組 Token。
 * Token 利用 jsonWebToken 插件生成，特性是:
 * Token 的有效時間是 15 分鐘。
 */
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const mongodb_config = require('./config');
const { Account } = require('./constants');

// 連結至 mLab 上的 MongoDB。
mongoose.connect(mongodb_config.database);

module.exports = async ctx => {
  const account = ctx.query.account;
  const password = ctx.query.password;
  const context = ctx.query.context;

  let newAccount = new Account({
    account: account,
    password: password,
    context: context,
  });
  let result;

  // #TOADD 只有簡單判斷帳號跟密碼要有值，正確的作法應該進行格式的判斷。
  if (!account || !password) {
    result = {
      status: '輸入值不符合格式。',
      accountData: {
        _id: null,
        account,
        password,
      },
      token: null,
    };

    ctx.response.type = 'json';
    ctx.response.body = JSON.stringify(result);
    return;
  }

  // 這邊使用 async/await 可以確保 newAccount.save 動作結束，
  // 且確認成功/失敗、改變 result 的值之後再進行 API 數值的回傳。
  await newAccount
    .save()
    .then(res => {
      console.log(`成功儲存新帳號到 DataBase，新帳號資料: ${res}`);

      const payload = {
        _id: res._id,
        account: res.account,
        password: res.account,
      };

      // 利用 jwt 製作 Token
      // 第一個參數是包含包裝值(即 payload)與 Token 特性的物件，
      // 這邊的特性是時效性(15分鐘)，第二個參數是私人的密鑰，存在後端不要讓別人知道。
      const token = jwt.sign(
        { payload, exp: Math.floor(Date.now() / 1000) + 60 * 15 },
        mongodb_config.secretKey
      );

      result = {
        status: '成功註冊帳號，產生 Token',
        accountData: res,
        token: token,
      };
    })

    .catch(err => {
      console.log(`儲存帳號到 DataBase 出現問題: ${err}`);
      result = err;
    });

  ctx.response.type = 'json';
  ctx.response.body = JSON.stringify(result);
};
