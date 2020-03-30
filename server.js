const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! Shouting down the Server...');
  console.log(err);
  process.exit(1); // 1 mean uncaught exception, 0 success
});

// Load env variables
dotenv.config({ path: `./config/config.env` });
const app = require('./app');

// const cloudDb = process.env.MONGO_URL.replace('<PASSWORD>', process.env.DB_PWD);
const localDb = 'mongodb://localhost:27017/natours';

/**
 * @Connection to the database
 */
mongoose
  .connect(localDb, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('DB connection successfull!');
  });

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! Shouting down the Server...');
  server.close(() => {
    process.exit(1); // 1 mean uncaught exception, 0 success
  });
});

/*
 // PASSWORD is // test1234
const exampleUser = [
  {
    _id: '5c8a1d5b0190b214360dc057',
    name: 'Raymond Michael Nziku',
    email: 'admin@sote.com',
    role: 'admin',
    active: true,
    photo: 'user-1.jpg',
    password: '$2a$12$Q0grHjH9PXc6SxivC8m12.2mZJ9BbKcgFpwSG4Y1ZEII8HJVzWeyS'
  },
  {
    _id: '5c8a1dfa2f8fb814b56fa181',
    name: 'Lourdes Browning',
    email: 'loulou@example.com',
    role: 'user',
    active: true,
    photo: 'user-2.jpg',
    password: '$2a$12$hP1h2pnNp7wgyZNRwPsOTeZuNzWBv7vHmsR3DT/OaPSUBQT.y0S..'
  }
];

*/
