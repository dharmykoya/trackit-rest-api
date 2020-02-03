import auth from './auth.route';

export default app => {
  app.use(`${process.env.API_VERSION}/auth`, auth);
};
