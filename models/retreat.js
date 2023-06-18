const mongoose = require('mongoose');
const Review = require('./review');
const { Schema } = mongoose;

const ImageSchema = new Schema({
  url: String,
  filename: String
})

ImageSchema.virtual('thumbnail').get(function() {
  return this.url.replace('/upload', '/upload/w_300');
})

const opts = { toJSON: { virtuals: true } };
const RetreatSchema = new Schema({
  title: String,
  images: [ImageSchema],
  geometry: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  price: Number,
  description: String,
  location: String,
  type: String,
  date: String,
  events: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
}, opts)

RetreatSchema.virtual('properties.popUpMarkup').get(function() {
  return `<h6><a href="/retreats/${this._id}">${this.title}</a></h6><p>Type: ${this.type}</p><p><em>${this.location}</em></p>`;
})

RetreatSchema.post('findOneAndDelete', async function(doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews
      }
    })
  }
})

module.exports = mongoose.model('Retreat', RetreatSchema);