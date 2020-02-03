import auth from './auth.route';
import category from './category.route';

export default app => {
  app.use(`${process.env.API_VERSION}/auth`, auth);
  app.use(`${process.env.API_VERSION}/category`, category);
};
