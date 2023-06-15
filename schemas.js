const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
  type: 'string',
  base: joi.string(), // 
  messages: {
    'string.escapeHTML': '{{#label}} must not include HTML!',
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value)
          return helpers.error('string.escapeHTML', { value });
        return clean;
      },
    },
  },
});

const Joi = BaseJoi.extend(extension);

const retreatSchema = Joi.object({
    retreat: Joi.object({
      title: Joi.string().required().escapeHTML(),
      price: Joi.number().required().min(0),
      location: Joi.string().required().escapeHTML(),
      image: Joi.string().escapeHTML(),
      description: Joi.string().required().escapeHTML(),
      type: Joi.string().required().escapeHTML(),
      date: Joi.string().required().escapeHTML(),
      events: Joi.string().required().escapeHTML()
    }).required(),
    deleteImages: Joi.array()
  })

const reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    body: Joi.string().required().escapeHTML()
  }).required()
})

  module.exports = {
    retreatSchema,
    reviewSchema
  }