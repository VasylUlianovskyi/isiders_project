import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../.env') });
import app from './app';
import sequelize from './config/sequelize';
import User from './models/User';

const PORT = process.env.PORT || 5000;

sequelize
  .authenticate()

  .then(async () => {
    console.log('Database connected');
    console.log('Syncing with models:');
    console.log(' User model:', User === undefined ? 'NOT DEFINED' : 'OK');

    await sequelize.sync({ force: true });
    app.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error(' Unable to connect to DB:', err);
  });
