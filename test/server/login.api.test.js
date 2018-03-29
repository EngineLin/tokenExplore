import server from '../../server/server.js';
import request from 'supertest';

describe('login API 測試', () => {
  afterEach(() => {
    server.close();
  });

  it('如果登入時沒有帶入 Token，回傳狀態 401:', async () => {
    const response = await request(server)
      .get('/get/login')
      .query({ account: 'test@example.com', password: 'test123' });
    expect(response.status).toBe(401);
  });
});
