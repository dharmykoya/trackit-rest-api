import supertest from 'supertest';
import app from '../../src/server';

describe('Application entry point', () => {
  it('should return welcome to v1 of track it', async () => {
    const response = await supertest(app).get(`/api/v1`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Welcome to TrackIt api version 1');
  });

  it('should return welcome to trackit api', async () => {
    const response = await supertest(app).get(`/`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Welcome to TrackIt app API');
  });

  it('should return error for wrong route', async () => {
    const response = await supertest(app).get(`/hello`);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe(
      'You are trying to access a wrong Route'
    );
  });
});
