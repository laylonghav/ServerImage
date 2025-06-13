const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dr3vnzyth',
  api_key: '215385542148862',
  api_secret: 'Q6XXPSh4gSpi2gRmcRUseSiy1WA'
});

module.exports = { cloudinary };
