const router = new require('koa-router')();
const { postSignin } = require('../controllers/user');

router.post('/user', postSignin);

module.exports = router;
