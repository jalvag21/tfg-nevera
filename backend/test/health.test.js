import { strict as assert } from 'assert';
import request from 'supertest';
import app from '../src/app.js';

describe('GET /api/health', ()=>{
  it('responde 200 y status ok', async ()=>{
    const res = await request(app).get('/api/health');
    assert.equal(res.status, 200);
    assert.equal(res.body.status, 'ok');
  });
});
