import express from 'express';
import multer from 'multer';
import { addNews, getAllNews, getNewsById, updateNews, deleteNews } from '../controllers/NewsController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), addNews); 
router.get('/', getAllNews); 
router.get('/:id', getNewsById); 
router.put('/:id', upload.single('image'), updateNews); 
router.delete('/:id', deleteNews); 

export default router;
