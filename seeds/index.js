const mongoose = require('mongoose');
const seedRetreats = require('./seedRetreats');
const Retreat = require('../models/retreat');
const Review = require('../models/review');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-retreat');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
  // Delete retreats and reviews before reseeding the DB
  await Retreat.deleteMany({});
  await Review.deleteMany({});

  for (let i = 0; i < seedRetreats.length; i++) {
    const retreat = new Retreat({
      author: '647e595464c70dd9a61869cb',
      title: seedRetreats[i].title,
      price: seedRetreats[i].price,
      description: seedRetreats[i].description,
      location: seedRetreats[i].location,
      type: seedRetreats[i].type,
      date: seedRetreats[i].date,
      events: seedRetreats[i].events,
      geometry: { 
        type: 'Point', 
        coordinates: [ seedRetreats[i].longitude, seedRetreats[i].latitude ] 
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dc9ar9jbr/image/upload/v1686504383/YelpRetreat/wnbvbiv2zqqwkykp3hrw.jpg',
          filename: 'YelpRetreat/wnbvbiv2zqqwkykp3hrw'
        },
        {
          url: 'https://res.cloudinary.com/dc9ar9jbr/image/upload/v1686504382/YelpRetreat/kzvazgzu4yltunyjmqua.jpg',
          filename: 'YelpRetreat/kzvazgzu4yltunyjmqua'
        },
      ]
    })
    await retreat.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})