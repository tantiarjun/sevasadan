import express from 'express';
import multer from 'multer';
import { addGallery, getAllGallery, getGalleryById, updateGallery, deleteGallery } from '../controllers/GalleryController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), addGallery); 
router.get('/', getAllGallery); 
router.get('/:id', getGalleryById); 
router.put('/:id', upload.single('image'), updateGallery); 
router.delete('/:id', deleteGallery); 

export default router;
