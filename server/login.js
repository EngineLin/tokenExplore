/**
 * 路由: /get/login
 * 輸入帳號與密碼進行登入，同時要求一組正確的 Token。
 * 利用 Token 轉譯後找到相對應的資料庫內的資料。
 * 如果 Token 與輸入值是正確的，回傳資料庫掉出來的資料。
 */
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const { database, secretKey } = require('./config');
const { Account } = require('./constants');

// 連結至 mLab 上的 MongoDB。
mongoose.connect(database);

module.exports = ctx => {
  const account = ctx.query.account;
  const password = ctx.query.password;
  const token = ctx.query.token;
  let result = {
    account,
    password,
    token,
  };

  // 登入要求帶入 Token。
  if (!token) {
    ctx.response.status = 401;
    ctx.response.body = 'Token 無值。';
    return;
  }

  ctx.response.type = 'json';
  ctx.response.body = JSON.stringify(result);
};
