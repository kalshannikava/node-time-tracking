import request from 'supertest';
import type { Express } from 'express';
import { join } from 'path';
import app from '../app';
import { User } from '../types/user';
import DataBase from '../db';

let initialDb: User[] = null;

const filename: string = join(__dirname, '..', 'db', 'db.json');
const db: DataBase = new DataBase(filename);
const application: Express = app(db);

beforeAll(async () => initialDb = [...await db.getAll<User>('users')]);
afterAll(async () => await db.writeAll<User>('users', initialDb));

describe('GET /users', () => {
  it('should respond with 200 success', async () => {
    await request(application).get('/users')
    .expect('Content-Type', /json/)
    .expect(200);
  });
});

describe('GET /users/id', () => {
  it('should respond with 200 success', async () => {
    await request(application).get('/users/0')
    .expect('Content-Type', /json/)
    .expect(200);
  });

  it('should respond with 404 not found when user doesn\'t exist', async () => {
    await request(application).get('/users/-1')
    .expect(404);
  });
});

describe('POST /users', () => {
  it('should respond with 201 created', async () => {
    await request(application).post('/users')
    .send({ name: 'Test', email: 'test@test.com', timezone: 'GMT+1' })
    .expect('Content-Type', /json/)
    .expect(201);
  });

  it('should respond with 400 bad request when required property is missing', async () => {
    await request(application).post('/users')
    .send({ name: 'Test', email: 'test@test.com' })
    .expect(400);

    await request(application).post('/users')
    .send({ name: 'Test', timezone: 'GMT+1' })
    .expect(400);

    await request(application).post('/users')
    .send({ email: 'test@test.com', timezone: 'GMT+1' })
    .expect(400);
  });

  it('should respond with 400 bad request when email is invalid', async () => {
    await request(application).post('/users')
    .send({ name: 'Test', email: 'invalid email', timezone: 'GMT+1' })
    .expect(400);
  });
});

describe('PUT /user', () => {
  it('should respond with 200 success', async () => {
    await request(application).put('/users/0')
    .send({ name: 'Test 2', email: 'test2@test.com', timezone: 'GMT+2' })
    .expect('Content-Type', /json/)
    .expect(200);
  });

  it('should have been updated', async () => {
    const response = await request(application).get('/users/0')
    .expect('Content-Type', /json/)
    .expect(200);
    expect(response.body.name).toEqual('Test 2');
    expect(response.body.email).toEqual('test2@test.com');
    expect(response.body.timezone).toEqual('GMT+2');
  });
});

describe('DELETE /user', () => {
  it('should respond with 200 success', async () => {
    await request(application).delete('/users/0')
    .expect('Content-Type', /json/)
    .expect(200);
  });

  it('should be deleted', async () => {
    await request(application).get('/users/0')
    .expect(404);
  });

  it('should respond with 404 not found when user doesn\'t exist', async () => {
    await request(application).delete('/users/-1')
    .expect(404);
  });
});
