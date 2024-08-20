import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    image: { type: String, required: true }, 
    date: { type: String, required: true },  
    author: { type: String, required: true },
    views: { type: Number, required: true },
    likes: { type: Number, required: true },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true }
});

// Create a model from the schema
const Article = mongoose.model('Article', articleSchema);

export default Article;
