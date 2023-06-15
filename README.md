# Full-Stack YelpRetreat App

## Overview

A fullstack app variation of Colt Steele's YelpCamp project from his Udemy course _The WEb DEveloper Bootcamp 2023_. YelpRetreat has various "wellness" retreats separated by category:

1. Spa
2. Meditation
3. Spiritual
4. Yoga
5. Adventure
6. Others to be added: Digital Detax, Nature, Wellness, Weight Loss, Fitness, Addiciton, ...

> _That's it for now..._

Main packages used for this app:

1. Express
2. MongoDB and Mongoose
3. EJS
4. Cloudinary
5. MapBox
6. Passport
7. Helmet

## Setup

```sh
npm install
npm start
# or
nodemon app.js
```

## Current Status

Notes on the status and problems that need fixing.

### HOSTING

1. Render or Cyclic: Cyclic has 1 button deploy

### Index page

1. Need to add more retreats and in more categories, then map thru each category and cap the output to the top 5 with a link to a category page for a complete list
2. Need way more margin/paddingaround All Retreats and and the Add New button
3. Neeed to put a limit to the description. Right now I hardly have any text, but I seshould set it to a max char limit.
4. Bootstrap issue: How to make sure the card body and image height are equal?

### Show page

1. show page flag has a dark X for close
2. retreat authors should not be able to add a review for their retreat unless they added the retreat but are not the owner of the location
3. Why does the popup close button look different than the index page

## Contributions

> Coming soon...

## Code of Conduct

> Coming soon...

## License

> Coming soon...
