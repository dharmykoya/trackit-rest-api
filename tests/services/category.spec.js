import supertest from 'supertest';
import app from '../../src/server';

const URL = '/api/v1/category';

describe('Authentication API', () => {
  it('should test api', async () => {
    const response = await supertest(app)
      .post(`${URL}/`)
      .send({
        name: 'testcategory'
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data.name).toBe('testcategory');
  });

  it('should return error if category exist', async () => {
    const response = await supertest(app)
      .post(`${URL}/`)
      .send({
        name: 'testcategory'
      });

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('something went wrong');
    expect(response.body.developer.name).toBe('SequelizeUniqueConstraintError');
  });

  it('should return validation error', async () => {
    const response = await supertest(app)
      .post(`${URL}/`)
      .send({
        name: ''
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message');

    expect(response.body.message.name).toBe(
      'Category name must be only alphabetical chars'
    );
  });
});
