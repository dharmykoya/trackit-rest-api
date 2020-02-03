import supertest from 'supertest';
import app from '../../src/server';

const URL = '/api/v1/auth';

describe('Authentication API', () => {
  it('should test api', async () => {
    const response = await supertest(app)
      .post(`${URL}/signup`)
      .send({
        email: 'test@gmail.com',
        firstName: 'testFirstName',
        lastName: 'testSurname',
        password: 'Trackit1'
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data.firstName).toBe('testFirstName');
    expect(response.body.data.lastName).toBe('testSurname');
    expect(response.body.data.email).toBe('test@gmail.com');
  });

  it('should return email exist for existing email', async () => {
    const response = await supertest(app)
      .post(`${URL}/signup`)
      .send({
        email: 'test@gmail.com',
        firstName: 'testFirstName',
        lastName: 'testSurname',
        password: 'Trackit1'
      });

    expect(response.statusCode).toBe(409);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('email exist, please login');
  });

  it('should return validation error', async () => {
    const response = await supertest(app)
      .post(`${URL}/signup`)
      .send({
        email: 'testgmail.com',
        firstName: 'testFirstName',
        lastName: 'testSurname',
        password: 'Trackit'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message.password).toBe(
      'Password can not be less than 8 characters'
    );
    expect(response.body.message.email).toBe('Please enter a valid email');
  });
});
