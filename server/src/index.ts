import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../.env') });
import app from './app';
import sequelize from './config/sequelize';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listen on port: ${PORT}`);
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error(' Unable to connect to DB:', err);
  });
