# Full-Stack YelpRetreat App

Check out the [Live Version](https://yelp-retreat.onrender.com/) on Render.com

## Overview

A fullstack app variation of Colt Steele's YelpCamp project from his Udemy course _The Web Developer Bootcamp 2023_. YelpRetreat has various "wellness" retreats separated by category:

1. Spa
2. Meditation
3. Spiritual
4. Yoga
5. Adventure
6. Nature
7. Fitness
8. Detox
9. Others to be added: Camping, Wellness, Weight Loss, Recovery, ...

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

Then create `.env` and copy/paste the contents from `.env.sample` and add your environment variable values.

To work locally you need to download and install MongoDB and the MongoDB Shell. Here are the commands I run on Windows:

```sh
# Open a Git Bash terminal and start up the DB
mongod
# Open a PowerShell terminal and start the Mongo Shell
mongosh
# Here are useful commands for the Mongo Shell
# Show a list of all your databases
show dbs
# Use a specific database
use dbName
# Show all the collections for the database you are using
show collections
# Find all the records in a specific collection
db.collectionName.find()
```

## Current Status

Notes on the status and problems that need fixing.

### Seeding Mongo DB

1. `app.js`: `dbUrl` is currently on lines 30 and 33
2. `seeds/index.js`: `dbUrl` is currently on lines 9 and 12

In both of the files listed above, you need to change `dbUrl` depending on whether you are trying to seed Mongo on localhost for development or on Atlas for production. You should only seed Atlas once unless your "production" is just a portfolio project like mine. Here is the code in each file:

```js
/* Below is for production */
const dbUrl = process.env.DB_URL;

/* Below is for development */
// const dbUrl = 'mongodb://127.0.0.1:27017/yelp-retreat';

mongoose.connect(dbUrl);
```

Also, if you are continuing to make changes locally and pushing the changes to GitHub, make sure to switch the databases back to Atlas if you have Auto-Deploy on Render set to Yes.

### Index page

1. I was able to cap the output to 6 retreats per category.
1. I also added a Back-To-Top button which is helpful now and for when I add more categories.

### Show page

1. Retreat authors should not be able to add a review for their retreat unless they added the retreat but are _not_ the owner of the location.
1. Average review - add all stars and / by `.length` to get a value like _4.5/5_

### Login page

1. Does not redirect to the last paage you were on - it goes to `/retreats` everytime. Look into `res.locals`.

## Contributions

> Coming soon...

## Code of Conduct

> Coming soon...

## License

> Coming soon...
