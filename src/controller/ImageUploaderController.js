const { cloudinary } = require('../../Utils/helper/cloudinaryConfig');

// GET is not applicable as Cloudinary is cloud-hosted unless you store URLs in DB
const get = async (_req, res) => {
  return res.status(501).json({ message: "Not supported in Cloudinary mode." });
};

// POST Upload
const create = async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: 'No image uploaded.' });
    }

    res.status(200).json({
      message: 'Image uploaded successfully!',
      imageUrl: req.file.path, // Cloudinary URL
      public_id: req.file.filename, // Cloudinary public_id
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Cloudinary upload failed.', message: error.message });
  }
};

// PUT Update
const update = async (req, res) => {
  try {
    const { oldPublicId } = req.body;

    if (!req.file || !oldPublicId) {
      return res.status(400).json({ message: 'Missing new image or old public ID.' });
    }

    // Delete old image
    await cloudinary.uploader.destroy(oldPublicId);

    res.status(200).json({
      message: 'Image updated successfully!',
      imageUrl: req.file.path,
      public_id: req.file.filename,
    });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ error: 'Cloudinary update failed.', message: error.message });
  }
};

// POST Delete
const remove = async (req, res) => {
  try {
    const { public_id } = req.body;

    if (!public_id) {
      return res.status(400).json({ message: 'public_id is required to delete image.' });
    }

    await cloudinary.uploader.destroy(public_id);
    res.status(200).json({ message: 'Image deleted successfully.' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Cloudinary delete failed.', message: error.message });
  }
};

module.exports = { get, create, update, delete: remove };
