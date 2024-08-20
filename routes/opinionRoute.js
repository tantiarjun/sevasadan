import express from 'express';
import multer from 'multer';
import { createUser } from '../controllers/OpinionController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/',upload.single('file'), createUser);

export default router;