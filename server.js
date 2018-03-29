// Koa 文件的入口
const Koa = require('koa');
const Router = require('koa-router');
const json = require('koa-json');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const historyApiFallback = require('koa-history-api-fallback');
const path = require('path');

const Auth = require('./server/routes/auth');

let router = new Router();
let app = new Koa();
app.use(logger());
app.use(json());
app.use(bodyParser());

app.use(async (ctx, next) => {
  let start = new Date();
  await next();
  let ms = new Date() - start;
  console.log('%s %s - $s', ctx.method, ctx.url, ms);
});

app.on('error', err => console.log(`伺服器錯誤: ${err}`));

router.use('/auth', Auth.routes());

app.use(router.routes());
app.use(historyApiFallback());
app.use(serve(path.join(__dirname, 'dist')));

module.exports = app.listen(process.env.PORT || 3003, () =>
  console.log('伺服器已經成功開啟。')
);
