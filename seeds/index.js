require('dotenv').config();
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors, retreatTypes } = require('./seedHelpers');
const Retreat = require('../models/retreat');
const Review = require('../models/review');

/* Below is for production */
const dbUrl = process.env.DB_URL;

/* Below is for development */
// const dbUrl = 'mongodb://127.0.0.1:27017/yelp-retreat';

mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];
const typesArr = ['YOGA', 'MEDITATION', 'SPIRITUAL', 'SPA', 'NATURE', 'ADVENTURE', 'FITNESS', 'DETOX'];

const seedDB = async () => {
  await Retreat.deleteMany({});
  await Review.deleteMany({});

  for (let i = 0; i < 200; i++) {
    const rand1000 = Math.floor(Math.random() * 1000);
    const rand8 = Math.floor(Math.random() * 8);
    const price = Math.floor(Math.random() * 400) + 10;
    const retreat = new Retreat({
      // localhost jimbo _id, uncomment when seeding locallly:
      // author: '647e595464c70dd9a61869cb',
      
      // MongoDB Atlas JimK _id:
      author: '6489dd2bec11d7249ba3dd46',
      location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
      type: `${retreatTypes[rand8].type}`,
      date: '2023/10/15',
      events: `${retreatTypes[rand8].events}`,
      price,
      geometry: { 
        type: 'Point', 
        coordinates: [ cities[rand1000].longitude, cities[rand1000].latitude ] 
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dc9ar9jbr/image/upload/v1686504383/YelpRetreat/wnbvbiv2zqqwkykp3hrw.jpg',
          filename: 'YelpRetreat/wnbvbiv2zqqwkykp3hrw',
        },
        {
          url: 'https://res.cloudinary.com/dc9ar9jbr/image/upload/v1686504382/YelpRetreat/kzvazgzu4yltunyjmqua.jpg',
          filename: 'YelpRetreat/kzvazgzu4yltunyjmqua',
        },
      ],
    })
    await retreat.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})