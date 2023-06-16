const express = require('express');
const router = express.Router();
const multer  = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const retreats = require('../controllers/retreats');
const { isLoggedIn, validateRetreat, isAuthor } = require('../middleware.js');
const catchAsync = require('../utils/catchAsync');

router.route('/')
  .get(catchAsync(retreats.index))
  .post(
    isLoggedIn, 
    upload.array('image'),
    validateRetreat,
    catchAsync(retreats.createRetreat));

router.route('/category/:type')
  .get(catchAsync(retreats.category))

router.get('/new', 
  isLoggedIn, 
  retreats.renderNewForm);

router.route('/:id')
  .get(catchAsync(retreats.showRetreat))
  .put(
    isLoggedIn,
    isAuthor, 
    upload.array('image'),
    validateRetreat, 
    catchAsync(retreats.updateRetreat))
  .delete(
    isLoggedIn,
    isAuthor, 
    catchAsync(retreats.deleteRetreat));

router.get('/:id/edit', 
  isLoggedIn,
  isAuthor, 
  catchAsync(retreats.renderEditForm));

module.exports = router;