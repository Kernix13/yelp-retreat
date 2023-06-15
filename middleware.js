const { retreatSchema, reviewSchema } = require('./schemas');
const ExpressError = require('./utils/ExpressError');
const Retreat = require('./models/retreat');
const Review = require('./models/review');

/* Sitewide middleware */
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl; // add this line
    req.flash('error', 'You must be logged in!');
    return res.redirect('/login');
  }
  next()
}

/* Users/Auth middleware */
module.exports.storeReturnTo = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
  }
  next();
};

/* Retreat middleware */
module.exports.validateRetreat = (req, res, next) => {
  const { error } = retreatSchema.validate(req.body);
  if(error) {
    const msg = error.details.map(err => err.message).join(' ,')
    throw new ExpressError(msg, 400)
  } else {
    next();
  }
}

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const retreat = await Retreat.findById(id)
  if (!retreat.author.equals(req.user._id)) {
    req.flash('error', 'You do not have permission to do that.');
    return res.redirect(`/retreats/${id}`);
    // return res.redirect(`/retreats/${retreat._id}`);
  }
  next();
}

/* Reviews middleware */
module.exports.validateReview = (req, res, next) => {
  const {error} = reviewSchema.validate(req.body);
  if(error) {
    console.log(error)
    const msg = error.details.map(err => err.message).join(' ,')
    throw new ExpressError(msg, 400)
  } else {
    next();
  }
}

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId)
  if (!review.author.equals(req.user._id)) {
    req.flash('error', 'You do not have permission to do that.');
    return res.redirect(`/retreats/${id}`);
  }
  next();
}