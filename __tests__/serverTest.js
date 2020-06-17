/**
 *
 *@description Use Supertest, require your app and supertest
 *
 **/

const supertest = require('supertest');
const app = require('../src/server/server')

const request = supertest(app)

it('gets test endpoint', async (done) => {
  const response = await request.get('/testendpoint');
  expect(response.text).toBe('OK');
  done();
})
