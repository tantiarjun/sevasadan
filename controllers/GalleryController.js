import Gallery from '../models/galleryModel.js';
import { uploadImage, getImageUrl } from './s3Controller.js';

const addGallery = async (req, res) => {
  try {
    const { title, news_title, news_brief } = req.body;
    const imageFile = req.file; 

    // Uncomment these lines if you are using the actual S3 image upload functions
    // const imageKey = await uploadImage(imageFile);
    // const imageUrl = await getImageUrl(imageKey);

    const newGallery = new Gallery({
        // image: imageUrl,
        image: 'dummy-url',
        title,
        news_title,
        news_brief
    });

    const savedGallery = await newGallery.save();
    res.status(201).send(savedGallery);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

const updateGallery = async (req, res) => {
  const { title, news_title, news_brief } = req.body;
  const imageFile = req.file; 

  try {
    let imageKey;
    if (imageFile) {
      imageKey = await uploadImage(imageFile);
    }

    const updatedFields = {
      title,
      news_title,
      news_brief
    };

    if (imageKey) {
      const imageUrl = await getImageUrl(imageKey);
      updatedFields.image = imageUrl;
    }

    const updatedGallery = await Gallery.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
    if (!updatedGallery) {
      return res.status(404).send({ message: 'Gallery not found' });
    }

    res.status(200).send({ message: 'Gallery updated successfully', gallery: updatedGallery });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

const getAllGallery = async (req, res) => {
  try {
    const galleries = await Gallery.find();
    return res.status(200).json(galleries);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};

const getGalleryById = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) {
      return res.status(404).send({ message: 'Gallery not found' });
    }
    return res.status(200).json(gallery);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};

const deleteGallery = async (req, res) => {
  try {
    const deletedGallery = await Gallery.findByIdAndDelete(req.params.id);
    if (!deletedGallery) {
      return res.status(404).send({ message: 'Gallery not found' });
    }
    return res.status(200).send({ message: 'Gallery deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};

export { addGallery, updateGallery, getAllGallery, getGalleryById, deleteGallery };