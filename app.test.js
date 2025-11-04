import request from 'supertest';
import app from './app.js'

import {sum} from './app.js';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('hello world', async () => {
  const res = await request(app)
    .get('/')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({
      hello: 'hello world'
    })

})