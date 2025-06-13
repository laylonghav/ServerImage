const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { cloudinary } = require('./cloudinaryConfig');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Cloudinary folder
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif'],
    public_id: (req, file) =>
      Date.now() + '-' + Math.round(Math.random() * 1e9),
  },
});

const upload = multer({ storage });

module.exports = { upload };
