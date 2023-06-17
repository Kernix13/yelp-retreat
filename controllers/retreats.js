const Retreat = require('../models/retreat');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
const { cloudinary } = require('../cloudinary');

const typesArr = ['YOGA', 'MEDITATION', 'SPIRITUAL', 'SPA', 'NATURE', 'ADVENTURE', 'FITNESS', 'DETOX'];

// 1a. Index route 
module.exports.index = async (req, res) => {
  const retreats = await Retreat.find({});
  res.render('retreats/index', { retreats, typesArr })
}

// 1b. Category route
module.exports.category = async (req, res) => {
  const pageType = req.params.type;
  // const pageType = req.params.type.toUpperCase();
  const retreats = await Retreat.find({type: pageType});
  console.log(retreats.length)
  res.render('retreats/category', { retreats, typesArr, pageType })
}

// 2. New/Create form
module.exports.renderNewForm = (req, res) => {
  res.render('retreats/new');
}

// 2b. Add new retreat to database
module.exports.createRetreat = async (req, res) => {
  const geoData = await geocoder.forwardGeocode({
    query: req.body.retreat.location,
    countries: ['US'],
    limit: 1
  }).send()
  console.log(geoData)
  const retreat = new Retreat(req.body.retreat);
  retreat.geometry = geoData.body.features[0].geometry;
  retreat.images = req.files.map(img => ( {url: img.path, filename: img.filename }))
  retreat.author = req.user._id;
  await retreat.save();
  req.flash('success', 'Successfully made a new retreat.');
  res.redirect(`/retreats/${retreat._id}`);
}

// 3. Details/Show route
module.exports.showRetreat = async (req, res) => {
  const retreat = await Retreat.findById(req.params.id)
  .populate({
    path: 'reviews',
    populate: {
      path: 'author',
    },
  })
  .populate('author');
  // console.log(retreat);
  if (!retreat) {
    req.flash('error', 'Cannot find that retreat');
    return res.redirect('/retreats')
  }
  res.render('retreats/show', { retreat });
}

// 4. Edit/Update route
module.exports.renderEditForm = async (req, res) => {
  const retreat = await Retreat.findById(req.params.id)
  res.render('retreats/edit', { retreat });
}

// 4b. Put route
module.exports.updateRetreat = async (req, res) => {
  const { id } = req.params;
  // console.log(req.body)
  const retreat = await Retreat.findByIdAndUpdate(id, { ...req.body.retreat });
  const imgs = req.files.map(img => ( {url: img.path, filename: img.filename }));
  retreat.images.push(...imgs);
  await retreat.save();
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await retreat.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
  }
  req.flash('success', 'Updated retreat.');
  res.redirect(`/retreats/${retreat._id}`);
}

// 5 Delete route
module.exports.deleteRetreat = async (req, res) => {
  const { id } = req.params;
  await Retreat.findByIdAndDelete(id);
  req.flash('success', 'Deleted retreat.');
  res.redirect('/retreats');
}