import dotenv from 'dotenv';
import app from './server';

dotenv.config();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port: ${PORT}`);
});

export default app;
