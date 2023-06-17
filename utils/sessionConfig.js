const mongoose = require('mongoose'); // added because of Render deploy errors
const MongoStore = require('connect-mongo');

/* Below is for production */
const dbUrl = process.env.DB_URL;

/* Below is for development */
// const dbUrl = 'mongodb://127.0.0.1:27017/yelp-retreat';

mongoose.connect(dbUrl); // added because of Render deploy errors

const secret = process.env.SECRET || 'yoursecrethere';

const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60,
  crypto: {
    secret,
  },
});

const sessionConfig = {
  store,
  name: 'session',
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}

module.exports = sessionConfig;