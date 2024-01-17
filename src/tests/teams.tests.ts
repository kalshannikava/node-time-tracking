import request from 'supertest';
import app from '../app';
import DataBase from '../db';

import type { Team } from '../types/team';

let initialDb: Team[] = null;

beforeAll(async () => {
  DataBase.getInstance();
  initialDb = [...await DataBase.getTeams()]
});
afterAll(async () => await DataBase.writeTeams(initialDb));

describe('GET /teams', () => {
  it('should respond with 200 success', async () => {
    await request(app).get('/teams')
    .expect('Content-Type', /json/)
    .expect(200);
  });
});

describe('GET /teams/id', () => {
  it('should respond with 200 success', async () => {
    await request(app).get('/teams/0')
    .expect('Content-Type', /json/)
    .expect(200);
  });

  it('should respond with 404 not found when user doesn\'t exist', async () => {
    await request(app).get('/teams/-1')
    .expect(404);
  });
});


describe('POST /teams', () => {
  it('should respond with 201 created', async () => {
    await request(app).post('/teams')
    .send({ name: 'Test', logo: 'logo.png' })
    .expect('Content-Type', /json/)
    .expect(201);
  });

  it('should respond with 400 bad request when required property is missing', async () => {
    await request(app).post('/teams')
    .send({ name: 'Test' })
    .expect(400);

    await request(app).post('/teams')
    .send({ logo: 'logo.png' })
    .expect(400);
  });
});

describe('PUT /teams', () => {
  it('should respond with 200 success', async () => {
    await request(app).put('/teams/0')
    .send({ name: 'Test 1', logo: 'logo1.png' })
    .expect('Content-Type', /json/)
    .expect(200);
  });

  it('should have been updated', async () => {
    const response = await request(app).get('/teams/0')
    .expect('Content-Type', /json/)
    .expect(200);
    expect(response.body.name).toEqual('Test 1');
    expect(response.body.logo).toEqual('logo1.png');
  });
});

describe('DELETE /user', () => {
  it('should respond with 200 success', async () => {
    await request(app).delete('/teams/0')
    .expect('Content-Type', /json/)
    .expect(200);
  });

  it('should be deleted', async () => {
    await request(app).get('/teams/0')
    .expect(404);
  });

  it('should respond with 404 not found when user doesn\'t exist', async () => {
    await request(app).delete('/teams/-1')
    .expect(404);
  });
});
