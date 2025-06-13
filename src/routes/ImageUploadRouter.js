const express = require('express');
const { upload } = require('../../Utils/helper/multer');
const {
  get,
  create,
  update,
  delete: remove
} = require('../controller/ImageUploaderController');

const router = express.Router();

// GET all uploaded images
router.get('/images', get);

// POST upload new image
router.post('/upload', upload.single('image'), create);

// PUT update existing image (requires old image URL + new image file)
router.put('/update-image', upload.single('image'), update);

// POST delete an image (requires body: { url: '/uploads/filename.jpg' })
router.post('/delete-image', remove);

module.exports = router;
