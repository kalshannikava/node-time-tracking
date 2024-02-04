import request from 'supertest';
import type { Express } from 'express';
import app from '../app';
import MockDataBase from './mocks/mockDataBase';

const db: MockDataBase = new MockDataBase();
const application: Express = app(db);

describe('GET /workPeriods', () => {
  it('should respond with 200 success', async () => {
    await request(application).get('/workPeriods')
    .expect('Content-Type', /json/)
    .expect(200);
  });
});

describe('GET /workPeriods/id', () => {
  it('should respond with 200 success', async () => {
    await request(application).get('/workPeriods/0')
    .expect('Content-Type', /json/)
    .expect(200);
  });

  it('should respond with 404 not found when work period doesn\'t exist', async () => {
    await request(application).get('/workPeriods/-1')
    .expect(404);
  });
});


describe('POST /workPeriods', () => {
  it('should respond with 201 created', async () => {
    await request(application).post('/workPeriods')
    .send({
      from: 'April 1, 2023',
      to: 'July 17, 2023',
      weekDays: '19',
      userId: 0,
      teamId: 0,
     })
    .expect('Content-Type', /json/)
    .expect(201);
  });

  it('should respond with 400 bad request when required property is missing', async () => {
    await request(application).post('/workPeriods')
    .send({
      to: 'July 17, 2023',
      weekDays: '19',
      userId: 0,
      teamId: 0,
     })
    .expect(400);

    await request(application).post('/workPeriods')
    .send({
      from: 'April 1, 2023',
      weekDays: '19',
      userId: 0,
      teamId: 0,
     })
    .expect(400);

    await request(application).post('/workPeriods')
    .send({
      from: 'April 1, 2023',
      to: 'July 17, 2023',
      userId: 0,
      teamId: 0,
     })
    .expect(400);

    await request(application).post('/workPeriods')
    .send({
      from: 'April 1, 2023',
      to: 'July 17, 2023',
      weekDays: '19',
      teamId: 0,
     })
    .expect(400);

    await request(application).post('/workPeriods')
    .send({
      from: 'April 1, 2023',
      to: 'July 17, 2023',
      weekDays: '19',
      userId: 0,
     })
    .expect(400);
  });

  it('should respond with 404 not found when team or user do not exist', async () => {
    await request(application).post('/workPeriods')
    .send({
      to: 'July 17, 2023',
      weekDays: '19',
      userId: -1,
      teamId: 0,
     })
    .expect(404);

    await request(application).post('/workPeriods')
    .send({
      to: 'July 17, 2023',
      weekDays: '19',
      userId: 0,
      teamId: -1,
     })
    .expect(404);
  });
});

describe('PUT /workPeriods', () => {
  it('should respond with 200 success', async () => {
    await request(application).put('/workPeriods/0')
    .send({
      from: 'April 2, 2023',
      to: 'July 18, 2023',
      weekDays: '20',
      userId: 1,
      teamId: 1,
    })
    .expect('Content-Type', /json/)
    .expect(200);
  });

  it('should have been updated', async () => {
    const response = await request(application).get('/workPeriods/0')
    .expect('Content-Type', /json/)
    .expect(200);
    expect(response.body.from).toEqual('April 2, 2023');
    expect(response.body.to).toEqual('July 18, 2023');
    expect(response.body.weekDays).toEqual('20');
    expect(response.body.userId).toEqual(1);
    expect(response.body.teamId).toEqual(1);
  });
});

describe('DELETE /workPeriods', () => {
  it('should respond with 200 success', async () => {
    await request(application).delete('/teams/0')
    .expect('Content-Type', /json/)
    .expect(200);
  });

  it('should be deleted', async () => {
    await request(application).get('/teams/0')
    .expect(404);
  });

  it('should respond with 404 not found when work period doesn\'t exist', async () => {
    await request(application).delete('/workPeriods/-1')
    .expect(404);
  });
});
