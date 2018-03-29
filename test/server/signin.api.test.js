import request from 'supertest';
import server from '../../server/server.js';

describe('signin API 測試', () => {
  afterEach(() => {
    // 當所有測試跑完後，關閉 server
    server.close();
  });

  it('進行帳號註冊，應該回傳成功訊息。', async () => {
    const response = await request(server)
      .post('/post/signin')
      .query({
        account: 'test@example.com',
        password: 'test123',
        context: 'nothing',
      });
    expect(response.body.status).toBe('成功註冊帳號，產生 Token');
  });
  it('當進行帳號註冊，帳號無值的情況下應該回傳失敗訊息', async () => {
    const response = await request(server)
      .post('/post/signin')
      .query({
        password: 'test123',
        context: 'nothing',
      });
    expect(response.body.status).toBe('輸入值不符合格式。')
  });
  it('當進行帳號註冊，密碼無值的情況下應該回傳失敗訊息', async () => {
    const response = await request(server)
      .post('/post/signin')
      .query({
        account: 'test@example.com',
        context: 'nothing',
      });
    expect(response.body.status).toBe('輸入值不符合格式。')
  });
});
