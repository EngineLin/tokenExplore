const mongoose = require('mongoose');
const { dbname, dbuser, dbpassword } = require('./base');

const dbURL = dbname
  .replace(/<dbuser>/, dbuser)
  .replace(/<dbpassword>/, dbpassword);

const db = mongoose.connection;

db.on('error', err => console.error(`連結資料庫失敗: ${err}`));
db.once('open', () => console.log('成功連結資料庫'));

mongoose.connect(dbURL);

module.exports = mongoose;
