const colors = require('colors');
const cities = require('./cities');
const mongoose = require('mongoose');
const Campground = require('../models/campground');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  // How it parses connection strings
  useNewUrlParser: true,

  useCreateIndex: true,
  // Server discovery and monitoring
  useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'.red))
db.once('open', () => {
  console.log('Database connected'.green);
})

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDb = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 10; i++) {
    const random10 = Math.floor(Math.random() * 15);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '603131ad587c0004a04ce81b',
      location: `${cities[random10].city}, ${cities[random10].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, ex. Corporis voluptates voluptatibus doloremque perferendis porro in? Suscipit reiciendis provident facilis architecto cupiditate commodi? Voluptatibus numquam qui nesciunt dolor voluptatum? Cumque quis alias saepe est quaerat nisi. Quae odio fugiat fuga est doloribus quas, voluptas commodi possimus sequi natus non, ullam hic maiores! In nisi quam voluptate earum eius veritatis. Esse, dicta. Nobis ipsa sit quos fugiat sequi! Laboriosam illum placeat facilis, sit excepturi optio magnam libero iusto natus consequuntur alias sunt fuga porro modi doloremque? Error cupiditate sunt laboriosam.',
      price,
      geometry: {
        type: 'Point',
        coordinates: [cities[random10].longitude, cities[random10].latitude]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dibritduz/image/upload/v1613984661/YelpCamp/urdbn38zrerg1zhtjh9a.jpg',
          filename: 'YelpCamp/urdbn38zrerg1zhtjh9a'
        },
        {
          url: 'https://res.cloudinary.com/dibritduz/image/upload/v1613984665/YelpCamp/xzvkcgcmlds7jjyjyuap.jpg',
          filename: 'YelpCamp/xzvkcgcmlds7jjyjyuap'
        },
        {
          url: 'https://res.cloudinary.com/dibritduz/image/upload/v1613984668/YelpCamp/oer67sfsywf1tj9yezaj.jpg',
          filename: 'YelpCamp/oer67sfsywf1tj9yezaj'
        },
        {
          url: 'https://res.cloudinary.com/dibritduz/image/upload/v1613984675/YelpCamp/egqomntv1xz7mzckbqif.jpg',
          filename: 'YelpCamp/egqomntv1xz7mzckbqif'
        },
        {
          url: 'https://res.cloudinary.com/dibritduz/image/upload/v1613984677/YelpCamp/kohffadh16nxqvs0qscr.jpg',
          filename: 'YelpCamp/kohffadh16nxqvs0qscr'
        }
      ]
    });
    await camp.save();
  }
}

seedDb().then(() => {
  mongoose.connection.close();
});