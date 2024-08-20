import express from 'express';
import multer from 'multer';
import { addDoctor, getAllDoctors, getDoctorById, updateDoctor, deleteDoctor } from '../controllers/DoctorController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), addDoctor); 
router.get('/', getAllDoctors); 
router.get('/:id', getDoctorById); 
router.put('/:id', upload.single('image'), updateDoctor); 
router.delete('/:id', deleteDoctor); 

export default router;
