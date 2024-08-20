import mongoose from 'mongoose';

// Define the schema for a news item
const gallerySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,  // Assuming 'news' is a path or URL to the image
        required: true
    },
    news_title: {
        type: String,
        required: true
    },
    news_brief: { 
        type: String,
        required: true
    }
});

// Create the model from the schema
const Gallery = mongoose.model('Gallery', gallerySchema);

export default Gallery;