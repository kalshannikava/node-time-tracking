import request from 'supertest';
import app from '../app';
import { User } from '../types/user';
import DataBase from '../db';

let initialDb: User[] = null;

beforeAll(async () => {
  DataBase.getInstance();
  initialDb = [...await DataBase.getUsers()]
});
afterAll(async () => await DataBase.writeUsers(initialDb));

describe('GET /users', () => {
  it('should respond with 200 success', async () => {
    await request(app).get('/users')
    .expect('Content-Type', /json/)
    .expect(200);
  });
});

describe('GET /users/id', () => {
  it('should respond with 200 success', async () => {
    await request(app).get('/users/0')
    .expect('Content-Type', /json/)
    .expect(200);
  });

  it('should respond with 404 not found when user doesn\'t exist', async () => {
    await request(app).get('/users/-1')
    .expect(404);
  });
});

describe('POST /users', () => {
  it('should respond with 201 created', async () => {
    await request(app).post('/users')
    .send({ name: 'Test', email: 'test@test.com', timezone: 'GMT+1' })
    .expect('Content-Type', /json/)
    .expect(201);
  });

  it('should respond with 400 bad request when required property is missing', async () => {
    await request(app).post('/users')
    .send({ name: 'Test', email: 'test@test.com' })
    .expect(400);

    await request(app).post('/users')
    .send({ name: 'Test', timezone: 'GMT+1' })
    .expect(400);

    await request(app).post('/users')
    .send({ email: 'test@test.com', timezone: 'GMT+1' })
    .expect(400);
  });

  it('should respond with 400 bad request when email is invalid', async () => {
    await request(app).post('/users')
    .send({ name: 'Test', email: 'invalid email', timezone: 'GMT+1' })
    .expect(400);
  });
});

describe('PUT /user', () => {
  it('should respond with 200 success', async () => {
    await request(app).put('/users/0')
    .send({ name: 'Test 2', email: 'test2@test.com', timezone: 'GMT+2' })
    .expect('Content-Type', /json/)
    .expect(200);
  });

  it('should have been updated', async () => {
    const response = await request(app).get('/users/0')
    .expect('Content-Type', /json/)
    .expect(200);
    expect(response.body.name).toEqual('Test 2');
    expect(response.body.email).toEqual('test2@test.com');
    expect(response.body.timezone).toEqual('GMT+2');
  });
});

describe('DELETE /user', () => {
  it('should respond with 200 success', async () => {
    await request(app).delete('/users/0')
    .expect('Content-Type', /json/)
    .expect(200);
  });

  it('should be deleted', async () => {
    await request(app).get('/users/0')
    .expect(404);
  });

  it('should respond with 404 not found when user doesn\'t exist', async () => {
    await request(app).delete('/users/-1')
    .expect(404);
  });
});
