const Retreat = require('../models/retreat');
const Review = require('../models/review');

// Create a review for a campground
module.exports.createReview = async (req, res, next) => {
  const retreat = await Retreat.findById(req.params.id);
  const review = new Review(req.body.review);
  review.author = req.user._id;
  retreat.reviews.push(review);
  await review.save();
  await retreat.save();
  req.flash('success', 'Review added.');
  res.redirect(`/retreats/${retreat._id}`);
} 

// Delete a review on a campground
module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Retreat.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash('success', 'Review deleted.');
  res.redirect(`/retreats/${id}`);
}