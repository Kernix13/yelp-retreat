if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');

const methodOverride = require('method-override');
const flash = require('connect-flash');

const User = require('./models/user');
const passport = require('passport');
const localStrategy = require('passport-local');

const session = require('express-session');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const sessionConfig = require('./utils/sessionConfig');
const csp = require('./utils/contentSecurityPolicy');

const ExpressError = require('./utils/ExpressError')

const retreatsRoutes = require('./routes/retreats');
const reviewsRoutes = require('./routes/reviews.js');
const userRoutes = require('./routes/users');

/* Below is for production */
const dbUrl = process.env.DB_URL;

/* Below is for development */
// const dbUrl = 'mongodb://127.0.0.1:27017/yelp-retreat';

mongoose.connect(dbUrl);
// mongoose.connect('mongodb://127.0.0.1:27017/yelp-retreat');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

/* Set EJS as the view engine */
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Form middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// public folder assets
app.use(express.static(path.join(__dirname, 'public')));

// Flash messages to the user
app.use(flash());

// Sanitize user-supplied data
app.use(mongoSanitize());

// Session and store
app.use(session(sessionConfig));
app.use(helmet());
app.use(helmet.contentSecurityPolicy(csp));

// Auth
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// res local variables scoped to the req
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
})

app.use('/retreats', retreatsRoutes);
app.use('/retreats/:id/reviews', reviewsRoutes);
app.use('/', userRoutes);

// Home route
app.get('/', (req, res) => {
  res.render('home')
})

// 404 error
app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404));
})

// Server error
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Error: Something went wrong.'
  res.status(statusCode).render('error', { err });
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`LISTENING ON PORT ${port}`);
});

/*
  Completed:
  ✅ - Limited index page to 6 results per category
  ✅ - Added Back To Top button for index page
  ✅ - Created category route with count of retreats added to page
  ✅ - Added Type to clusterMap popup
  ✅ - Added Lat & Long to showPageMap popup
  ✅ - Removed zoom on scroll for index & category clusterMap

  To-Do's:
  1. Prevent retreat owners from reviewing their retreat
  2. create a total average review rating
  3. redirect to last page on login form submit
  4. better styling for MapBox popup styling
  5. I do not like the category anchor links on index (redesign)
*/