const mongoose = require('mongoose');

// 設定 Account Document 的表格格式，其中 _id 會由系統自動產生。
exports.Account = mongoose.model('Account', {
  account: String,
  password: String,
  context: String,
});