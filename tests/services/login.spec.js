import supertest from 'supertest';
import app from '../../src/server';
import { signUpService, loginService } from '../../src/services/auth.service';

const URL = '/api/v1/auth';

beforeEach(async () => {
  // Clears the database and adds some testing data.
  // Jest will wait for this promise to resolve before running tests.
  const userA = {
    email: 'usera@gmail.com',
    firstName: 'usera',
    lastName: 'useralastname',
    password: 'Trackit1'
  };
  await signUpService(userA);
});

describe('Authentication Signup API', () => {
  it('should test api', async () => {
    const response = await supertest(app)
      .post(`${URL}/login`)
      .send({
        email: 'usera@gmail.com',
        password: 'Trackit1'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data.firstName).toBe('usera');
    expect(response.body.data.lastName).toBe('useralastname');
    expect(response.body.data.email).toBe('usera@gmail.com');
  });

  it('should return email exist for existing email', async () => {
    const response = await supertest(app)
      .post(`${URL}/login`)
      .send({
        email: 'test@gmail.com',
        password: 'wrongpassword'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('incorrect email/password');
  });

  it('should return validation error', async () => {
    const response = await supertest(app)
      .post(`${URL}/login`)
      .send({
        email: 'test@gmail.com',
        password: 'Track'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message.password).toBe(
      'Password can not be less than 8 characters'
    );
  });

  it('should return validation error', async () => {
    const userA = {
      email1: 'select *',
      password: 'Trackit1'
    };
    try {
      const response = await loginService(userA);
    } catch (error) {
      expect(error.name).toBe('Error');
      expect(error.error).toBe('Database error');
    }
  });
});
