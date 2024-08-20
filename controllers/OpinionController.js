import Opinion from '../models/opinionModel.js';
import { uploadImage, getImageUrl } from './s3Controller.js';

export const createUser = async (req, res) => {
    const { name, timeSlot, phoneNumber } = req.body;
    const file = req.file;
    
    try {
        const fileKey = await uploadImage(file);
        const fileUrl = await getImageUrl(fileKey);

        const newUser = new Opinion({
            name,
            phoneNumber,
            file: fileUrl,
            timeSlot
        });

        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Unable to save user data' });
    }
};
