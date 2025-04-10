import path from 'path';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config({ path: path.resolve(__dirname, '../.env') });
import app from './app';
import sequelize from './config/sequelize';
import db from './models';

const PORT = process.env.PORT || 5000;

sequelize
  .authenticate()

  .then(async () => {
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error(' Unable to connect to DB:', err);
  });
