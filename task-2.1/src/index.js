import express from 'express';
import usersRouter from './routes/users';

const apiPort = 3000;
const app = express();

app.use(express.json());
app.use('/api', usersRouter);
app.use('*', (req, res, next) => {
  res.status(404).send('Sorry, the path is not found.');
  next();
});

app.listen(apiPort, () => {
  console.log(`Express.js server is listening on http://localhost:${apiPort}`);
});
