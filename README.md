# Full-Stack YelpRetreat App

## Overview

A fullstack app variation of Colt Steele's YelpCamp project from his Udemy course _The WEb DEveloper Bootcamp 2023_. YelpRetreat has various "wellness" retreats separated by category:

1. Spa
2. Meditation
3. Spiritual
4. Yoga
5. Adventure
6. Nature
7. Fitness
8. Detox
9. Others to be added: Camping, Wellness, Weight Loss, ...

> _That's it for now..._

Main tools and technologies used for this app:

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

Then create `.env` and copy/paste the contents from `.env.sample` and add your variable values.

## Current Status

Notes on the status and problems that need fixing.

### Seeding Mongo DB

In both of the files listed below, you need to change dbUrl depending on whether you are trying to seed Mongo on localhost for development or on Atlas for production. You should only seed Atlas once unless your "production" is just a portfolio project like mine. Here is the code in each file:

```js
/* Below is for production */
const dbUrl = process.env.DB_URL;

/* Below is for development */
// const dbUrl = 'mongodb://127.0.0.1:27017/yelp-retreat';

mongoose.connect(dbUrl);
```

1. `app.js`: `dbUrl` is currently on lines 30 and 33
2. `seeds/index.js`: `dbUrl` is currently on lines 9 and 12

Also, if you are continuing to make changes locally and pushing the changes to GitHub, make sure to switch the databases back to Atlas if you have Auto-Deploy on Render set to Yes.

### HOSTING

1. Render or Cyclic: Cyclic has 1 button deploy

### Index page

1. Need to add more retreats and in more categories, then map thru each category and cap the output to maybe the top 5 with a link to a category page for the complete list.
2. Need more margin/padding around All Retreats and and the Add New button.
3. Neeed to put a limit to the length of the description. Right now I hardly have any text, but I should set it to a max char limit.
4. Bootstrap issue: How to make sure the card body and image height are equal? I may cut the description and vertical cards

### Show page

1. The popup flag has a dark X for close, but it should be white.
2. Retreat authors should not be able to add a review for their retreat unless they added the retreat but are _not_ the owner of the location.
3. Why does the popup close button look different than on the index page?
4. overall review - add all stars and / by .length

### Login page

1. Does not redirect to the last paage you were on - it goes to `/retreats` everytime. Look into `res.locals`.

## Contributions

> Coming soon...

## Code of Conduct

> Coming soon...

## License

> Coming soon...
